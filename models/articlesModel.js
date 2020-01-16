const connection = require("../db/connection");

const selectArticles = article_id => {
  return connection("articles")
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .count({ comment_count: "comment_id" })
    .then(article => {
      const formattedArticles = article.map(articles => {
        const copiedArticle = { ...articles };
        copiedArticle.comment_count = +copiedArticle.comment_count;
        return copiedArticle;
      });
      return formattedArticles;
    });
};

const changeVotesInArticle = (article_id, inc_votes) => {
  return connection
    .from("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(results => {
      // console.log(results, "in changeVotesInArticle model!!");
      return results;
    });
};

const postComments = (article_id, username, body) => {
  return connection
    .from("comments")
    .insert({ article_id: article_id, author: username, body: body })
    .returning("*")
    .then(results => {
      console.log(results, "postComment results");
      return results;
    });
};

module.exports = { selectArticles, changeVotesInArticle, postComments };
