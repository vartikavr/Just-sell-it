const Others = require('../schemas/othersCat');
const User = require('../schemas/user');

module.exports.getItems = async (req, res) => {
    console.log("in others ...");
    const others = await Others.find({});
    console.log(others);
    res.send(others);
}

module.exports.specificItem = async (req, res) => {
    console.log("inside others specific")
    console.log(req.params);
    const othersId = req.params.id;
    const other = await Others.findById(othersId).populate('userId');
    console.log(other);
    const user = await User.findById(currentUser);
    res.status(200).send({ success: 'other seeded!', other, currentUser, role: user.role });
}

module.exports.newItem = async (req, res) => {
    console.log("adding new item ...");
    console.log(req.body);
    const userId = currentUser;
    const newItem = new Others({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        userId: userId,
    });
    newItem.images.push({ url: req.body.image });
    try {
        await newItem.save();
        console.log(newItem);
        return res.status(200).send({ sucess: "registered new item!", newItem });
    }
    catch (e) {
        console.log("error", e);
    }
}

module.exports.editItem = async (req, res) => {
    console.log("Editing item of others Category ...", req.params);
    const itemId = req.params.id;
    const updateItem = await Others.findByIdAndUpdate(itemId,
        {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description
        });
    updateItem.images[0].url = req.body.image;
    await updateItem.save();
    res.redirect(`/categories/others/${updateItem._id}`);
}

module.exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await Others.findByIdAndDelete(id);
        console.log('Successfully deleted the item!');
        res.redirect('/categories/others');
    }
    catch (e) {
        return res.status(403).send({ error: "unsuccessful deletion" });
    }
}