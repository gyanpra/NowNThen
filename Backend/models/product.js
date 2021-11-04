const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    moreDescription:{
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    images:[{
        type: String,
    }],
    brand:{
        type: String,
        default: '',
    },
    price:{
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    rating: {
        type: Number,
        default: 0,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

productSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});



module.exports = mongoose.model('Product', productSchema);