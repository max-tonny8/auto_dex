'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from 'next/navigation';
import { DefaultCard } from "@/components/default-card";
import { useEffect, useState } from "react";

export default function Pay() {
    const { push } = useRouter();
    const params = useParams();

    const wallet: string = typeof params.wallet === "string" ? params.wallet : params.wallet[0];

    const [user, setUser] = useState<any>({});
    const [plan, setPlan] = useState<any>({});
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        setUser({
            name: "Caique Ribeiro",
            wallet: wallet,
            planId: "Gold",
        });

        setPlan({
            id: "3",
            name: "Gold",
            symbol: "WETH",
            price: "0.001",
            maxAutomations: 10
        });
    }, [wallet]);

    function btnPayClick() {
        push("/dashboard")
    }

    return (
        <div className="relative flex flex-col h-screen items-center justify-center">
            <DefaultCard>
                <div className="flex flex-col items-center justify-center gap-4 max-w-[400px]">
                    <Image src="/img/poseidon_logo.png" alt="Google" width={150} height={150} />
                    You plan details are bellow.
                    <div className="flex flex-col justify-start gap-1 w-full">
                        <label htmlFor="user">USER</label>
                        <span  id="user" className="font-light">{user.name}</span>
                        <span className="font-medium text-sm bg-gray-400 border border-gray-200 rounded-md py-2 px-3 w-fit">{user.wallet || "Not informed yet"}</span>
                    </div>

                    <div className="flex flex-col justify-start gap-1 w-full">
                        <label htmlFor="user">PLAN</label>
                        <select name="plans" id="plan" className="p-2 rounded-sm focus:outline-none bg-sky-900 text-gray-100">
                            <option value="1">Bronze</option>
                            <option value="2">Silver</option>
                            <option value="3">Gold</option>
                        </select>
                    </div>

                    <span className="font-light">
                        This system costs <strong className="font-black">{plan.symbol} ${plan.price}/mo.</strong> and gives you full access to out platform,
                        as well as <strong className="font-black">{plan.maxAutomations}</strong> automations
                        <br /><br />
                        You last payment was: <strong className="font-black">Never</strong>
                    </span>

                    <button
                        className="bg-sky-900 p-4 rounded-sm self-stretch text-gray-100 text-sm flex items-center justify-center gap-4 hover:bg-sky-950"
                        type="button"
                        onClick={btnPayClick}
                    >
                        PAY NOW
                    </button>
                    { message && <span className="text-red-500 text-sm font-normal">{message}</span>}
                </div>
            </DefaultCard>
        </div>
    )

}