const User = require('./userModel');

keyChecker = (input) => {
    let output = {};
    if (input.username){output.username = input.username};
    if (input.email){output.email = input.email};
    if (input.password){output.password = input.password};
    return output
}

exports.createUser = async(userObj) => {
    try {
        const newUser = await User.create(userObj);
        console.log(`created new user: ${newUser}`);
        res.status(200).send({updated: u})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message})
    }
};
exports.readUsers = async(userObj) => {
    try {
        const results = await User.findAll(userObj);
        res.status(200).send({users: users.map((user) => {return user.username})})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message})
    }
};
exports.updateUser = async(userObj, userFilter) => {
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
exports.deleteUser = async(userObj) => {
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