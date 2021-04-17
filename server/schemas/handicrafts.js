const mongoose = require('mongoose');

const handicraftSchema = new mongoose.Schema({
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
    color: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Handicraft', handicraftSchema);