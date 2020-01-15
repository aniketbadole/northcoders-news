const selectArticles = require("../models/articlesModel");

const sendArticles = (req, res, next) => {
  selectArticles(req.params.article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      console.log(err, "in controller!!");
      next(err);
    });
};

module.exports = { selectArticles, sendArticles };
