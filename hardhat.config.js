require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.9",
            },
            {
                version: "0.8.13",
            },
        ],
    },
    networks: {
        hardhat: {
            chainId: 1337,
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${process.env.Infura_API_KEY}`,
            accounts: [process.env.GOERLI_PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            goerli: "FNEQ5NPS4E1DMTCREUQW3RP3Y8ZXJVJEVY",
        },
    },
};
