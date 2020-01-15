const connection = require("../db/connection");
const selectUsers = username => {
  return connection("users")
    .select("*")
    .from("users")
    .where("username", "=", username)
    .then(results => {
      // console.log(results, "in usersModel results!");
      // console.log(username);
      if (results.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return results;
      }
      // console.log("in model!!", results);
    });
};

module.exports = selectUsers;
