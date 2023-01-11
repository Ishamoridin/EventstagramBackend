require(`./db/connections`);
const cors = require('cors');
const express = require('express');
const app = express();
const userRouter = require('./users/userRoutes');
const eventRouter = require('./events/eventRoutes');
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(eventRouter);
app.get("/health", (req, res) => {
    res.status(200).send({ message: "API is working" })
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});