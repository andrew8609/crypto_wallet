const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("EtherWallet contract", function () {
  it("Deployment should assign the some amount of ethers to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const EtherWallet = await ethers.getContractFactory("EtherWallet");

    const hardhatEtherWallet = await EtherWallet.deploy();

    await hardhatEtherWallet.withdraw(50);
    console.log(address(this).balance);

    expect(address(this).balance).to.equal(50);
  });
});
