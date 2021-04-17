const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [
        {
            url: String,
        }
    ],
    age: {
        type: Number
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Furniture', furnitureSchema);