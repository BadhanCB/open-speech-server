const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

app.use(express.json());
dotenv.config();
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tinfh.mongodb.net/openspeech?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(e => console.error(e));

app.use("/auth", authRoute);

app.listen(5000, () => {
    console.log("Server Running");
});
