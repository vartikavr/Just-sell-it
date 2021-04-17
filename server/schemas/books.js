const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
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
    author: {
        type: String,
        required: true
    },
    edition: {
        type: String
    },
    pages: {
        type: Number
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Book', bookSchema);