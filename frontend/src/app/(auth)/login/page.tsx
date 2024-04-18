'use client';

import { useState } from "react";
import { useRouter} from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { DefaultCard } from "@/components/default-card";

export default function Login() {
    const { push } = useRouter();
    async function btnLoginClick() {
        push("/register");
    }

    const [message, setMessage] = useState<string>("");
    return (
        <div className="relative flex flex-col h-screen items-center justify-center">
        <h1 className="text-gray-50 font-bold text-4xl mb-6">POSEIDON</h1>
        <DefaultCard>
            <div className="flex flex-col items-center justify-center gap-6">
                <Image src="/img/poseidon_logo.png" alt="Google" width={200} height={200} />
                Sign in with your wallet and and start bot trading
                <button
                    className="bg-sky-900 p-4 rounded-sm self-stretch text-gray-100 flex items-center justify-center gap-6 hover:bg-sky-950"
                    type="button"
                    onClick={btnLoginClick}
                >
                    <Image src="/metamask.svg" alt="Google" width={64} height={64} />
                    CLICK TO CONNECT
                </button>
                { message && <span className="text-gray-800 text-sm font-normal">{message}</span>}
            </div>
        </DefaultCard>
        <Link href="/register" className="mt-6">
            <span className="text-gray-300 mt-4 text-sm font-semibold">Create new account</span>
        </Link>
    </div>
    )

}