const User = require('../schemas/user');
const bcrypt = require('bcrypt');

module.exports.homepage = (req, res) => {
    console.log("homepage ..");
}

module.exports.registerUser = async (req, res) => {
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
        currentUser = newUser._id;
        return res.status(200).send({ sucess: "registered!" });
    }
    catch (e) {
        console.log(e);
        return res.status(403).send({ error: "Invalid entry!" });
    }
}

module.exports.loginUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const check = await User.findOne({ username: username });
    console.log(check);
    if (check) {
        const isMatch = await bcrypt.compare(password, check.password);
        if (!isMatch) {
            console.log("not pwd valid")
            return res.status(403).send({ error: "invalid pwd" });
        }
        console.log("Successfully logged in!");
        currentUser = check._id;
        console.log(currentUser);
        return res.status(200).send({ sucess: "logged in!" });
    }
    else {
        console.log("username not found")
        return res.status(403).send({ error: "invalid" });
    }
}


module.exports.forgotPassword = async (req, res) => {
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
}

module.exports.securityQA = async (req, res) => {
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
}

module.exports.resetPassword = async (req, res) => {
    const password = req.body.pwd;
    const newPassword = req.body.newPwd;
    console.log(resetUserId);
    const userId = resetUserId;
    console.log(req.body);
    if (password === newPassword) {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        const check = await User.findByIdAndUpdate(userId, { password: passwordHash });
        await check.save();
        console.log("new user details..", check);
        resetUserId = '';
        currentUser = userId;
        return res.status(200).send({ success: "password updated." });
    }
    else {
        return res.status(403).send({ error: "Passwords do not match." });
    }
}

module.exports.userInfo = async (req, res) => {
    console.log("inside user info...", currentUser);
    const user = await User.findById(currentUser);
    if (user) {
        console.log("user found..", user)
        return res.status(200).send({ success: "User found!", user })
    }
    return res.status(400).send({ error: "user not found!" });
}

module.exports.editUserInfo = async (req, res) => {
    console.log("Editing user info ...", req.body);
    try {
        const userId = currentUser;
        const updateUser = await User.findOneAndUpdate({ _id: userId },
            {
                name: req.body.name,
                username: req.body.username,
                course: req.body.course,
                year: req.body.year,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address
            },
            {
                runValidators: true
            }
        );
        await updateUser.save();
        res.status(200).send({ success: "Details updated." })
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ error: "invalid details." })
    }
}

module.exports.deleteUserInfo = async (req, res) => {
    console.log("inside delete user info...", currentUser);
    const id = currentUser;
    try {
        await User.findByIdAndDelete(id);
        currentUser = null;
        console.log("Successfully deleted the user's account!");
        res.status(200).send({ success: "deleted user" });
    }
    catch (e) {
        return res.status(403).send({ error: "unsuccessful deletion" });
    }
}

module.exports.checkPwd = async (req, res) => {
    const password = req.body.pwd;
    const newPassword = req.body.newPwd;
    console.log(req.body);
    if (password === newPassword) {
        const user = await User.findById(currentUser);
        console.log(password, user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("not valid password")
            return res.status(403).send({ error: "invalid password" });
        }
        return res.status(200).send({ success: "passwords match." });
    }
    else {
        return res.status(403).send({ error: "Passwords do not match." });
    }
}

module.exports.resetQA = async (req, res) => {
    const { question, answer, newAnswer } = req.body;
    console.log(req.body);
    if (newAnswer === answer) {
        const answerHash = await bcrypt.hash(answer, 10);
        const user = await User.findByIdAndUpdate(currentUser, { "$set": { "securityQ": question, "securityA": answerHash } });
        await user.save();
        console.log("new user details..", user);
        return res.status(200).send({ success: "security Q/A updated." });
    }
    else {
        return res.status(403).send({ error: "Answers do not match." });
    }
}

module.exports.logoutUser = async (req, res) => {
    console.log(currentUser);
    if (currentUser) {
        //req.session.user_id = null;
        //req.user = null;
        currentUser = null;
        console.log("logging out ...", req.user);
        res.status(200).send({ success: 'Logged out!' });
    }
}