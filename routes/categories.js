const router = require("express").Router();
const Category = require("../models/Category");

router.post("/create", async (req, res) => {
    const newCategory = new Category(req.body);
    try{
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch(e){
        res.status(500).json(e);
    }
});

router.get("/all-categories", async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch(e){
        res.status(500).json(e);
    }
});

module.exports = router;