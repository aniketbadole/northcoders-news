const connection = require("../db/connection");
const selectTopics = () => {
  // console.log(">>>>>>>>> in topicsModel selectTopics <<<<<<<<<<");
  // return connection("topics").select("*");
  return connection("topics")
    .select("*")
    .from("topics")
    .then(results => {
      console.log(results, "in topicsModel results!");
      return results;
    })
    .catch(err => {
      next(err);
    });
};

module.exports = selectTopics;
