// import ethers.js
import Artifact from "../contracts/EtherWallet.json";

const ethers = require("ethers");

// export function sendEther(privateKey, receiverAddress, amountInEther) {
//     let network = "goerli";
//     const Confirmations = 2;
//     // provider: Infura or Etherscan will be automatically chosen
//     // let provider = ethers.getDefaultProvider(network);
//     let provider = new ethers.providers.EtherscanProvider(
//         network,
//         "FNEQ5NPS4E1DMTCREUQW3RP3Y8ZXJVJEVY"
//     );

//     // Create a wallet instance
//     let wallet = new ethers.Wallet(privateKey, provider);

//     // Create a transaction object
//     let tx = {
//         to: receiverAddress,
//         // Convert currency unit from ether to wei
//         value: ethers.utils.parseEther(amountInEther),
//         gasLimit: 50000,
//     };

//     // Send a transaction
//     wallet.sendTransaction(tx).then((txObj) => {
//         console.log("txHash", txObj.hash);
//         provider.waitForTransaction(txObj.hash, Confirmations);
//         wallet.getBalance().then((data) => {
//             console.log(data.toString());
//         });
//         // => 0x9c172314a693b94853b49dc057cf1cb8e529f29ce0272f451eea8f5741aa9b58
//         // A transaction result can be checked in a etherscan with a transaction hash which can be obtained here.
//     });
// }

export async function getBlackList() {
    // let blacklist = [];
    let network = "goerli";
    let provider = new ethers.providers.EtherscanProvider(
        network,
        "FNEQ5NPS4E1DMTCREUQW3RP3Y8ZXJVJEVY" //etherscan API key
    );
    // console.log(ethers.Contract());
    const deployedContract = new ethers.Contract(
        "0x92713824d3b654aDED6609272B1C2631eFA89f7C", //deployed contract address
        Artifact.abi,
        provider //provider:only read, signer:can execute state-changing operation
    );

    let blacklist = await deployedContract.getBlackList();
    // deployedContract.getBalance().then((data) => {
    //     console.log("balance: ", data.toString());
    // });
    return blacklist;
}

export function pushBlackList() {}
