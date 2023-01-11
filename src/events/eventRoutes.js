const { Router } = require(`express`);
const eventRouter = Router();
const { validateEvent } = require('../middleware');
const { createEvent, readEvents, updateEvent, deleteEvent } = require(`./eventControllers`)
eventRouter.post("/createEvent", validateEvent, createEvent);
eventRouter.get("/readEvents", readEvents);
eventRouter.patch("/updateEvent", updateEvent);
eventRouter.delete("/deleteEvent", deleteEvent);
module.exports = eventRouter