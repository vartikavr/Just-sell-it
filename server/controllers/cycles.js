const Cycle = require('../schemas/cycles');
const User = require('../schemas/user');

module.exports.getCycles = async (req, res) => {
    console.log("in cycles ...");
    const cycles = await Cycle.find({});
    console.log(cycles);
    res.send(cycles);
}

module.exports.specificCycle = async (req, res) => {
    console.log("inside cycle specific")
    console.log(req.params);
    const cycleId = req.params.id;
    const cycle = await Cycle.findById(cycleId).populate('userId');
    console.log(cycle);
    const user = await User.findById(currentUser);
    res.status(200).send({ success: 'cycle seeded!', cycle, currentUser, role: user.role, wishlistCycles: user.wishlist.cycles });
}

module.exports.newCycle = async (req, res) => {
    console.log("adding new cycle ...");
    console.log(req.body);
    const userId = currentUser;
    const newCycle = new Cycle({
        title: req.body.title,
        modelNo: req.body.modelNo,
        color: req.body.color,
        price: req.body.price,
        description: req.body.description,
        age: req.body.age,
        userId: userId,
    });
    newCycle.images.push({ url: req.body.image });
    try {
        await newCycle.save();
        console.log(newCycle);
        return res.status(200).send({ sucess: "registered new cycle!", newCycle });
    }
    catch (e) {
        console.log("error", e);
    }
}

module.exports.editCycle = async (req, res) => {
    console.log("Editing cycle ...", req.params);
    const cycleId = req.params.id;
    const updateCycle = await Cycle.findByIdAndUpdate(cycleId,
        {
            title: req.body.title,
            color: req.body.color,
            age: req.body.age,
            modelNo: req.body.modelNo,
            price: req.body.price,
            description: req.body.description
        });
    updateCycle.images[0].url = req.body.image;
    await updateCycle.save();
    res.redirect(`/categories/cycles/${updateCycle._id}`);
}

module.exports.deleteCycle = async (req, res) => {
    const { id } = req.params;
    try {
        const users = await User.find({ 'wishlist.cycles': { '$in': id } });
        for (const index in users) {
            await User.findByIdAndUpdate(users[index]._id, { $pull: { 'wishlist.cycles': id } });
        }
        await Cycle.findByIdAndDelete(id);
        console.log('Successfully deleted the cycle!');
        res.redirect('/categories/cycles');
    }
    catch (e) {
        return res.status(403).send({ error: "unsuccessful deletion" });
    }
}