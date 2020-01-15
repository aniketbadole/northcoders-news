const usersRouter = require("express").Router();
const { sendUsers } = require("../controllers/usersController");

usersRouter.route("/:username").get(sendUsers);
console.log("in route");

module.exports = usersRouter;
