const bcrypt = require('bcrypt');
const User = require('../users/userModel');
const Event = require('../events/eventModel');
const jwt = require('jsonwebtoken');

exports.hashPass = async(req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
};

exports.validateUser = (req, res, next) => {
    const usernameTest = /^[a-zA-Z0-9]{1,255}$/,
    passwordTest = /^(?=.{8,255}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).*$/,
    emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const body = req.body;
    try {
        if (
        body.username &&
        body.email && 
        body.password
        )
        {
            if (
                body.username.match(usernameTest) && 
                body.email.match(emailTest) && 
                body.password.match(passwordTest)
                )
                {
                next()
                }                        
            else if (!(body.username.match(usernameTest))){throw new Error ('Validation failed on username')}
            else if (!(body.email.match(emailTest))){throw new Error ('Validation failed on email')}
            else if (!(body.password.match(passwordTest))){throw new Error ('Validation failed on password')}
            else {throw new Error ('Validation failed, please ensure all fields are filled correctly')}
        }
        else if (!(body.username)){throw new Error ('Validation failed on username')}
        else if (!(body.email)){throw new Error ('Validation failed on email')}
        else if (!(body.password)){throw new Error ('Validation failed on password')}
        else {throw new Error ('Validation failed, please ensure all fields are filled')}
}
    catch (error) {
        console.log(error);
        res.status(500).send({error: error.message})
    }
};

exports.validateEvent = (req, res, next) => {
    const nameTest = /^[a-zA-Z0-9\s]{1,255}$/,
    descriptionTest = /^[a-zA-Z0-9\s]{1,500}$/
    const body = req.body;
    try {
        if (
            body.eventName &&
            body.description &&
            body.startTime &&
            body.endTime &&
            body.location
        ) {
            if (
                body.eventName.match(nameTest) &&
                body.description.match(descriptionTest) &&
                (body.endTime >= body.startTime)
            ) {
                next()
            }
            else if (!body.eventName.match(nameTest)){throw new Error ('Validation failed on event name.')}
            else if (!body.description.match(descriptionTest)){throw new Error ('Validation failed on event description.')}
            else if (!(body.endTime >= body.startTime)){throw new Error ('Events cannot start after they end or end before they start.')}
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message})
    }
};

exports.tokenCheck = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        if (!token){
            console.log("No token passed");
            throw new Error ("No token passed")
        };

        const decodedToken = await jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decodedToken._id);
        console.log(user);
        if(user) {
            req.authUser = user;
            next()
        } else {
            throw new Error ("User is unauthorised")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message })
    }
}
exports.comparePass = async(req, res, next) => {
    try {
        req.user = await User.findOne({where: {username: req.body.username}});
        console.log(req.body.password, req.user.password);
        if (req.user && await bcrypt.compare(req.body.password, req.user.password)){
            console.log("username exists and plain text password matches hashed password");
            next()
        }
        else {
            throw new Error ("Incorrect username or password")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message})
    }
}