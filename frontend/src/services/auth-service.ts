import axios from 'axios';
import ConfigService from './config-service';
import { User } from 'commons/models/user';
import { JWT } from 'commons/models/jwt';

const BACKEND_URL = `${ConfigService.BACKEND_URL}/auth`;

export type Auth = {
    wallet: string;
    secret: string;
    timestamp: number;
}

export async function signIn(data: Auth): Promise<string> {
    const response = await axios.post(`${BACKEND_URL}/signin`, data);
    return response.data;
}

export async function signUp(data: User) {
    const response = await axios.post(`${BACKEND_URL}/signup`, data);
    return response.data;
}

export async function activate(wallet: string, code: string): Promise<string> {
    if(!wallet || !code) return '';
    const response = await axios.post(`${BACKEND_URL}/activate/${wallet}/${code}`, { wallet, code });
    return response.data;
}

export function parseJwt(token: string): JWT {
    if(!token) throw new Error('Token is required');
    const base64str = token.split('.')[1];
    const base64 = base64str.replace('-', '+').replace('_', '/'); // to make it full valid base64
    return JSON.parse(window.atob(base64));
}