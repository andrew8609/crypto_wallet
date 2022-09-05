const express = require("express");
const router = express.Router();

const Wallet = require("ethereumjs-wallet");

router.get("/create-wallet", async (req, res) => {
    try {
        const EthWallet = Wallet.default.generate();

        console.log("Private Key:", EthWallet.getPrivateKeyString());
        console.log("Address", EthWallet.getAddressString());

        const responseData = {
            privateKey: EthWallet.getPrivateKeyString(),
            address: EthWallet.getAddressString(),
        };

        const jsonContent = JSON.stringify(responseData);
        res.status(200).send(jsonContent);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
