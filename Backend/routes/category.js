const Category = require('../models/category');
const express = require('express')
const router = express.Router();


// Get all categories
router.get(`/`, (req, res) => {
    Category.find({},(err, categories) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(categories);
    });
});





module.exports = router;