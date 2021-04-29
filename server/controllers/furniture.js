const Furniture = require('../schemas/furniture');

module.exports.getFurniture = async (req, res) => {
    console.log("in furniture ...");
    const furniture = await Furniture.find({});
    console.log(furniture);
    res.send(furniture);
}

module.exports.specificFurniture = async (req, res) => {
    console.log("inside furniture specific")
    console.log(req.params);
    const furnitureId = req.params.id;
    const furniture = await Furniture.findById(furnitureId).populate('userId');
    console.log(furniture);
    res.status(200).send({ success: 'furniture seeded!', furniture });
}

module.exports.newFurniture = async (req, res) => {
    console.log("adding new furniture ...");
    console.log(req.body);
    const userId = currentUser;
    const newFurniture = new Furniture({
        title: req.body.title,
        age: req.body.age,
        price: req.body.price,
        description: req.body.description,
        userId: userId,
    });
    newFurniture.images.push({ url: req.body.image });
    try {
        await newFurniture.save();
        console.log(newFurniture);
        return res.status(200).send({ sucess: "registered new furniture!", newFurniture });
    }
    catch (e) {
        console.log("error", e);
    }
}

module.exports.editFurniture = async (req, res) => {
    console.log("Editing furniture ...", req.params);
    const fId = req.params.id;
    const updateFurniture = await Furniture.findByIdAndUpdate(fId,
        {
            title: req.body.title,
            age: req.body.age,
            price: req.body.price,
            description: req.body.description
        });
    updateFurniture.images[0].url = req.body.image;
    await updateFurniture.save();
    res.redirect(`/categories/furniture/${updateFurniture._id}`);
}

module.exports.deleteFurniture = async (req, res) => {
    const { id } = req.params;
    try {
        await Furniture.findByIdAndDelete(id);
        console.log('Successfully deleted the furniture!');
        res.redirect('/categories/furniture');
    }
    catch (e) {
        return res.status(403).send({ error: "unsuccessful deletion" });
    }
}