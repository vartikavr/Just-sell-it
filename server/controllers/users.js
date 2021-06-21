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

module.exports.registerUser = async (req, res) => {
    console.log(req.body);
    emailConfirmationToken = null;
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const securityAnsHash = await bcrypt.hash(req.body.securityA, 10);
    const newUser = new User({
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
        newUser.role = "user";
        newUser.isVerified = false;
        await newUser.save();
        console.log(newUser);
        currentUser = newUser._id;
        jwt.sign(
            {
                userId: newUser._id,
            },
            process.env.EMAIL_SECRET,
            {
                expiresIn: '1d',
            },
            (err, emailToken) => {
                const url = `${process.env.SERVER_URI}/confirmation/${emailToken}`;
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
                    to: newUser.email,
                    subject: 'Confirm Email for Just Sell It',
                    html: `<h4>Hey ${newUser.name}! Please click the following link to confirm your email:</h4> 
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

module.exports.sendToken = (req, res) => {
    console.log("confirmation..", emailConfirmationToken);
    return res.status(200).send({ token: emailConfirmationToken });
}

module.exports.confirmEmail = async (req, res) => {
    try {
        console.log(req.params);
        const result = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        console.log("result.....", result);
        await User.findByIdAndUpdate(result.userId, { isVerified: true });
        return res.status(200).send({ success: "confirmed email" })
    }
    catch (e) {
        console.log("error", e);
        return res.status(400).send({ error: "not confirmed." })
    }
}

module.exports.loginUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const check = await User.findOne({ username: username });
    if (check) {
        const isMatch = await bcrypt.compare(password, check.password);
        if (!isMatch) {
            console.log("not pwd valid")
            return res.status(403).send({ error: "invalid pwd" });
        }
        currentUser = check._id;
        const role = check.role;
        return res.status(200).send({ sucess: "logged in!", role });
    }
    else {
        console.log("username not found")
        return res.status(403).send({ error: "invalid" });
    }
}


module.exports.forgotPassword = async (req, res) => {
    const username = req.body.username;
    const check = await User.findOne({ username: username });
    console.log(check);
    if (check) {
        console.log("you forgot your password ..");
        const id = check._id;
        const question = check.securityQ;
        console.log(id, question);
        resetUserId = id;
        return res.status(200).send({ success: "forgot password working.", question });
    }
    console.log("username not found")
    return res.status(403).send({ error: 'username invalid!' });
}

module.exports.securityQA = async (req, res) => {
    const answer = req.body.answer;
    const userId = resetUserId;
    const check = await User.findById(userId);
    console.log(check);
    const isMatch = await bcrypt.compare(answer, check.securityA);
    if (!isMatch) {
        console.log("not valid answer")
        return res.status(403).send({ error: "invalid answer" });
    }
    console.log("Successfully security attempt!");
    return res.status(200).send({ sucess: "move to reset password!" });
}

module.exports.resetPassword = async (req, res) => {
    const password = req.body.pwd;
    const newPassword = req.body.newPwd;
    console.log(resetUserId);
    const userId = resetUserId;
    console.log(req.body);
    if (password === newPassword) {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        const check = await User.findByIdAndUpdate(userId, { password: passwordHash });
        await check.save();
        console.log("new user details..", check);
        resetUserId = '';
        currentUser = userId;
        return res.status(200).send({ success: "password updated." });
    }
    else {
        return res.status(403).send({ error: "Passwords do not match." });
    }
}

module.exports.userInfo = async (req, res) => {
    console.log("inside user info...", currentUser);
    const user = await User.findById(currentUser);
    if (user) {
        console.log("user found..", user)
        return res.status(200).send({ success: "User found!", user })
    }
    return res.status(400).send({ error: "user not found!" });
}

module.exports.editUserInfo = async (req, res) => {
    console.log("Editing user info ...", req.body);
    try {
        const userId = currentUser;
        const oldUser = await User.findById(userId);
        const updateUser = await User.findOneAndUpdate({ _id: userId },
            {
                name: req.body.name,
                username: req.body.username,
                course: req.body.course,
                year: req.body.year,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address
            },
            {
                runValidators: true,
                new: true
            }
        );
        if (oldUser.email != req.body.email) {
            updateUser.isVerified = false;
            await updateUser.save();
            console.log("updated..", updateUser)
            jwt.sign(
                {
                    userId: updateUser._id,
                },
                process.env.EMAIL_SECRET,
                {
                    expiresIn: '1d',
                },
                (err, emailToken) => {
                    const url = `${process.env.SERVER_URI}/confirmation/${emailToken}`;
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
                        to: updateUser.email,
                        subject: 'Confirm Email for Just Sell It',
                        html: `<h4>Hey ${updateUser.name}! Please click the following link to confirm your email:</h4> 
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
        }
        res.status(200).send({ success: "Details updated." })
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ error: "invalid details." })
    }
}

