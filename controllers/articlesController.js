const selectArticles = require("../models/articlesModel");

const sendArticles = (req, res, next) => {
  selectArticles(req.params.article_id)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      console.log(err, "in controller!!");
      next(err);
    });
};

module.exports = { selectArticles, sendArticles };
