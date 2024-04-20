import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PoseidonPayModule = buildModule("PoseidonPayModule", (m) => {
  const poseidonPay = m.contract("PoseidonPay", [], {});

  return { poseidonPay };
});

export default PoseidonPayModule;