const express = require("express");
const routes = require("./server/router.js");
const config = require("./config.js");
var cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('frontend/polygon-nft-generator-react/build'))

app.use("/api", routes) // new

app.listen(process.env.PORT || 5000, () => {
    console.log("Server has started!");
});