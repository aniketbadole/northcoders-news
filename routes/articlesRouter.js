const articlesRouter = require("express").Router();
const {
  sendArticles,
  changeVotes,
  addComments
} = require("../controllers/articlesController");

articlesRouter
  .route("/:article_id")
  .get(sendArticles)
  .patch(changeVotes);

articlesRouter.route("/:article_id/comments").post(addComments);

module.exports = articlesRouter;