module.exports.deleteUserInfo = async (req, res) => {
    console.log("inside delete user info...", currentUser);
    try {
        //remove the products from this user from other users' wishlist
        const userToBeDeleted = await User.findById(currentUser);
        const deletedBooks = await Book.find({ userId: userToBeDeleted._id });
        for (bookIndex in deletedBooks) {
            const users = await User.find({ 'wishlist.books': { '$in': deletedBooks[bookIndex]._id } });
            for (const index in users) {
                await User.findByIdAndUpdate(users[index]._id, { $pull: { 'wishlist.books': deletedBooks[bookIndex]._id } });
            }
        }
        const deletedCycles = await Cycle.find({ userId: userToBeDeleted._id });
        for (cycleIndex in deletedCycles) {
            const users = await User.find({ 'wishlist.cycles': { '$in': deletedCycles[cycleIndex]._id } });
            for (const index in users) {
                await User.findByIdAndUpdate(users[index]._id, { $pull: { 'wishlist.cycles': deletedCycles[cycleIndex]._id } });
            }
        }
        const deletedFurniture = await Furniture.find({ userId: userToBeDeleted._id });
        for (fIndex in deletedFurniture) {
            const users = await User.find({ 'wishlist.furniture': { '$in': deletedFurniture[fIndex]._id } });
            for (const index in users) {
                await User.findByIdAndUpdate(users[index]._id, { $pull: { 'wishlist.furniture': deletedFurniture[fIndex]._id } });
            }
        }
        const deletedHandicrafts = await Handicraft.find({ userId: userToBeDeleted._id });
        for (hIndex in deletedHandicrafts) {
            const users = await User.find({ 'wishlist.handicrafts': { '$in': deletedHandicrafts[hIndex]._id } });
            for (const index in users) {
                await User.findByIdAndUpdate(users[index]._id, { $pull: { 'wishlist.handicrafts': deletedHandicrafts[hIndex]._id } });
            }
        }
        const deletedItems = await Others.find({ userId: userToBeDeleted._id });
        for (itemIndex in deletedItems) {
            const users = await User.find({ 'wishlist.others': { '$in': deletedItems[itemIndex]._id } });
            for (const index in users) {
                await User.findByIdAndUpdate(users[index]._id, { $pull: { 'wishlist.others': deletedItems[itemIndex]._id } });
            }
        }
        await Book.deleteMany({ userId: userToBeDeleted._id });
        await Cycle.deleteMany({ userId: userToBeDeleted._id });
        await Furniture.deleteMany({ userId: userToBeDeleted._id });
        await Handicraft.deleteMany({ userId: userToBeDeleted._id });
        await Others.deleteMany({ userId: userToBeDeleted._id });
        console.log("Successfully deleted the user's products!");
        await User.findByIdAndDelete(currentUser);
        currentUser = null;
        console.log("Successfully deleted the user's account!");
        res.status(200).send({ success: "deleted user" });
    }
    catch (e) {
        console.log("error in server delete user account and products..", e);
        return res.status(403).send({ error: "unsuccessful deletion" });
    }
}

