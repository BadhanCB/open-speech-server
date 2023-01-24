const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

app.use(express.json());
dotenv.config();
app.use(cors());
mongoose.set("strictQuery", false);
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tinfh.mongodb.net/openspeech?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(e => console.error(e));

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "images");
    },
    filename: (req, file, callBack) => {
        callBack(null, req.body.name)
    }
})

const upload = multer({storage});
app.post("/file/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/category", categoryRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Running");
});
