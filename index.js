const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tinfh.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(e => console.error(e));

const title = "<h1>This is Node js app</h1>";

app.use("/bcb", (req, res) => {
    res.send(title);
    console.log("app.use responsed");
});

app.listen(5000, () => {
    console.log("Server Running");
});
