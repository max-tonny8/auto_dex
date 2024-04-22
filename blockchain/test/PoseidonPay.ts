import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PoseidonPay", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const PoseidonCoin = await ethers.getContractFactory("PoseidonCoin");
    const poseidonCoin = await PoseidonCoin.deploy();
    await poseidonCoin.waitForDeployment();

    const PoseidonPay = await ethers.getContractFactory("PoseidonPay");
    const poseidonPay = await PoseidonPay.deploy();
    await poseidonPay.waitForDeployment();
    const poseidonAddress = await poseidonPay.getAddress();

    await poseidonPay.setAcceptedToken(poseidonCoin.target);
    await poseidonCoin.mint(otherAccount.address, ethers.parseEther("1"));

    return { poseidonPay, poseidonAddress, poseidonCoin, owner, otherAccount };
  }

  it("Should do first payment", async function () {
    const { poseidonPay, poseidonAddress, poseidonCoin, otherAccount } = await loadFixture(deployFixture);

    const instance = poseidonCoin.connect(otherAccount);
    await instance.approve(poseidonAddress, ethers.parseEther("0.01"));

    await expect(poseidonPay.pay(otherAccount.address)).to.emit(poseidonPay, "Paid");
  });

  it("Should not do first payment", async function () {
    const { poseidonPay, otherAccount } = await loadFixture(deployFixture);

    await expect(poseidonPay.pay(otherAccount.address)).to.be.revertedWith("Insufficient balance and/or allowance");
  });

  it("Should do a second payment", async function () {
    const { poseidonPay, poseidonAddress, poseidonCoin, otherAccount } = await loadFixture(deployFixture);

    const instance = poseidonCoin.connect(otherAccount);
    await instance.approve(poseidonAddress, ethers.parseEther("0.01"));

    await poseidonPay.pay(otherAccount.address);

    await time.increase(31 * 24 * 60 * 60);

    await expect(poseidonPay.pay(otherAccount.address)).to.emit(poseidonPay, "Paid");
  });

  it("Should not be able to do a second payment", async function () {
    const { poseidonPay, poseidonAddress, poseidonCoin, otherAccount } = await loadFixture(deployFixture);

    const instance = poseidonCoin.connect(otherAccount);
    await instance.approve(poseidonAddress, ethers.parseEther("0.01"));

    await poseidonPay.pay(otherAccount.address);

    await time.increase(31 * 24 * 60 * 60);
    await instance.approve(poseidonAddress, ethers.parseEther("0.0001"));

    await expect(poseidonPay.pay(otherAccount.address)).to.be.revertedWith("Insufficient balance and/or allowance");
  });

  it("Should do a second payment after a failure", async function () {
    const { poseidonPay, poseidonAddress, poseidonCoin, otherAccount } = await loadFixture(deployFixture);

    const instance = poseidonCoin.connect(otherAccount);
    await instance.approve(poseidonAddress, ethers.parseEther("0.01"));
    await poseidonPay.pay(otherAccount.address);

    await time.increase(31 * 24 * 60 * 60);
    await instance.approve(poseidonAddress, ethers.parseEther("0.0001"));
    await expect(poseidonPay.pay(otherAccount.address)).to.be.revertedWith("Insufficient balance and/or allowance");

    await instance.approve(poseidonAddress, ethers.parseEther("0.01"));
    await expect(poseidonPay.pay(otherAccount.address)).to.emit(poseidonPay, "Paid");
  });

  it("Should withdraw", async function () {
    const { poseidonPay, poseidonAddress, poseidonCoin, owner, otherAccount } = await loadFixture(deployFixture);

    const monthlyAmount = await poseidonPay.monthlyAmount();
    const instance = poseidonCoin.connect(otherAccount);
    await instance.approve(poseidonAddress, monthlyAmount);
    await poseidonPay.pay(otherAccount.address);

    expect(await instance.balanceOf(poseidonAddress)).to.equal(monthlyAmount);

    await poseidonPay.withdraw(monthlyAmount);
    expect(await instance.balanceOf(poseidonAddress)).to.equal(0);
  });
});
