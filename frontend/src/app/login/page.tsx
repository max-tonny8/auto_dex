'use client';

import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <section className="relative w-full h-full min-h-screen">
            <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-full inset-0"
            style={{
                backgroundImage: "url('/img/wave_pattern.png')",
                backgroundPosition: 'center',
                opacity: 0.1,
                backgroundSize: 'cover',      
            }}
            ></div>
        
            <div className="relative flex flex-col h-screen items-center justify-center">
                <h1 className="text-gray-300 font-bold text-4xl mb-6">POSEIDON</h1>
                <div className=" bg-gray-300 shadow-md shadow-gray-800 rounded-md p-6 text-gray-700 font-bold mx-4">
                    <div className="flex flex-col items-center justify-center gap-6">
                        <Image src="/img/poseidon_logo.png" alt="Google" width={200} height={200} />
                        Sign in with your wallet and and start bot trading
                        <button className="bg-sky-900 p-4 rounded-md self-stretch text-gray-100 flex items-center justify-center gap-6 hover:bg-sky-950">
                            <Image src="/metamask.svg" alt="Google" width={64} height={64} />
                            CLICK TO CONNECT
                        </button>
                    </div>
                </div>
                <Link href="/register" className="mt-6">
                    <span className="text-gray-300 mt-4 text-sm font-semibold">Create new account</span>
                </Link>
            </div>
        </section>
    );
  }
  