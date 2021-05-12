const User = require('../schemas/user');
const Book = require('../schemas/books');
const Cycle = require('../schemas/cycles');
const Furniture = require('../schemas/furniture');
const Handicraft = require('../schemas/handicrafts');
const Others = require('../schemas/othersCat');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.registerAdmin = async (req, res) => {
    console.log(req.body);
    emailConfirmationToken = null;
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const securityAnsHash = await bcrypt.hash(req.body.securityA, 10);
    const newAdmin = new User({
        name: req.body.name,
        username: req.body.username,
        phone: req.body.phone,
        address: req.body.address,
        course: req.body.course,
        year: req.body.year,
        email: req.body.email,
        password: passwordHash,
        securityQ: req.body.securityQ,
        securityA: securityAnsHash,
    });

    try {
        newAdmin.role = "admin";
        newAdmin.isVerified = false;
        await newAdmin.save();
        console.log(newAdmin);
        currentUser = newAdmin._id;
        jwt.sign(
            {
                userId: newAdmin._id,
            },
            process.env.EMAIL_SECRET,
            {
                expiresIn: '1d',
            },
            (err, emailToken) => {
                const url = `http://localhost:3000/confirmation/${emailToken}`;
                console.log(emailToken);
                emailConfirmationToken = emailToken;
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.ADMIN_EMAIL,
                        pass: process.env.ADMIN_PWD
                    }
                });
                const mailOptions = {
                    from: process.env.ADMIN_EMAIL,
                    to: newAdmin.email,
                    subject: 'Confirm Email for Just Sell It',
                    html: `<h4>Hey ${newAdmin.name}! Please click the following link to confirm your email:</h4> 
                    <a href="${url}">${url}</a> 
                    `
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error in sending mail..", error);
                    }
                    else {
                        console.log("Email sent: ", info.response);
                    }
                });
            }
        )
        return res.status(200).send({ sucess: "registered!" });
    }
    catch (e) {
        console.log(e);
        return res.status(403).send({ error: "Invalid entry!" });
    }
}


module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" });
        return res.status(200).send({ success: "users seeded", users });
    }
    catch (e) {
        return res.status(400).send({ error: " users not seeded" });
    }
}

module.exports.viewUserProfile = async (req, res) => {
    console.log("inside view user profile...");
    console.log(req.params);
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
        console.log("user found..", user)
        return res.status(200).send({ success: "User found!", user })
    }
    return res.status(400).send({ error: "user not found!" });
}

module.exports.viewUserProducts = async (req, res) => {
    console.log("inside view user products...");
    console.log(req.params);
    const user = await User.findById(req.params.id);
    if (user) {
        console.log("user found..", user)
        const books = await Book.find({ userId: user._id });
        const cycles = await Cycle.find({ userId: user._id });
        const furniture = await Furniture.find({ userId: user._id });
        const handicrafts = await Handicraft.find({ userId: user._id });
        const others = await Others.find({ userId: user._id });
        return res.status(200).send({ success: "User's products found!", books, cycles, furniture, handicrafts, others })
    }
    return res.status(400).send({ error: "user's products not found!" });
}

module.exports.deleteUser = async (req, res) => {
    console.log("inside delete user info by admin...");
    console.log(req.params);
    const id = req.params.id;
    try {
        const userToBeDeleted = await User.findById(id);
        await Book.deleteMany({ userId: userToBeDeleted._id });
        await Cycle.deleteMany({ userId: userToBeDeleted._id });
        await Furniture.deleteMany({ userId: userToBeDeleted._id });
        await Handicraft.deleteMany({ userId: userToBeDeleted._id });
        await Others.deleteMany({ userId: userToBeDeleted._id });
        console.log("Successfully deleted the user's products!");
        await User.findByIdAndDelete(id);
        console.log("Successfully deleted the user's account!");
        res.status(200).send({ success: "deleted user" });
    }
    catch (e) {
        console.log("error in server delete user account and products..", e);
        return res.status(403).send({ error: "unsuccessful deletion" });
    }
}