module.exports.viewWishlist = async (req, res) => {
    const id = currentUser;
    console.log("in view wishlist...")
    const user = await User.findById(id);
    if (user) {
        const bookIds = user.wishlist.books;
        var books = [];
        for (const index in bookIds) {
            const item = await Book.findById(bookIds[index]);
            books.push(item);
        }
        const cycleIds = user.wishlist.cycles;
        var cycles = [];
        for (const index in cycleIds) {
            const item = await Cycle.findById(cycleIds[index]);
            cycles.push(item);
        }
        const furnitureIds = user.wishlist.furniture;
        var furniture = [];
        for (const index in furnitureIds) {
            const item = await Furniture.findById(furnitureIds[index]);
            furniture.push(item);
        }
        const handicraftIds = user.wishlist.handicrafts;
        var handicrafts = [];
        for (const index in handicraftIds) {
            const item = await Handicraft.findById(handicraftIds[index]);
            handicrafts.push(item);
        }
        const otherIds = user.wishlist.others;
        var others = [];
        for (const index in otherIds) {
            const item = await Others.findById(otherIds[index]);
            others.push(item);
        }
        return res.status(200).send({ success: "wishlist seeded", books, cycles, furniture, handicrafts, others })
    }
    return res.status(403).send({ error: "wishlist not seeded." })
}

module.exports.contactSeller = async (req, res) => {
    console.log(req.params);
    const productId = req.params.id;
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PWD
            }
        });
        const user = await User.findById(currentUser);
        var product = {};
        var seller = {};
        console.log(req.body);
        if (req.body.category == "books") {
            product = await Book.findById(productId);
            seller = await User.findById(product.userId);
        }
        else if (req.body.category === "cycles") {
            product = await Cycle.findById(productId);
            seller = await User.findById(product.userId);
        }
        else if (req.body.category === "furniture") {
            product = await Furniture.findById(productId);
            seller = await User.findById(product.userId);
        }
        else if (req.body.category === "handicrafts") {
            product = await Handicraft.findById(productId);
            seller = await User.findById(product.userId);
        }
        else if (req.body.category === "others") {
            product = await Others.findById(productId);
            seller = await User.findById(product.userId);
        }
        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: user.email,
            subject: 'Just Sell It - Contact the seller',
            html: `<h4>Hello ${user.name}!</h4>
            <h4>Thanks for showing your interest in our product!<b> Your selected product -<b></h4>
            <p><b>${product.title}<b></p>
            <img src=${product.images[0].url} width="400" height="400">
            <p><b>Description: </b>${product.description}</p>
            <p><b>Price: </b>₹${product.price}</p>
            <p><b>The seller info of your selected product is: </b>
            <br><b>Seller Name: </b>${seller.name}
            <br>Contact info -<br>
            <b>Email:</b> ${seller.email}<br>
            <b>Phone No:</b> ${seller.phone}
            <h4>Happy shopping!</h4> 
            `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error in sending mail..", error);
                return res.status(403).send({ error: "error in sending mail" });
            }
            else {
                console.log("Email sent: ", info.response);
                return res.status(200).send({ success: "Email sent" });
            }
        });
    }
    catch (e) {
        console.log("error in chat", e);
    }
}

module.exports.checkPwd = async (req, res) => {
    const password = req.body.pwd;
    const newPassword = req.body.newPwd;
    console.log(req.body);
    if (password === newPassword) {
        const user = await User.findById(currentUser);
        console.log(password, user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("not valid password")
            return res.status(403).send({ error: "invalid password" });
        }
        return res.status(200).send({ success: "passwords match." });
    }
    else {
        return res.status(403).send({ error: "Passwords do not match." });
    }
}

module.exports.resetQA = async (req, res) => {
    const { question, answer, newAnswer } = req.body;
    console.log(req.body);
    if (newAnswer === answer) {
        const answerHash = await bcrypt.hash(answer, 10);
        const user = await User.findByIdAndUpdate(currentUser, { "$set": { "securityQ": question, "securityA": answerHash } });
        await user.save();
        console.log("new user details..", user);
        return res.status(200).send({ success: "security Q/A updated." });
    }
    else {
        return res.status(403).send({ error: "Answers do not match." });
    }
}

module.exports.logoutUser = async (req, res) => {
    console.log(currentUser);
    if (currentUser) {
        //req.session.user_id = null;
        //req.user = null;
        currentUser = null;
        console.log("logging out ...", req.user);
        res.status(200).send({ success: 'Logged out!' });
    }
}