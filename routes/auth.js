const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, photoURL } = req?.body;
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            photoURL: photoURL,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req?.body?.username });
        if(!user) {
            res.status(400).json("wrong credenrials");
            return;
        }
        
        const validated = await bcrypt.compare(req?.body?.password, user.password);
        if(!validated) {
            res.status(400).json("wrong credenrials");
            return;
        }
        
        const {password, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
