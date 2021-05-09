const Book = require('./schemas/books')
const Cycle = require('./schemas/cycles');
const Furniture = require('./schemas/furniture');
const Handicraft = require('./schemas/handicrafts');
const Others = require('./schemas/othersCat')

module.exports.isLoggedIn = (req, res, next) => {
    if (!currentUser) {
        console.log("not logged in");
        return res.status(403).send({ isLoggedIn: false });
    }
    next();
}

module.exports.isBookOwner = async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    //console.log("inside isBookOwner...", currentUser, "book user's id: ", book.userId);
    if (!(currentUser.equals(book.userId._id))) {
        //console.log(currentUser, book.userId._id)
        console.log("not your book");
        return res.status(403).send({ isOwner: false });
    }
    next();
}

module.exports.isCycleOwner = async (req, res, next) => {
    const { id } = req.params;
    const cycle = await Cycle.findById(id);
    if (!(currentUser.equals(cycle.userId._id))) {
        console.log("not your cycle");
        return res.status(403).send({ isOwner: false });
    }
    next();
}

module.exports.isFurnitureOwner = async (req, res, next) => {
    const { id } = req.params;
    const furniture = await Furniture.findById(id);
    if (!(currentUser.equals(furniture.userId._id))) {
        console.log("not your furniture");
        return res.status(403).send({ isOwner: false });
    }
    next();
}

module.exports.isHandicraftOwner = async (req, res, next) => {
    const { id } = req.params;
    const handicraft = await Handicraft.findById(id);
    if (!(currentUser.equals(handicraft.userId._id))) {
        console.log("not your handicraft");
        return res.status(403).send({ isOwner: false });
    }
    next();
}

module.exports.isProductOwner = async (req, res, next) => {
    const { id } = req.params;
    const item = await Others.findById(id);
    if (!(currentUser.equals(item.userId._id))) {
        console.log("not your product");
        return res.status(403).send({ isOwner: false });
    }
    next();
}