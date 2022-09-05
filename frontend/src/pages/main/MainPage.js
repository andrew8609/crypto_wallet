//password: asd
import React, { useState, useEffect, useContext } from "react";
import etherLogo from "../../ether_logo.png";
import "./Main.css";
import { UserContext } from "../../App";
import { decryptWithAES } from "../../service/utils";
import { getBlackList } from "../../service/contract_api";
import { useNavigate } from "react-router-dom";

const ethers = require("ethers");

function MainPage() {
    const context = useContext(UserContext);
    const { password } = context;
    const [balance, setBalance] = useState("0");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(0);
    const [transactions, setTransactions] = useState([
        {
            hash: "0x111",
            address: "aaaa",
            amount: 10,
            status: "confirmed",
        },
        {
            hash: "0x112",
            address: "bbbb",
            amount: 10,
            status: "unconfirmed",
        },
        {
            hash: "0x113",
            address: "cccc",
            amount: 10,
            status: "confirmed",
        },
    ]);

    const gasFee = 5000;
    const Confirmations = 1;
    const network = "goerli";
    const privateKey = localStorage.getItem("Private Key");
    // const walletAddress = localStorage.getItem("Wallet Address");
    // console.log("address :" + encryptWithAES(walletAddress, password));
    // console.log(
    //     "decrypted",
    //     decryptWithAES(encryptWithAES(privateKey, password), password)
    // );

    // provider: Infura or Etherscan will be automatically chosen
    let provider = new ethers.providers.EtherscanProvider(
        network,
        "FNEQ5NPS4E1DMTCREUQW3RP3Y8ZXJVJEVY"
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (password === "") navigate("/password-page");
        else {
            console.log(password);
            // Create a wallet instance
            let addr = decryptWithAES(localStorage.getItem("Wallet Address"), password);
            if (addr === "") {
                alert("Invalid password");
                navigate("/password-page");
            } else {
                provider.getHistory(addr).then((history) => {
                    let txArray = [];
                    history.map((tx) => {
                        let buffer = {
                            hash: tx.hash,
                            address: tx.to,
                            amount: ethers.utils.formatEther(tx.value),
                            status: tx.confirmations > 1 ? "Confirmed" : "Uncofirmed",
                        };
                        txArray.push(buffer);
                    });
                    setTransactions(txArray);
                });
                provider.getBalance(addr).then((data) => {
                    setBalance(ethers.utils.formatEther(data).slice(0, 10));
                });
            }
        }
    }, []);

    function sendEther(privateKey, receiverAddress, amountInEther) {
        // Create a wallet instance
        let wallet = new ethers.Wallet(privateKey, provider);

        // Create a transaction object
        let tx = {
            to: receiverAddress,
            // Convert currency unit from ether to wei
            value: ethers.utils.parseEther(amountInEther),
            gasLimit: 50000,
        };

        // Send a transaction
        wallet
            .sendTransaction(tx)
            .then((txObj) => {
                console.log("txHash", txObj.hash);
                setTransactions((current) => [
                    ...transactions,
                    {
                        hash: txObj.hash,
                        address: receiverAddress,
                        amount: amountInEther,
                        status: "Unconfirmed",
                    },
                ]);

                provider.waitForTransaction(txObj.hash, Confirmations).then(() => {
                    // console.log(transactions);
                    setTransactions((current) =>
                        current.filter((element) => {
                            return element !== txObj.hash;
                        })
                    );
                    setTransactions((current) => [
                        ...transactions,
                        {
                            address: receiverAddress,
                            hash: txObj.hash,
                            amount: amountInEther,
                            status: "Confirmed",
                        },
                    ]);
                });
                // wallet.getBalance().then((data) => {
                //     console.log(data.toString());
                // });
                // => 0x9c172314a693b94853b49dc057cf1cb8e529f29ce0272f451eea8f5741aa9b58
                // A transaction result can be checked in a etherscan with a transaction hash which can be obtained here.
            })
            .catch((err) => {
                // console.log(
                //     err.toString().includes("insufficient funds for intrinsic transaction cost")
                // );
                if (err.toString().includes("insufficient funds for intrinsic transaction cost"))
                    alert("You don't have enough ethers");
                else if (
                    err.toString().includes("bad address checksum") ||
                    err.toString().includes("invalid address")
                )
                    alert("Invalid Address");
                else if (err.toString().includes("invalid arrayify value"))
                    alert("Enter valid amount");
                else alert(err);
                // console.log(err);
            });
    }

    return (
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ethereum wallet
                </a>
            </nav>
            <div className="container-fluid mt-5 d-flex justify-content-center">
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex text-center">
                        <div className="content mr-auto ml-auto string" style={{ width: "1200px" }}>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <img src={etherLogo} width="150" />
                            </a>
                            <h1>Your balance is: {balance} _ Ether</h1>
                            <div className="container-fluid mt-5 d-flex justify-content-center">
                                <form
                                    style={{ width: "600px" }}
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        const recipient_address = recipient.value;
                                        const transfer_amount = amount.value;
                                        const blacklist = getBlackList();
                                        blacklist.then((data) => {
                                            // console.log(data);
                                            let isBlacklisted = false;
                                            data.forEach((element) => {
                                                if (element == recipient_address) {
                                                    isBlacklisted = true;
                                                }
                                            });
                                            if (!isBlacklisted) {
                                                sendEther(
                                                    decryptWithAES(privateKey, password),
                                                    recipient_address,
                                                    transfer_amount
                                                );
                                            } else {
                                                alert("Recipient address is blacklisted!");
                                            }
                                        });

                                        // const amount = window.web3.utils.toWei(this.amount.value, 'Ether')
                                        // this.transfer(recipient, amount)
                                    }}
                                >
                                    <div className="form-group mr-sm-2 ">
                                        <input
                                            id="recipient"
                                            type="text"
                                            ref={(input) => {
                                                setRecipient(input);
                                            }}
                                            className="form-control"
                                            placeholder="Recipient Address"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mr-sm-2 mt-5">
                                        <input
                                            id="amount"
                                            type="text"
                                            ref={(input) => {
                                                setAmount(input);
                                            }}
                                            className="form-control"
                                            placeholder="Amount"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mt-5"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                            <div className="mt-3"> Current fee: {gasFee}Gwei</div>
                            <table className="table mt-3 string">
                                <thead>
                                    <tr>
                                        <th scope="col">Hash</th>
                                        <th scope="col">Recipient</th>
                                        <th scope="col">Value</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx, key) => {
                                        if (key + 10 > transactions.length) {
                                            return (
                                                <tr key={key}>
                                                    <td>{tx.hash}</td>
                                                    <td>{tx.address}</td>
                                                    <td>{tx.amount}</td>
                                                    <td>{tx.status}</td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
