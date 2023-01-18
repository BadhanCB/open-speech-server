const express = require("express");
const app = express();

const title = "<h1>This is Node js app</h1>";

app.use("/bcb", (req, res) => {
    res.send(title);
    console.log("app.use responsed");
});

app.listen(5000, () => {
    console.log("Server Running");
})