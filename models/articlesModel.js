const connection = require("../db/connection");
const selectArticles = article_id => {
  return connection("articles")
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy(articles.article_id)
    .count({ comment_count: "comments.article_id" });
  // .then(article => {
  //   const formattedArticles = article.map(articles => {
  //     const copiedArticle = { ...articles };
  //     copiedArticle.comment_count = +copiedArticle.comment_count;
  //     return formattedArticles;
  //   });
  // });
};

module.exports = selectArticles;

// const selectArticles = article_id => {
//   return connection("articles")
//     .select("*")
//     .from("articles")
//     .where("article_id", "=", article_id);
//   // .then(results => {
//   //   console.log(results, "in articleModel results!");
//   // });
// };
