const User = require('../models/user');
const express = require('express')
const router = express.Router();


// Get all users
router.get(`/`, (req, res) => {
    User.find({},(err, users) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(users);
    });
});




module.exports = router;