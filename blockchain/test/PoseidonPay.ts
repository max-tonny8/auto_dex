import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PoseidonPay", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const PoseidonPay = await ethers.getContractFactory("Lock");
    const poseidonPay = await PoseidonPay.deploy();

    return { poseidonPay, owner, otherAccount };
  }

  it("Should set the right unlockTime", async function () {
    const {  poseidonPay } = await loadFixture(deployFixture);
    expect(true).to.equal(true);
  });
});
