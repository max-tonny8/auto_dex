import { AuthFooter } from "@/components/Auth/auth-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poseidon - Login",
  description: "Trading bot platform",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        {children}
        <AuthFooter />
      </>
  );
}
