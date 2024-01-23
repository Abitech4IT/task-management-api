const express = require("express");

const taskRouter = require("./Routes/taskRoute");
const userRouter = require("./Routes/userRoute");

const app = express();

app.use(express.json());

//Routes
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
