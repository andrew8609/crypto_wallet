import "./PasswordPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import { encryptWithAES } from "../../service/utils";

const PasswordPage = () => {
    const context = useContext(UserContext);
    const { password } = context;
    const [newValue, setNewValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");

    const navigate = useNavigate();

    const createWallet = () => {
        if (newValue != confirmValue) alert("no confirmed");
        else {
            context.password = newValue;
            axios.get("http://localhost:3001/api/create-wallet").then((res) => {
                console.log(res.data);
                localStorage.setItem("Private Key", encryptWithAES(res.data.privateKey, newValue));
                localStorage.setItem("Wallet Address", encryptWithAES(res.data.address, newValue));
                console.log(res.data.address);
                navigate("/main");
            });
            // console.log(password);
        }
    };

    const enterPassword = () => {
        context.password = newValue;
        navigate("/main");
    };

    // useEffect(() => {
    //     return () => {
    //         // console.log("Run Cleanup");
    //     };
    // }, []);

    // if (localStorage.getItem("Private Key")) navigate("/main");
    let isWalletExist = localStorage.getItem("Private Key");

    return (
        <div className="layout">
            <header className="navbar">
                <div className="container">
                    <div className="logo">Crypto Wallet</div>
                </div>
            </header>
            <div className="text">
                <br />
                <br />
                {!isWalletExist ? <h3>Create Your Password</h3> : <h3>Enter Your Password</h3>}
            </div>
            <section className="cards">
                <div className="card">
                    <input
                        type="password"
                        required
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        name="value"
                        placeholder="New Password (8 characters min)"
                    />
                    <br />
                    <br />
                    {!isWalletExist ? (
                        <>
                            <input
                                type="password"
                                required
                                value={confirmValue}
                                onChange={(e) => setConfirmValue(e.target.value)}
                                name="value"
                                placeholder="Confirm Password"
                            />
                            <br />
                            <br />
                            <p>I have read and agree to the Terms of Use</p>
                            <br />
                            <br />
                            <button onClick={createWallet}>Create</button>
                        </>
                    ) : (
                        <button onClick={enterPassword}>Enter</button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PasswordPage;
