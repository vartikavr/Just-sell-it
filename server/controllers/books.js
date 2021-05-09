const Book = require('../schemas/books');

module.exports.getBooks = async (req, res) => {
    console.log("in books ..");
    const books = await Book.find({});
    console.log(books);
    res.send(books);
}

module.exports.specificBook = async (req, res) => {
    console.log("inside book specific")
    console.log(req.params);
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate('userId');
    console.log(book);
    res.status(200).send({ success: 'book seeded!', book, currentUser });
}

module.exports.newBook = async (req, res) => {
    console.log("adding new book ...");
    console.log(req.body);
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
        console.log(newBook);
        return res.status(200).send({ sucess: "registered new book!", newBook });
    }
    catch (e) {
        console.log("error", e);
    }
}

module.exports.editBook = async (req, res) => {
    console.log("Editing book ...", req.params);
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
        await Book.findByIdAndDelete(id);
        console.log('Successfully deleted the book!');
        res.redirect('/categories/books');
    }
    catch (e) {
        return res.status(403).send({ error: "unsuccessful deletion" });
    }
}