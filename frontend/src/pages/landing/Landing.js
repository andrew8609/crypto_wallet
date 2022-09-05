import "./Landing.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="layout">
            <header className="navbar">
                <div className="container">
                    <div className="logo">Simple Storage</div>
                </div>
            </header>
            <section className="cards">
                <div className="card">
                    <h1>Get Value</h1>
                    <br />
                    <p>Connecting you to Ethereum and the Decentralized Web.</p>
                    <br />
                    <p>We're happy to see you.</p>
                    <br />
                    <br />
                    <br />
                    <button
                        onClick={() =>
                            navigate({
                                pathname: "/password-page",
                            })
                        }
                    >
                        Get Started
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
