module.exports.displayCategories = async (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    console.log("categories...", id)
    res.redirect(`/categories/${id}`);
}