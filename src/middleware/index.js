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
    const nameTest = /^[a-zA-Z0-9]{1,255}$/,
    descriptionTest = /^[a-zA-Z0-9]{1,500}$/
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
                (body.endTime-body.startTime >= 0)
            ) {
                next()
            }
            else if (!body.eventName.match(nameTest)){throw new Error ('Validation failed on event name.')}
            else if (!body.description.match(descriptionTest)){throw new Error ('Validation failed on event description.')}
            else if (!(body.endTime-body.startTime >= 0)){throw new Error ('Events cannot start after they end or end before they start.')}
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message})
    }
};

exports.tokenCheck = (req, res, next) => {
    
}