const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'buyer', 'seller'],
        default: 'buyer'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', mySchema);

