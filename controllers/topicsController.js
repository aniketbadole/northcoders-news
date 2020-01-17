const selectTopics = require("../models/topicsModel");

const getTopics = (req, res, next) => {
  // console.log("----------- in topicController : getTopics");
  selectTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(err => {
      next(err);
    });
};
module.exports = getTopics;
