import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "local",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk"
      }
    },
    sepolia: {
      url: process.env.INFURA_URL,
      chainId: parseInt(`${process.env.CHAIN_ID}`),
      accounts: {
        mnemonic: process.env.SECRET
      }
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  sourcify: {
    enabled: true
  }
};

export default config;