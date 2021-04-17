if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./schemas/user');
const cors = require('cors');
const bodyParser = require('body-parser');
const Book = require('./schemas/books');
const Cycle = require('./schemas/cycles');
const Furniture = require('./schemas/furniture');
const Handicraft = require('./schemas/handicrafts');
const Others = require('./schemas/othersCat');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
//const multer = require('multer');
//const { storage } = require('./cloudinary/index');
//const upload = multer({ storage });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

const sessionConfig = {
    name: 'session', //instead of connect._sid it'll display name as session, this will prevent attackers to not directly guess what to find and access it
    secret: 'notagoodsecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // secure: true, //this will allow the cookie to only work when secure ie using http"s"
        httpOnly: true //cookies set by session are only accessible via http, not by html,js, etc
    }
}
//Date.now() shows in milliseconds, here expiration date of 1 week in ms
app.use(session(sessionConfig));
//app.use(session({ secret: 'notagoodsecret' }));



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});



global.currentUser = null; //contains info of user, if logged in
//const currentPath = req.path;
global.resetUserId = '';

app.get('/', (req, res) => {
    res.send("HELLLOOOOO");
})
app.get('/login', (req, res) => {
    console.log("logging in");
})
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const check = await User.findOne({ username: username });
    console.log(check);
    if (check) {
        const isMatch = await bcrypt.compare(password, check.password);
        if (!isMatch) {
            console.log("not pwd valid")
            return res.status(403).send({ error: "invalid pwd" });
            // res.redirect('/login');
        }
        console.log("Successfully logged in!");
        //req.session.userId = check._id;
        //console.log(req.session.userId);
        // jwt.sign({ user: check }, 'secretKey', (err, token) => {
        //     console.log("token - ", token);
        //     currentUser = token;
        //     return res.status(200).send({ success: "logged in!", currentUser });
        // })
        currentUser = check._id;
        console.log(currentUser);
        return res.status(200).send({ sucess: "logged in!", currentUser });
        //res.redirect('/categories');
    }
    else {
        console.log("username not found")
        return res.status(403).send({ error: "invalid" });
        //res.redirect('/login');
    }
})

app.get('/forgotPwd', (req, res) => {
    console.log("forgot password ...");
})

app.post('/forgotPwd', async (req, res) => {
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
})

app.get('/security', (req, res) => {
    console.log("enter security Q/A ...");
})

app.post('/security', async (req, res) => {
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
})

app.get('/resetPwd', (req, res) => {
    console.log("resetting password ...");
})

app.post('/resetPwd', async (req, res) => {
    const password = req.body.pwd;
    const newPassword = req.body.newPwd;
    console.log(resetUserId);
    const userId = resetUserId;
    resetUserId = '';
    console.log(req.body);
    if (password === newPassword) {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        const check = await User.findByIdAndUpdate(userId, { password: passwordHash });
        //check.password = bcrypt.hashSync(check.password, 12);
        await check.save();
        console.log("new user details..", check);
        return res.status(200).send({ success: "password updated." });
    }
    else {
        return res.status(403).send({ error: "Passwords do not match." });
    }
})

app.get('/register', (req, res) => {
    console.log("register");
})

app.post('/register', async (req, res) => {
    //const user = req.body;
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
        await newUser.save();
        console.log(newUser);
        //req.session.userId = newUser._id;
        // jwt.sign({ user: newUser }, 'secretKey', (err, token) => {
        //     console.log("token - ", token);
        //     currentUser = token;
        //     return res.status(200).send({ success: "logged in!", token });
        // })
        currentUser = newUser._id;
        return res.status(200).send({ sucess: "registered!", currentUser });
    }
    catch (e) {
        console.log("error", e);
    }
})

app.get('/categories', (req, res) => {
    console.log("categories!!!");
})

app.post('/categories', (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    console.log("categories...", id)
    res.redirect(`/categories/${id}`);
})

app.get('/categories/books', async (req, res) => {
    console.log("in books ..");
    const books = await Book.find({});
    console.log(books);
    res.send(books);
})

app.get('/categories/books/:id', async (req, res) => {
    console.log("inside book specific")
    console.log(req.params);
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate('userId');
    console.log(book);
    res.status(200).send({ success: 'book seeded!', book });
})

app.post('/categories/books/new', async (req, res) => {
    console.log("adding new book ...");
    console.log(req.body);
    //console.log(req.file);
    //const images = req.file;
    const userId = currentUser;
    // images.mv(`${__dirname}/client/public/uploads/${images.name}`, err => {
    //     if (err) {
    //         console.error("error in file location", err);
    //         return res.status(500).send(err);
    //     }
    //     return res.status(200).send({ success: 'image location set!' });
    // })
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
})

app.get('/categories/cycles', async (req, res) => {
    console.log("in cycles ...");
    const cycles = await Cycle.find({});
    console.log(cycles);
    res.send(cycles);
})

app.get('/categories/cycles/:id', async (req, res) => {
    console.log("inside cycle specific")
    console.log(req.params);
    const cycleId = req.params.id;
    const cycle = await Cycle.findById(cycleId).populate('userId');
    console.log(cycle);
    res.status(200).send({ success: 'cycle seeded!', cycle });
})

