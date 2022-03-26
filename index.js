const express = require("express");
const routes = require("./server/router.js");
const config = require("./config.js");

const app = express()
app.use("/api", routes) // new
app.use("/", function(req, res){
    res.send("OK");
})
app.listen(process.env.PORT || 5000, () => {
    console.log("Server has started!");
});