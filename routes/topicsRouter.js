const topicsRouter = require("express").Router();
const getTopics = require("../controllers/topicsController");
const otherErrors = require("../errors/errors");

topicsRouter.route("/").get(getTopics);

topicsRouter.all("/", otherErrors);

module.exports = topicsRouter;
