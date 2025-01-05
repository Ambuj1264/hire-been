

const mongoose = require('mongoose');
const product = require('./product');

const mySchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Parchase', mySchema);
