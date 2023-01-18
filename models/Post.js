const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photoURL: {
            type: String,
            required: false,
        },
        userName: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
            required: false,
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model("Post", PostSchema);