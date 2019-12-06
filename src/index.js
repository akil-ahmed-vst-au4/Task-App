const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

//
//5de9f8c9d72bd16830747111

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//Without middleware:     new request --> run route handler
//with middleware:        new request --> do something --> run route handler

app.listen(port, () => {
  console.log("Server is on the port " + port);
});
