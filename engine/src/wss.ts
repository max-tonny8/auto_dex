import WebSocket, { WebSocketServer } from "ws";
import Config from "./config";
import { IncomingMessage } from "http";

class PoseidonWS extends WebSocket {
    id: string;

    constructor(address: string) {
        super(address);
        this.id = '';
    }
}

class PoseidonWSS extends WebSocketServer {
    isConnected(userId: string): boolean {
        if(!this.clients || !this.clients.size) return false;
        return ([...this.clients] as PoseidonWS[]).some(client => client.id === userId);
    }

    getConnections(): string[] {
        if(!this.clients || !this.clients.size) return [];
        return ([...this.clients] as PoseidonWS[]).map(client => client.id);
    }

    direct(userId: string, message: Object) {
        if(!this.clients || !this.clients.size) return;
        ([...this.clients] as PoseidonWS[]).forEach(client => {
            if(client.id === userId && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
                return;
            }
        })
    }

    broadcast(message: Object) {
        if(!this.clients || !this.clients.size) return;
        ([...this.clients] as PoseidonWS[]).forEach(client => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        })
    }
}

let wss: PoseidonWSS;

function verifyClient(info: any, cb: Function) {
    return cb(true);
}

export default (): PoseidonWSS => {
    if(wss) return wss;

    wss = new PoseidonWSS({
        port: Config.WS_PORT,
        verifyClient
    });

    wss.on('connection', (ws: PoseidonWS, req: IncomingMessage) => {
        if(!req.url) return;
        ws.id = req.url;

        ws.on('message', data => {
            console.log(data);
        });

        ws.on('error', error => {
            console.error(error);
        });

        console.log(`ws.onConnection: ${req.url}`);
    });

    console.log(`Poseidon WebSocket listening on port ${Config.WS_PORT}`);

    return wss;
}