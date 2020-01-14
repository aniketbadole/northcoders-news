const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  const topicsInsertions = knex("topics").insert(topicData);
  const usersInsertions = knex("users").insert(userData);

  return Promise.all([topicsInsertions, usersInsertions])
    .then(() => {
      /* 
      
      Your article data is currently in the incorrect format and will violate your SQL schema. 
      
      You will need to write and test the provided formatDate utility function to be able insert your article data.

      Your comment insertions will depend on information from the seeded articles, so make sure to return the data after it's been seeded.
      */
      const formattedArticleData = formatDates(articleData);
      // insert formatted articles (remember to return them from the DB!)
    })
    .then(articleRows => {
      [
        { title: "They're not exactly dogs, are they?", article_id: 1 },
        { title: "Another one?", article_id: 2 }
      ];

      const refObj = {
        "They're not exactly dogs, are they?": 1,
        "Another one?": 2
      };

      const comments = [
        {
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          belongs_to: "Another one?",
          created_by: "butter_bridge",
          votes: 16,
          created_at: 1511354163389
        }
      ];

      //input = commentData, refObj

      //loop through comments array
      //for each comment:
      //  take belongs_to from comment
      //  look up corresponding id in ref obj
      //  create new comment with id instead of title
      //  also change created_by to author
      /* 

      Your comment data is currently in the incorrect format and will violate your SQL schema. 

      Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 
      
      You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
      */

      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex("comments").insert(formattedComments);
    });
};