app.post('/categories/cycles/new', async (req, res) => {
    console.log("adding new cycle ...");
    console.log(req.body);
    const newCycle = new Cycle(req.body);
    newCycle.userId = currentUser;
    newCycle.images.push({ url: req.body.image });
    try {
        await newCycle.save();
        console.log(newCycle);
        return res.status(200).send({ sucess: "registered new cycle!", newCycle });
    }
    catch (e) {
        console.log("error", e);
    }
})


app.get('/categories/furniture', async (req, res) => {
    console.log("in furniture ...");
    const furniture = await Furniture.find({});
    console.log(furniture);
    res.send(furniture);
})

app.get('/categories/furniture/:id', async (req, res) => {
    console.log("inside furniture specific")
    console.log(req.params);
    const furnitureId = req.params.id;
    const furniture = await Furniture.findById(furnitureId).populate('userId');
    console.log(furniture);
    res.status(200).send({ success: 'furniture seeded!', furniture });
})

app.post('/categories/furniture/new', async (req, res) => {
    console.log("adding new furniture ...");
    console.log(req.body);
    const newFurniture = new Furniture(req.body);
    newFurniture.userId = currentUser;
    newFurniture.images.push({ url: req.body.image });
    try {
        await newFurniture.save();
        console.log(newFurniture);
        return res.status(200).send({ sucess: "registered new furniture!", newFurniture });
    }
    catch (e) {
        console.log("error", e);
    }
})

app.get('/categories/handicrafts', async (req, res) => {
    console.log("in handicrafts ...");
    const handicrafts = await Handicraft.find({});
    console.log(handicrafts);
    res.send(handicrafts);
})

app.get('/categories/handicrafts/:id', async (req, res) => {
    console.log("inside handicraft specific")
    console.log(req.params);
    const handicraftId = req.params.id;
    const handicraft = await Handicraft.findById(handicraftId).populate('userId');
    console.log(handicraft);
    res.status(200).send({ success: 'handicraft seeded!', handicraft });
})

app.post('/categories/handicrafts/new', async (req, res) => {
    console.log("adding new handicraft ...");
    console.log(req.body);
    const newHandicraft = new Handicraft(req.body);
    newHandicraft.userId = currentUser;
    newHandicraft.images.push({ url: req.body.image });
    try {
        await newHandicraft.save();
        console.log(newHandicraft);
        return res.status(200).send({ sucess: "registered new hanidcraft!", newHandicraft });
    }
    catch (e) {
        console.log("error", e);
    }
})

app.get('/categories/others', async (req, res) => {
    console.log("in others ...");
    const others = await Others.find({});
    console.log(others);
    res.send(others);
})

app.get('/categories/others/:id', async (req, res) => {
    console.log("inside others specific")
    console.log(req.params);
    const othersId = req.params.id;
    const other = await Others.findById(othersId).populate('userId');
    console.log(other);
    res.status(200).send({ success: 'other seeded!', other });
})

app.post('/categories/others/new', async (req, res) => {
    console.log("adding new item in others category ...");
    console.log(req.body);
    const newItem = new Others(req.body);
    newItem.userId = currentUser;
    newItem.images.push({ url: req.body.image });
    try {
        await newItem.save();
        console.log(newItem);
        return res.status(200).send({ sucess: "registered new item!", newItem });
    }
    catch (e) {
        console.log("error", e);
    }
})


// const removeTmp = (path) => {
//     console.log("removeTmp ...");
//     fs.unlink(path, err => {
//         if (err) throw err;
//     })
// }

// app.post('/upload', async (req, res) => {
//     try {
//         //if (!req.files || Object.keys(req.files).length === 0)
//         //return res.status(400).json({ msg: 'No files were uploaded.' })
//         console.log("in upload....", req.file, "....", req.files);
//         const file = req.files.file;
//         console.log("forward...")
//         await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "JustSellIt" }, async (err, result) => {
//             removeTmp(file.tempFilePath);
//             console.log(result)
//             res.status(200).send({ public_id: result.public_id, url: result.secure_url });
//         })
//     }
//     catch (err) {
//         return res.status(500).json({ msg: err.message })
//     }
// })






app.get('/logout', (req, res) => {
    console.log(currentUser);
    if (currentUser) {
        //req.session.user_id = null;
        //req.user = null;
        currentUser = null;
        console.log("logging out ...", req.user);
        res.status(200).send({ success: 'Logged out!' });
    }
})


//Verify Token
//Format of token-  Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    // Get auth header value
    //console.log(req.headers["x-access-token"]);
    const token = currentUser;
    if (!token)
        return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token, 'secretKey');
        req.user = verified;
        console.log("user = ", req.user);
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token');
    }
    // const bearerHeader = req.header('auth-token');
    //Check if bearer is undefined
    // if (typeof bearerHeader !== 'undefined') {
    //Split at space
    // const bearer = bearerHeader.split(' ');
    //get token from array
    // const bearerToken = bearer[1];
    //Set the token
    // req.token = bearerToken;
    //     next();
    // }
    // else {
    //     //Forbidden
    //     console.log("Error in verifyToken ...")
    //     res.status(403).send({ error: "error in logout" });
    // }
}


const dbUrl = 'mongodb://localhost:27017/justSellIt';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection; // to shorten 
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
})

const port = 5000;
app.listen(5000, () => {
    console.log(`Serving at port ${port}!`);
})