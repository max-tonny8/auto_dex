'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Computer, PrecisionManufacturing, Settings, Logout } from '@mui/icons-material';

export function Sidebar() {
      const pathname = usePathname();
      const { push } = useRouter();

      function btnLogoutClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        localStorage.clear();
        push('/login');
      }
      
    return (
        <div className="bg-white w-1/6 shadow-lg p-8 flex flex-col justify-start items-start divide-y">
            <h2 className="text-xl font-bold uppercase text-cyan-900 pb-8">Poseidon</h2>

            <div className="flex flex-col w-full pt-8">
                <ul className="uppercase text-sm text-gray-500 font-semibold">
                    <li className="p-2">
                        <Link className={`${pathname === '/dashboard' && "text-blue-500"} flex items-end gap-2`} href="/dashboard">
                            <Computer />
                            Dashboard
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link className={`${pathname === '/automations' && "text-blue-500"} flex items-end gap-2`} href="/automations">
                            <PrecisionManufacturing />
                            Automations
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link className={`${pathname === '/settings' && "text-blue-500"} flex items-end gap-2`} href="/settings">
                            <Settings />
                            Settings
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link
                        className={`${pathname === '/logout' && "text-blue-500"} flex items-end gap-2`}
                        href="#"
                        onClick={btnLogoutClick}
                        >
                            <Logout />
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}