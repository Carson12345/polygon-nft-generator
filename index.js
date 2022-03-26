const express = require("express");
const routes = require("./server/router.js");
const config = require("./config.js");
var cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes) // new
app.use("/", function(req, res){
    res.send("OK");
})
app.listen(process.env.PORT || 5000, () => {
    console.log("Server has started!");
});