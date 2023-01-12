const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('./userModel');
require('dotenv').config()

keyChecker = (input) => {
    let output = {};
    if (input.username){output.username = input.username};
    if (input.email){output.email = input.email};
    if (input.password){output.password = input.password};
    return output
}

exports.createUser = async(req, res) => {
    const userObj = req.body
    try {
        const newUser = await User.create(userObj);
        console.log(`created new user: ${newUser}`);
        res.status(200).send({updated: u})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message})
    }
};
exports.readUsers = async(req, res) => {
    const userObj = req.body
    try {
        const results = await User.findAll(userObj);
        res.status(200).send({users: users.map((user) => {return user.username})})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message})
    }
};
exports.updateUser = async(req, res) => {
    const userObj = req.body.updatedUser, userFilter = req.body.userFilter
    try {
        const searchFilter = keyChecker(userFilter);
        const updatedUser = await User.update(userObj, { where: searchFilter }).then((result) => {
            return result
        });
        console.log(`updated user: ${updatedUser}`)
    } catch (error) {
        console.log(error);

    }
};
exports.deleteUser = async(req, res) => {
    const userObj = req.body
    try {
        const deletedUser = await User.destroy({ where: userObj }).then((result) => {
            return result});
            console.log(`deleted user: ${deletedUser}`)
            return deletedUser;
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message})
    }
};

exports.loginUser = async(req, res) => {
    console.log("Middleware passed, attempting login")
    try {
        if (req.authUser) {
            console.log("Token check passed and continuing to persistent login");
            res.status(200).send({username: req.authUser.username});
            return
        }
        const user = await User.findOne({username: req.body.username});
        console.log(user);
        console.log("Username found in database");
        const token = await jwt.sign({_id: user._id}, process.env.SECRET);
        console.log(token);
        res.status(200).send({username: user.username, message: "login successful", token});
    } catch (error) {
        console.log(error);
        console.log("username not found");
        res.status(500).send({error: error.message})
    }
}