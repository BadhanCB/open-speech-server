const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//get post
router.get("/get/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create post
router.post("/create", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (e){
        res.status(500).json(e);
    }
});

//update post
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
