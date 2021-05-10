const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /@banasthali.in\s*$/,
        unique: false
    },
    phone: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    securityQ: {
        type: String,
        required: true
    },
    securityA: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user']
    }
});


// userSchema.pre("save", function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.password, 12);
//     next();
// })

// userSchema.methods.comparePassword = function (text, callback) {
//     return callback(null, bcrypt.compareSync(text, this.password));
// }

module.exports = mongoose.model('User', userSchema);