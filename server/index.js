require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

global.currentUser = null; //contains info of user, if logged in
//const currentPath = req.path;
global.resetUserId = '';
global.emailConfirmationToken = null;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const userRoutes = require('./routes/users');
const wishlistRoutes = require('./routes/user-wishlist');
const categoryRoutes = require('./routes/categories');
const bookRoutes = require('./routes/books');
const cycleRoutes = require('./routes/cycles');
const furnitureRoutes = require('./routes/furniture');
const handicraftRoutes = require('./routes/handicrafts');
const otherRoutes = require('./routes/otherCategory');
const adminRoutes = require('./routes/admin');


app.use('/', userRoutes); // for user routes
app.use('/user/wishlist', wishlistRoutes);
app.use('/admin', adminRoutes);
app.use('/categories', categoryRoutes);
app.use('/categories/books', bookRoutes) //for book routes
app.use('/categories/cycles', cycleRoutes)
app.use('/categories/furniture', furnitureRoutes)
app.use('/categories/handicrafts', handicraftRoutes)
app.use('/categories/others', otherRoutes)

const removeTmp = (path) => {
    console.log("removeTmp ...");
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

app.post('/upload', async (req, res) => {
    try {
        console.log(req);
        console.log("in upload....", req.files);
        const file = req.files.files;
        await cloudinary.uploader.upload(file.tempFilePath, { folder: "JustSellIt" }, async (err, result) => {
            console.log("in cloudinary")
            removeTmp(file.tempFilePath);
            //console.log(result)
            res.status(200).send({ public_id: result.public_id, url: result.secure_url });
        })
    }
    catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})



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