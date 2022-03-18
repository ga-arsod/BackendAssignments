const express = require("express");

const userController = require("./controllers/user.controller");
const {register, login} = require("./controllers/auth.controller");
const postController = require("./controllers/post.controller");

const app = express();

app.use(express.json());

app.use("/users", userController);
app.post("/register", register);
app.post("/login", login);
app.use("/posts", postController);

module.exports = app;