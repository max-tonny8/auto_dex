export default class ConfigService {
    static AUTH_MSG: string = `${process.env.AUTH_MSG}`;
    static POSEIDON_PAY_CONTRACT: string = `${process.env.POSEIDON_PAY_CONTRACT}`;

    static getAuthMessage(): string {
        if(ConfigService.AUTH_MSG.indexOf('<timestamp>') === -1) {
            throw new Error('Auth message must have a timestamp placecholder');
        }
        return ConfigService.AUTH_MSG.replace('<timestamp>', Date.now().toString());
    }
}