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
      console.log(article, ".........................");
      if (article.length === 0) {
        return Promise.reject({ msg: "Not Found", status: 404 });
      } else {
        const formattedArticles = article.map(articles => {
          const copiedArticle = { ...articles };
          copiedArticle.comment_count = +copiedArticle.comment_count;
          return copiedArticle;
        });
        return formattedArticles;
      }
    });
};

const changeVotesInArticle = (article_id, inc_votes) => {
  // return connection("houses").select("*").where("house_id", house_id).then(houseRows => if (house.length) {...} ) else {}
  return connection
    .from("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(results => {
      console.log(results, "in changeVotesInArticle model!!");
      if (!results.length) {
        return Promise.reject({ msg: "Not Found", status: 404 });
      } else {
        return results;
      }
    });
};

const postComments = (article_id, username, body) => {
  return connection
    .from("comments")
    .insert({ article_id: article_id, author: username, body: body })
    .returning("*")
    .then(results => {
      // console.log(results, "postComment results");
      return results;
    });
};

const selectComments = (article_id, order_By, sort_By) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .then(results => {
      if (results.length) {
        return connection
          .select("comment_id", "votes", "created_at", "author", "body")
          .from("comments")
          .where("article_id", article_id)
          .orderBy(sort_By || "created_at", order_By || "desc");
      } else {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
    });
};

//check if the id exists
// author = null?

module.exports = {
  selectArticles,
  changeVotesInArticle,
  postComments,
  selectComments
};
