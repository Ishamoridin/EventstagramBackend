const jwt = require("jsonwebtoken");
const SiteUser = require("./userModel");
require("dotenv").config();
const bcrypt = require("bcrypt")

keyChecker = (input) => {
  let output = {};
  if (input.username) {
    output.username = input.username;
  }
  if (input.email) {
    output.email = input.email;
  }
  if (input.password) {
    output.password = input.password;
  }
  return output;
};

exports.createUser = async (req, res) => {
  const userObj = req.body;
  try {
    const newUser = await SiteUser.create(userObj);
    console.log(`created new user: ${newUser}`);
    res.status(200).send({ username: newUser.username });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
exports.readUsers = async (req, res) => {
  console.log(req)
  const userObj = req.body;
  const filter = userObj.username ? userObj.username : ""
  try {
    const results = await SiteUser.findAll({where: {username: filter}});
    res.status(200).send({
      users: results.map((user) => {
        console.log(user);return user;
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  // console.log(req);
  const userObj = req.body.userObj,
    userFilter = req.body.userFilter;
    console.log("userObj = ", userObj);
    console.log("userFilter = ", userFilter)
  try {
    // const searchFilter = keyChecker(userFilter);console.log(searchFilter, "searchFilter above");
    // const updatedUser = await SiteUser.update(userObj, {
    //   where: searchFilter,
    // }).then((result) => {
    //   return result;
    // });
    // console.log(`updated user: ${updatedUser}`);
    // res.status(200).send({ updated: updatedUser });
      const siteUser = await SiteUser.findOne({where: {username: req.body.userFilter.username}});
      if (!siteUser) {
          throw Error(`User not updated. username: ${req.body.userObj ? req.body.userObj.username : req.body.username}`);
      }

      siteUser.username = userObj.username;
      siteUser.password = userObj.password;
      siteUser.email = userObj.email
      const updatedUser = await siteUser.save();
      console.log(updatedUser)
      res.status(200).send({ updated: updatedUser })
  } catch (error) {
    console.log(error);
  }
};
exports.deleteUser = async (req, res) => {
  const userObj = req.body;
  try {
    const deletedUser = await SiteUser.destroy({ where: userObj }).then(
      (result) => {
        return result;
      }
    );
    console.log(`deleted user: ${deletedUser}`);
    res.status(200).send({ deleted: deletedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  console.log("Middleware passed, attempting login");
  try {
    if (req.authUser) {
      console.log("Token check passed and continuing to persistent login");
      res.status(200).send({ username: req.authUser.username });
      return;
    }
    const user = await SiteUser.findOne({
      where: { username: req.body.username },
    });
    console.log(user);
    console.log("Username found in database");
    const token = await jwt.sign({ id: user.id }, process.env.SECRET);
    console.log(token);
    res
      .status(200)
      .send({ username: user.username, message: "login successful", token });
  } catch (error) {
    console.log(error);
    console.log("username not found");
    res.status(500).send({ error: error.message });
  }
};
