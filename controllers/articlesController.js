const {
  selectArticles,
  changeVotesInArticle,
  postComments
} = require("../models/articlesModel");

const sendArticles = (req, res, next) => {
  selectArticles(req.params.article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      // console.log(err, "in controller!!");
      next(err);
    });
};

const changeVotes = (req, res, next) => {
  // console.log(req.body, "---------");
  changeVotesInArticle(req.params.article_id, req.body.inc_votes)
    .then(article => {
      // console.log(article, "in changeVotes articlesController");
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const addComments = (req, res, next) => {
  console.log(req.body);
  postComments(req.params.article_id, req.body.username, req.body.body)
    .then(comments => {
      res.status(201).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { selectArticles, sendArticles, changeVotes, addComments };
