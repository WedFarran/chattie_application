const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
//const chatRouter = require("./routes/chat");
//const messageRouter = require("./routes/message");

dotenv.config();
//get variables from .env file => process.env.VARIABLE_NAME

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/", authRouter);
app.use("/api/users", userRouter);
//app.use("/api/chat", chatRouter);
//app.use("/api/message", messageRouter);

app.get("/", (req, res) => res.send("Hello Wed!"));

app.listen(process.env.PORT || 5002, console.log("listening on port ${port}!"));
