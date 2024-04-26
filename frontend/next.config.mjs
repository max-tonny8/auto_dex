/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["commons/*"],
    env: {
        AUTH_MSG: process.env.AUTH_MSG,
        POSEIDON_PAY_CONTRACT: process.env.POSEIDON_PAY_CONTRACT
    }
};

export default nextConfig;
