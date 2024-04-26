'use client';

import { AdminNavbar } from "@/components/Dashboard/admin-navbar";
import { useState } from "react";

type SettingsInputProps = {
    name: string;
    email: string;
    planId: number;
    network: number;
    address: string;
    privateKey: string;
}

export default function Settings() {
    const [settings, setSettings] = useState<SettingsInputProps>({
        name: "",
        email: "",
        planId: 1,
        network: 0,
        address: "",
        privateKey: "",
    } as SettingsInputProps);

    function onSettingsChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSettings((prevState: any) => ({ ...prevState, [event.target.id]: event.target.value }));
    }

    async function handleSubmit() {
        alert(JSON.stringify(settings));
    }
    return (
      <div className="min-h-screen flex flex-1 flex-col overflow-y-scroll">
        <section className="bg-cyan-950 h-2/5 flex flex-col items-stretch justify-start px-14 py-2">
          <AdminNavbar currentPage="Settings" />
        </section>

        <section className="flex-1 -mt-56 grid h-3/5 px-14">
          <div className="bg-white h-fit rounded-md shadow-md parent flex flex-col items-stretch justify-between flex-1">
                <div className="px-7 py-4 flex items-center justify-between">
                    <h2 className="font-medium text-sm h-[10%]">My account</h2>
                    <button className="bg-sky-500 text-white rounded-sm px-3 py-1 font-semibold text-sm hover:bg-sky-600" onClick={handleSubmit}>Save Settings</button>
                </div>

                <form className="w-full flex flex-col bg-gray-100 flex-1 py-4 px-8 divide-y">
                    <div className="flex flex-col gap-2 pb-5">
                        <h3 className="text-sm text-gray-500 uppercase">User Information</h3>
                        <div className="flex flex-col justify-start gap-1 w-1/2">
                            <label htmlFor="email">NAME</label>
                            <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            value={settings ? settings.name : ''}
                            onChange={onSettingsChange}
                            className="p-2 rounded-sm bg-gray-200 border border-white focus:bg-white focus:outline-none font-light" />

                            <label className="mt-4" htmlFor="email">EMAIL</label>
                            <input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            value={settings ? settings.email : ''}
                            onChange={onSettingsChange}
                            className="p-2 rounded-sm bg-gray-200 border border-white focus:bg-white focus:outline-none font-light" />

                            <label className="mt-4" htmlFor="email">PLAN</label>
                            <input
                            id="planId"
                            type="number"
                            placeholder="Your chosen plan"
                            value={settings ? settings.planId : ''}
                            onChange={onSettingsChange}
                            className="p-2 rounded-sm bg-gray-200 border border-white focus:bg-white focus:outline-none font-light" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-5">
                        <h3 className="text-sm text-gray-500 uppercase">Wallet Information</h3>
                        <div className="flex flex-col justify-start gap-1 w-1/2">
                        <label htmlFor="email">NETWORK</label>
                            <input
                            id="network"
                            type="number"
                            placeholder="Choose a network"
                            value={settings ? settings.network : ''}
                            onChange={onSettingsChange}
                            className="p-2 rounded-sm bg-gray-200 border border-white focus:bg-white focus:outline-none font-light" />

                            <label className="mt-4" htmlFor="email">ADDRESS</label>
                            <input
                            id="address"
                            type="address"
                            placeholder="Insert your wallet address"
                            value={settings ? settings.address : ''}
                            onChange={onSettingsChange}
                            className="p-2 rounded-sm bg-gray-200 border border-white focus:bg-white focus:outline-none font-light" />

                            <label className="mt-4" htmlFor="email">PRIVATE KEY</label>
                            <input
                            id="privateKey"
                            type="privaetKey"
                            placeholder="Insert your private key for operations"
                            value={settings ? settings.privateKey : ''}
                            onChange={onSettingsChange}
                            className="p-2 rounded-sm bg-gray-200 border border-white focus:bg-white focus:outline-none font-light" />
                        </div>
                    </div>
                </form>
           </div>
        </section>
      </div>
    );
  }
  