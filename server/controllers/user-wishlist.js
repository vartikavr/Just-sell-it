const User = require('../schemas/user');

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