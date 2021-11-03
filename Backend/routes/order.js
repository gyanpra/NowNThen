const Order = require('../models/order');
const express = require('express')
const router = express.Router();


// Get all orders
router.get(`/`, (req, res) => {
    Order.find({},(err, orders) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(orders);
    });
});





module.exports = router;