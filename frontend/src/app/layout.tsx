import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Poseidon Platform",
  description: "Trading bot platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-t from-zinc-950 to-sky-900 w-full h-full">{children}</body>
    </html>
  );
}
