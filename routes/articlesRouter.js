const articlesRouter = require("express").Router();
const {
  sendArticles,
  changeVotes,
  addComments,
  findComments
} = require("../controllers/articlesController");
const otherErrors = require("../errors/errors");

articlesRouter
  .route("/:article_id")
  .get(sendArticles)
  .patch(changeVotes);

articlesRouter
  .route("/:article_id/comments")
  .post(addComments)
  .get(findComments);

articlesRouter.all("/:article_id", otherErrors);

module.exports = articlesRouter;
