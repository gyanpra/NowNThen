const Product = require('../models/product');

const express = require('express')
const router = express.Router();

router.get(`/`, (req, res) => {
    Product.find({},(err, products) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(products);
    });
});


router.post(`/`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        stock: req.body.stock
    });
    product.save().then(() => {
        res.send(product);
    }).catch((err) => {
        res.status(err);
    })
})


module.exports = router;