const Handicraft = require('../schemas/handicrafts');
const User = require('../schemas/user');

module.exports.getHandicrafts = async (req, res) => {
    console.log("in handicrafts ...");
    const handicrafts = await Handicraft.find({});
    console.log(handicrafts);
    res.send(handicrafts);
}

module.exports.specificHandicraft = async (req, res) => {
    console.log("inside handicraft specific")
    console.log(req.params);
    const handicraftId = req.params.id;
    const handicraft = await Handicraft.findById(handicraftId).populate('userId');
    console.log(handicraft);
    const user = await User.findById(currentUser);
    res.status(200).send({ success: 'handicraft seeded!', handicraft, currentUser, role: user.role, wishlistHandicrafts: user.wishlist.handicrafts });
}

module.exports.newHandicraft = async (req, res) => {
    console.log("adding new handicraft ...");
    console.log(req.body);
    const userId = currentUser;
    const newHandicraft = new Handicraft({
        title: req.body.title,
        color: req.body.color,
        price: req.body.price,
        description: req.body.description,
        userId: userId,
    });
    newHandicraft.images.push({ url: req.body.image });
    try {
        await newHandicraft.save();
        console.log(newHandicraft);
        return res.status(200).send({ sucess: "registered new handicraft!", newHandicraft });
    }
    catch (e) {
        console.log("error", e);
    }
}

module.exports.editHandicraft = async (req, res) => {
    console.log("Editing handicraft ...", req.params);
    const handicraftId = req.params.id;
    const updateHandicraft = await Handicraft.findByIdAndUpdate(handicraftId,
        {
            title: req.body.title,
            color: req.body.color,
            price: req.body.price,
            description: req.body.description
        });
    updateHandicraft.images[0].url = req.body.image;
    await updateHandicraft.save();
    res.redirect(`/categories/handicrafts/${updateHandicraft._id}`);
}

module.exports.deleteHandicraft = async (req, res) => {
    const { id } = req.params;
    try {
        const users = await User.find({ 'wishlist.handicrafts': { '$in': id } });
        for (const index in users) {
            await User.findByIdAndUpdate(users[index]._id, { $pull: { 'wishlist.handicrafts': id } });
        }
        await Handicraft.findByIdAndDelete(id);
        console.log('Successfully deleted the handicraft!');
        res.redirect('/categories/handicrafts');
    }
    catch (e) {
        return res.status(403).send({ error: "unsuccessful deletion" });
    }
}