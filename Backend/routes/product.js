const Product = require('../models/product');
const Category = require('../models/category');

const express = require('express');
const product = require('../models/product');
const { count } = require('../models/product');
const category = require('../models/category');
const router = express.Router();



//get all products
// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });


//get all the products with category
//localhost:3000/api/products
//localhost:3000/api/products?categories=5f4f8f8f8,rdytf,erfda

router.get('/', async (req, res) => {
    try {
        let filter = {};
        if (req.query.categories) {
            filter = { category: req.query.categories.split(',') };
        }
        const products = await Product.find(filter).populate('category');
        if (!products) {
            res.status(500).json({ message: 'No products found' });
        }
        else {
            res.json(products);
        }
    } catch (err) {
        res.json({ message: "Category not found"});
    }

});



// getting a product by category
// router.get('/bycategory', async (req, res) => {
//     try {
//         const products = await Product.find({ category: req.query.category });
//         res.json(products);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

//getting a product with query params http://localhost:3000/api/v1/products/byname

// router.get('/byname', async (req, res) => {
//     try {
//         const products = await Product.find().select('-_id name price ');
//         res.json(products);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });


//getting a product with query params name price image http://localhost:3000/api/v1/products/byname

router.get('/byname', async (req, res) => {
    try {
        const products = await Product.find().select('-_id name price image');
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

// get a product by id
// router.get('/:productId', async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.productId).populate('category');
//         res.json(product);
//     } catch (err) {
//         res.json({ message: "Product Does not exist" });
//         //res.json({ message: err});
//     }
// });



// get a product by id with category details.
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('category');
        res.json(product);
    } catch (err) {
        res.json({ message: "Product Does not exist" });
        //res.json({ message: err});
    }
});


//getting a product with price filter http://localhost:3000/api/v1/products/byprice?price=
// router.get('/byprice', async (req, res) => {
//     try {
//         const products = await Product.find({ price: req.query.byprice });
//         res.json(products);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });



// getting a product by price range http://localhost:3000/api/v1/products/bypricerange?min=&max=
// router.get('/bypricerange', async (req, res) => {
//     try {
//         const products = await Product.find({ price: { $gte: req.query.min, $lte: req.query.max } });
//         res.json(products);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });


// post request
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});


//router.post using try catch
// router.post(`/`, async (req, res) => {
//     try {
//         const category = await Category.findById(req.body.category);
//         if (!category)
//             return res.status(404).send('Category not found');
//         const product = new Product({
//             name: req.body.name,
//             description: req.body.description,
//             moreDescription: req.body.moreDescription,
//             image: req.body.image,
//             brand: req.body.brand,
//             price: req.body.price,
//             category: req.body.category,
//             stock: req.body.stock,
//             rating: req.body.rating,
//             totalReviews: req.body.totalReviews,
//             isFeatured: req.body.isFeatured,
//         });
//         product = await product.save();
//         if (!product)
//             return res.status(500).send("Product can't be created");
//         res.status(200).send(product);
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// });


//Update a product api/category/:id
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            moreDescription: req.body.moreDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            rating: req.body.rating,
            totalReviews: req.body.totalReviews,
            isFeatured: req.body.isFeatured,
        }
    }, { new: true })
        .then(product => {
            if (!product)
                return res.status(404).send('The product with the given ID was not found.');
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send('The product with the given ID was not found.');
            }
            return res.status(500).send(err);
        });
});

//Delete a product api/category/:id
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            if (!product)
                return res.status(404).send('The product with the given ID was not found.');
            res.status(200).send('The product was deleted.');
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send('The product with the given ID was not found.');
            }
            return res.status(500).send(err);
        });
});


//count of all products http://localhost:3000/api/v1/products/get/totalcount
router.get('/get/totalcount', async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.send({
            "Total Products": count
        });
        //res.json(count);
    } catch (err) {
        res.json({ message: err });
    }
});

//get all featured products for corousel http://localhost:3000/api/v1/products/get/featured
// router.get(`/get/featured/`, async (req, res) => {
//     try {
//         const products = await Product.find({ isFeatured: true });
//         res.json(products);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

//get all featured products for corousel http://localhost:3000/api/v1/products/get/featured/3
router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    try {
        const products = await Product.find({ isFeatured: true }).limit(+count);
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});









module.exports = router;