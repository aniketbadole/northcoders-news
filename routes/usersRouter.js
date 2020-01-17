const usersRouter = require("express").Router();
const { sendUsers } = require("../controllers/usersController");
const otherErrors = require("../errors/errors");

usersRouter.route("/:username").get(sendUsers);

usersRouter.all("/", otherErrors);

module.exports = usersRouter;
