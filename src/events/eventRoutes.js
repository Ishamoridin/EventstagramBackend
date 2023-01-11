const { Router } = require(`express`);
const userRouter = Router();
const { validateEvent } = require('../middleware');
const { createEvent, readEvents, updateEvent, deleteEvent } = require(`./eventControllers`)
userRouter.post("/createEvent", validateEvent, createEvent);
userRouter.get("/readEvents", readEvents);
userRouter.patch("/updateEvent", updateEvent);
userRouter.delete("/deleteEvent", deleteEvent);
module.exports = userRouter