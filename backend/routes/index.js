const router = require("express").Router();
const apiRoutes = require("./api");

const constants = require("../config/constants");

const { apiURL } = constants.api;
const api = `/${apiURL}`;

router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json("NO API route found"));

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.get("*", (req, res) => {
    res.status(400).send("No Page Found");
});

module.exports = router;
