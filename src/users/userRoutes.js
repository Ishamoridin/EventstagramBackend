const { Router } = require(`express`);
const userRouter = Router();
const { hashPass, comparePass, validateUser, tokenCheck } = require('../middleware');
const { createUser, readUsers, updateUser, deleteUser, loginUser } = require(`./userControllers`)
userRouter.post("/createUser", validateUser, hashPass, createUser);
userRouter.post("/readUsers", readUsers);
userRouter.post("/login", comparePass, loginUser);
userRouter.patch("/updateUser", comparePass, hashPass, updateUser);
userRouter.delete("/deleteUser", deleteUser);
userRouter.get("/authCheck", tokenCheck, loginUser)
module.exports = userRouter