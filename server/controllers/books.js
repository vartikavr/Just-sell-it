const Book = require('../schemas/books');
const User = require('../schemas/user');

module.exports.getBooks = async (req, res) => {
    const books = await Book.find({});
    res.send(books);
}

module.exports.specificBook = async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate('userId');
    const user = await User.findById(currentUser);
    res.status(200).send({ success: 'book seeded!', book, currentUser, role: user.role, wishlistBooks: user.wishlist.books });
}

module.exports.newBook = async (req, res) => {
    const userId = currentUser;
    const newBook = new Book({
        title: req.body.title,
        edition: req.body.edition,
        author: req.body.author,
        price: req.body.price,
        description: req.body.description,
        pages: req.body.pages,
        userId: userId,
    });
    newBook.images.push({ url: req.body.image });
    try {
        await newBook.save();
        return res.status(200).send({ sucess: "registered new book!", newBook });
    }
    catch (e) {
        console.log("error", e);
    }
}

module.exports.editBook = async (req, res) => {
    const bookId = req.params.id;
    const updateBook = await Book.findByIdAndUpdate(bookId,
        {
            title: req.body.title,
            author: req.body.author,
            pages: req.body.pages,
            edition: req.body.edition,
            price: req.body.price,
            description: req.body.description
        });
    updateBook.images[0].url = req.body.image;
    await updateBook.save();
    res.redirect(`/categories/books/${updateBook._id}`);
}

module.exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const users = await User.find({ 'wishlist.books': { '$in': id } });
        for (const index in users) {
            await User.findByIdAndUpdate(users[index]._id, { $pull: { 'wishlist.books': id } });
        }
        await Book.findByIdAndDelete(id);
        console.log('Successfully deleted the book!');
        res.redirect('/categories/books');
    }
    catch (e) {
        return res.status(403).send({ error: "unsuccessful deletion" });
    }
}