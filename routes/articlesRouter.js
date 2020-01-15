const articlesRouter = require("express").Router();
const { sendArticles } = require("../controllers/articlesController");

articlesRouter.route("/:article_id").get(sendArticles);

module.exports = articlesRouter;
