const Category = require('../models/category');
const express = require('express');
const category = require('../models/category');
const router = express.Router();


// add a new category
router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if (!category) return res.status(400).send('error while saving category');
    res.send(category);
})


// Get all categories
router.get('/', async (req, res) => {
    let categories = await Category.find();
    if (!categories) return res.status(400).send('error while getting categories');
    res.status(200).send(categories);
});

//Delete a category api/category/:id
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (!category) return res.status(404).send('The category with the given ID was not found.');
        res.status(200).json({ success: true, message: 'Category deleted successfully!' });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send('The category with the given ID was not found.');
        }
        return res.status(500).send(err);
    }
    );
});

//get a category by id
router.get('/:id', async (req, res) => {
    let category = await Category.findById(req.params.id);
    if (!category) return res.status(500).json({ success: false, message: 'Category not found' })
    res.status(200).send(category);
});


//Update a category api/category/:id
router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color
        }
    }, { new: true })
        .then(category => {
            if (!category) return res.status(404).send('The category with the given ID was not found.');
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send('The category with the given ID was not found.');
            }
            return res.status(500).send(err);
        });
});




module.exports = router;