// const ethers = require("hardhat");
const { verify } = require("../utils/verify");
const { artifacts } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const EtherWallet = await ethers.getContractFactory("EtherWallet");
    const etherWallet = await EtherWallet.deploy();
    // await etherWallet.deployed();
    await etherWallet.deployTransaction.wait(2);

    console.log("EtherWallet address:", etherWallet.address);

    console.log("Verifying...");
    await verify(etherWallet.address, []);
    saveFrontendFiles(etherWallet);
}

function saveFrontendFiles(etherWallet) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/contract-address.json",
        JSON.stringify({ address: etherWallet.address }, undefined, 2)
    );

    const Artifact = artifacts.readArtifactSync("EtherWallet");

    fs.writeFileSync(contractsDir + "/Artifact.json", JSON.stringify(Artifact, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
