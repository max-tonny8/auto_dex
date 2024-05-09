import { JWT } from 'commons/models/jwt';
import ConfigService from './config-service';
import { BrowserProvider, Contract } from 'ethers';
import { Plan } from 'commons/models/plan';
import ERC20_ABI from 'commons/services/ERC20.json';
import { parseJwt, signIn } from './auth-service';

function getProvider() {
    if(!window.ethereum) {
        throw new Error('No Metamask found');
    }
    return new BrowserProvider(window.ethereum);
}

export async function getWallet(): Promise<string> {
    const provider = getProvider();
    const accounts = await provider.send('eth_requestAccounts', []);

    if(!accounts || accounts.length === 0) {
        throw new Error('Metamask did not allow access to accounts');
    }

    const firstAllowedWallet = accounts[0];
    localStorage.setItem('wallet', firstAllowedWallet);

    return firstAllowedWallet;
}

export async function doLogin(): Promise<JWT | undefined> {
    const timestamp = Date.now();
    const message = ConfigService.getAuthMessage();
    const wallet = await getWallet();
    const provider = getProvider();
    const signer = await provider.getSigner();

    const challenge = await signer.signMessage(message);

    const token = await signIn({
        secret: challenge,
        timestamp,
        wallet
    });

    localStorage.setItem('token', token);

    return parseJwt(token);
}

export async function startPayment(plan: Plan): Promise<boolean> {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const tokenContract = new Contract(plan.tokenAddress, ERC20_ABI, signer);
    const tx = await tokenContract.approve(ConfigService.POSEIDON_PAY_CONTRACT, BigInt(plan.price) * BigInt(12));
    await tx.wait();
    return true;
}