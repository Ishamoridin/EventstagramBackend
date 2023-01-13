const User = require('../users/userModel');
const Event = require('./eventModel');

keyChecker = (input) => {
    let output = {};
    Object.keys(input).map((field) => {
        if (input.field){output.field = input.field}
    });
    return output
}
exports.createEvent = async(req, res) => {
    const eventObj = req.body;
    console.log(eventObj)
    try {
        const newEvent = await Event.create(eventObj);
        console.log(`created new event: ${newEvent}`);
        res.status(201).send({created: newEvent})
    } catch (error) {
        console.log(error)
    }
};
exports.readEvents = async(req, res) => {
    const eventObj = req.body || {}
    try {
        const results = await Event.findAll(eventObj);
        res.status(200).send({result: results})
    } catch (error) {
        console.log(error)
    }
};
exports.updateEvent = async(req, res) => {
    const eventObj = req.body.newEvent, eventFilter = req.body.oldEvent
    try {
        const searchFilter = keyChecker(eventFilter);
        const updatedEvent = await Event.update(eventObj, { where: searchFilter }).then((result) => {
            return result
        });
        console.log(`updated event: ${updatedEvent}`);
        res.status(200).send({updated: updatedEvent})
    } catch (error) {
        console.log(error)
    }
};
exports.deleteEvent = async(req, res) => {
    const eventObj = req.body
    try {
        const deletedEvent = await User.destroy({ where: eventObj }).then((result) => {
            return result
        });
        console.log(`deleted event: ${deletedEvent}`)
        res.status(200).send({deleted: deletedEvent})
    } catch (error) {
        console.log(error)
    }
};