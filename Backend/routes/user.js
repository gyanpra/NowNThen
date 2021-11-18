const User = require('../models/user');
const express = require('express')
const router = express.Router();

//using bcrypt library to hash the password
const bcrypt = require('bcryptjs');

//using jwt library to create and verify the token
const jwt = require('jsonwebtoken');
const user = require('../models/user');



// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-hashedPassword');
        res.json(users);
    } catch (err) {
        res.json({ success: false, err });
    }
});

//get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-hashedPassword');
        res.json(user);
    } catch (err) {
        res.json({ success: false, err });
    }
});

// add a new user/admin
router.post(`/`, async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: bcrypt.hashSync(req.body.hashedPassword, 8),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            country: req.body.country,

        });
        user = await user.save((err, user) => {
            if (err) return res.status(500).json({ Message: "Duplicate Values Found" });;
            return res.status(200).send(user);
        });

    }
    catch (err) {
        return res.status(500).send(err);
    }
});

//Update a user by ID ->  api/category/:id
router.put('/:id', async (req, res) => {
    try {
        const userExists = await User.findById(req.params.id);
        let newPassword;
        if (req.body.hashedPassword) {
            newPassword = bcrypt.hashSync(req.body.hashedPassword, 12);
        }
        else {
            newPassword = userExists.hashedPassword;
        }
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            hashedPassword: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            country: req.body.country,
        }
            , { new: true });
        res.json(user);
    } catch (err) {
        res.json({ success: false, err });
    }
});


//login a use
// router.post('/login', async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         const secret=process.env.secret;
//         if (!user) return res.json({ loginSuccess: false, message: "Auth failed, email not found" });
//         if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
//             const token = jwt.sign( 
//                 { _id: user._id }, secret,{ expiresIn: '2d' });
//             return res.status(200).send({ user: user.email, token: token });
//         }
//         else {
//             return res.json({ loginSuccess: false, message: "Auth failed, wrong password" });
//         }

//     } catch (err) {
//         res.json({ loginSuccess: false, err });
//     }
// });


//login a user


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const passwordCheck = bcrypt.compareSync(req.body.password, user.hashedPassword);
        if (passwordCheck) {
            const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.secret, { expiresIn: '1w' });
            res.status(200).send({
                success: true,
                user: user.email,
                token: token,
                message: 'Authentication successful!'
            });
        }
        else {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

//register a new user

router.post(`/register`, async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: bcrypt.hashSync(req.body.hashedPassword, 8),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            country: req.body.country,

        });
        user = await user.save((err, user) => {
            if (err) return res.status(500).json({ Message: "Duplicate Values Found" });;
            return res.status(200).send(user);
        });

    }
    catch (err) {
        return res.status(500).send(err);
    }
});

//delete a user by ID
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user)
                return res.status(404).send('The user with the given ID was not found.');
            res.status(200).send('The product was deleted.');
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send('The user with the given ID was not found.');
            }
            return res.status(500).send(err);
        });
});

//get user count

router.get('/get/totalcount', async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.send({
            "Total Users": count
        });
        //res.json(count);
    } catch (err) {
        res.json({ message: err });
    }
});




module.exports = router;