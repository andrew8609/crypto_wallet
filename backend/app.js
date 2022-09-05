require("dotenv").config();
const express = require("express");
const compression = require("compression");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(routes);

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.get("*", (req, res) => {
//     res.status(400).send("No Page Found");
// });

if (process.env.NODE_ENV === "production") {
    //code here
    console.log("proudction mode is running!");
    app.use(compression());
    app.get("*", (req, res) => {
        console.log(path.resolve(__dirname, "../dist/index.html"));
        res.sendFile(path.resolve(__dirname, "./dist/index.html"));
    });
}

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
