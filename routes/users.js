const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

//get user
router.get("/get/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...rest } = user._doc;

        res.status(200).json(rest);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update
router.patch("/update/:id", async (req, res) => {
    if (req.body.userID === req.params.id) {
        //encrypt user password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        //update user info
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account");
    }
});

//delete
router.delete("/delete/:id", async (req, res) => {
    if (req.body.userID === req.params.id) {
        //delete user's all posts
        const user = User.findById(req.params.id);
        if (!user) return res.status(404).json("user not found");

        await Post.deleteMany({ username: user.username });

        //delete user account
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can Delete only your account");
    }
});

module.exports = router;
