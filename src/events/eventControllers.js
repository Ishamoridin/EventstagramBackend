const User = require('../users/userModel');
const Event = require('./eventModel');

keyChecker = (input) => {
    let output = {};
    Object.keys(input).map((field) => {
        if (input.field){output.field = input.field}
    });
    return output
}
exports.createEvent = async(eventObj) => {
    try {
        const newEvent = await Event.create(eventObj);
        console.log(`created new event: ${newEvent}`)
    } catch (error) {
        console.log(error)
    }
};
exports.readEvents = async(eventObj) => {
    try {
        const results = await Event.findAll(eventObj);
        return results
    } catch (error) {
        console.log(error)
    }
};
exports.updateEvent = async(eventObj, eventFilter) => {
    try {
        const searchFilter = keyChecker(eventFilter);
        const updatedEvent = await Event.update(eventObj, { where: searchFilter }).then((result) => {
            return result
        });
        console.log(`updated event: ${updatedEvent}`)
    } catch (error) {
        console.log(error)
    }
};
exports.deleteEvent = async(eventObj) => {
    try {
        const deletedEvent = await User.destroy({ where: eventObj }).then((result) => {
            return result
        });
        console.log(`deleted event: ${deletedEvent}`)
        return deletedEvent
    } catch (error) {
        console.log(error)
    }
};