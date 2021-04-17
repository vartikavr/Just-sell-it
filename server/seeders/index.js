const mongoose = require('mongoose');
const books = require('./books');
const Book = require('../schemas/books');
const cycles = require('./cycles');
const Cycle = require('../schemas/cycles');
const others = require('./others');
const Others = require('../schemas/othersCat');
const furniture = require('./furniture');
const Furniture = require('../schemas/furniture');
const handicrafts = require('./handicrafts');
const Handicraft = require('../schemas/handicrafts');


const dbUrl = 'mongodb://localhost:27017/justSellIt';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection; // to shorten 
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
})

//const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDb = async () => {
    await Book.deleteMany({});
    for (let i = 0; i < books.length; i++) {
        const newBook = new Book({
            userId: '6060df3ea1affa27d8cfdc9e',
            title: `${books[i].title}`,
            price: `${books[i].price}`,
            description: `${books[i].description}`,
            images: books[i].images.map(f => ({ url: f.url })),
            author: `${books[i].author}`,
            pages: `${books[i].pages}`,
            edition: `${books[i].edition}`,
        })
        console.log(newBook);
        await newBook.save();
    }

    await Cycle.deleteMany({});
    for (let i = 0; i < cycles.length; i++) {
        const newCycle = new Cycle({
            userId: '6060df3ea1affa27d8cfdc9e',
            title: `${cycles[i].title}`,
            price: `${cycles[i].price}`,
            description: `${cycles[i].description}`,
            images: cycles[i].images.map(f => ({ url: f.url })),
            color: `${cycles[i].color}`,
            age: `${cycles[i].age}`,
            modelNo: `${cycles[i].modelNo}`
        })
        console.log(newCycle);
        await newCycle.save();
    }

    await Furniture.deleteMany({});
    for (let i = 0; i < furniture.length; i++) {
        const newFurniture = new Furniture({
            userId: '6060df3ea1affa27d8cfdc9e',
            title: `${furniture[i].title}`,
            price: `${furniture[i].price}`,
            description: `${furniture[i].description}`,
            images: furniture[i].images.map(f => ({ url: f.url })),
            age: `${furniture[i].age}`,
        })
        console.log(newFurniture);
        await newFurniture.save();
    }

    await Handicraft.deleteMany({});
    for (let i = 0; i < handicrafts.length; i++) {
        const newHandicraft = new Handicraft({
            userId: '6060df3ea1affa27d8cfdc9e',
            title: `${handicrafts[i].title}`,
            price: `${handicrafts[i].price}`,
            description: `${handicrafts[i].description}`,
            images: handicrafts[i].images.map(f => ({ url: f.url })),
            color: `${handicrafts[i].color}`,
        })
        console.log(newHandicraft);
        await newHandicraft.save();
    }

    await Others.deleteMany({});
    for (let i = 0; i < others.length; i++) {
        const newOther = new Others({
            userId: '6060df3ea1affa27d8cfdc9e',
            title: `${others[i].title}`,
            price: `${others[i].price}`,
            description: `${others[i].description}`,
            images: others[i].images.map(f => ({ url: f.url })),
        })
        console.log(newOther);
        await newOther.save();
    }
}

seedDb().then(() => {
    console.log("closing...");
    mongoose.connection.close();
})
