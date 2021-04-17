const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
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
    age: {
        type: Number
    },
    modelNo: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Cycle', cycleSchema);