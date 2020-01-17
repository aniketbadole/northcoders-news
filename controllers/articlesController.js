const {
  selectArticles,
  changeVotesInArticle,
  postComments,
  selectComments
} = require("../models/articlesModel");

const sendArticles = (req, res, next) => {
  selectArticles(req.params.article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      if (err.code === "22P02") {
        console.log(
          "^^^^^^^^^^^^^^^^^^^ i am an error ",
          err.code,
          " ^^^^^^^^^^^^^^^^^"
        );
      }
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
  // console.log(req.body); //getting an empty object??
  postComments(req.params.article_id, req.body.username, req.body.body)
    .then(comments => {
      res.status(201).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

const findComments = (req, res, next) => {
  // console.log(req.body, "this*****************");
  selectComments(req.params.article_id, req.query.order, req.query.sort_by)
    .then(res => {
      res.status(200).send({ comments: res });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  selectArticles,
  sendArticles,
  changeVotes,
  addComments,
  findComments
};
