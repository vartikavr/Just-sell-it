const User = require('../schemas/user');
const Book = require('../schemas/books');
const Cycle = require('../schemas/cycles');
const Furniture = require('../schemas/furniture');
const Handicraft = require('../schemas/handicrafts');
const Others = require('../schemas/othersCat');
const bcrypt = require('bcrypt');

module.exports.registerUser = async (req, res) => {
    console.log(req.body);
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
        await newUser.save();
        console.log(newUser);
        currentUser = newUser._id;
        return res.status(200).send({ sucess: "registered!" });
    }
    catch (e) {
        console.log(e);
        return res.status(403).send({ error: "Invalid entry!" });
    }
}

module.exports.loginUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const check = await User.findOne({ username: username });
    console.log(check);
    if (check) {
        const isMatch = await bcrypt.compare(password, check.password);
        if (!isMatch) {
            console.log("not pwd valid")
            return res.status(403).send({ error: "invalid pwd" });
        }
        console.log("Successfully logged in!");
        currentUser = check._id;
        console.log(currentUser);
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
                runValidators: true
            }
        );
        await updateUser.save();
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

module.exports.addBookToWishlist = async (req, res) => {
    console.log("inside book wishlist..", req.params);
    try {
        const productId = req.params.id;
        const user = await User.findById(currentUser);
        user.wishlist.books.push(productId);
        //console.log(user.wishlist.books);
        await user.save();
        return res.status(200).send({ success: "book added in wishlist" })
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "book not added in wishlist" })
    }
}

module.exports.addCycleToWishlist = async (req, res) => {
    console.log(req.params);
    try {
        const productId = req.params.id;
        const user = await User.findById(currentUser);
        user.wishlist.cycles.push(productId);
        await user.save();
        return res.status(200).send({ success: "cycle added in wishlist" })
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "cycle not added in wishlist" })
    }
}

module.exports.addFurnitureToWishlist = async (req, res) => {
    console.log(req.params);
    try {
        const productId = req.params.id;
        const user = await User.findById(currentUser);
        user.wishlist.furniture.push(productId);
        await user.save();
        return res.status(200).send({ success: "furniture added in wishlist" })
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "furniture not added in wishlist" })
    }
}

module.exports.addHandicraftToWishlist = async (req, res) => {
    console.log(req.params);
    try {
        const productId = req.params.id;
        const user = await User.findById(currentUser);
        user.wishlist.handicrafts.push(productId);
        await user.save();
        return res.status(200).send({ success: "handicraft added in wishlist" })
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "handicraft not added in wishlist" })
    }
}

module.exports.addItemToWishlist = async (req, res) => {
    console.log(req.params);
    try {
        const productId = req.params.id;
        const user = await User.findById(currentUser);
        user.wishlist.others.push(productId);
        await user.save();
        return res.status(200).send({ success: "item added in wishlist" })
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "item not added in wishlist" })
    }
}

module.exports.removeBookFromWishlist = async (req, res) => {
    console.log(req.params);
    try {
        const productId = req.params.id;
        await User.findByIdAndUpdate(currentUser, { $pull: { 'wishlist.books': productId } });
        return res.status(200).send({ success: "removed from wishlist" });
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "not removed from wishlist" })
    }
}

module.exports.removeCycleFromWishlist = async (req, res) => {
    console.log(req.params);
    try {
        const productId = req.params.id;
        await User.findByIdAndUpdate(currentUser, { $pull: { 'wishlist.cycles': productId } });
        return res.status(200).send({ success: "removed from wishlist" });
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "not removed from wishlist" })
    }
}

module.exports.removeFurnitureFromWishlist = async (req, res) => {
    console.log(req.params);
    try {
        const productId = req.params.id;
        await User.findByIdAndUpdate(currentUser, { $pull: { 'wishlist.furniture': productId } });
        return res.status(200).send({ success: "removed from wishlist" });
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "not removed from wishlist" })
    }
}

module.exports.removeHandicraftFromWishlist = async (req, res) => {
    console.log(req.params);
    try {
        const productId = req.params.id;
        await User.findByIdAndUpdate(currentUser, { $pull: { 'wishlist.handicrafts': productId } });
        return res.status(200).send({ success: "removed from wishlist" });
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "not removed from wishlist" })
    }
}

module.exports.removeItemFromWishlist = async (req, res) => {
    console.log(req.params);
    try {
        const productId = req.params.id;
        await User.findByIdAndUpdate(currentUser, { $pull: { 'wishlist.others': productId } });
        return res.status(200).send({ success: "removed from wishlist" });
    }
    catch (e) {
        console.log("error: ", e);
        return res.status(403).send({ error: "not removed from wishlist" })
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