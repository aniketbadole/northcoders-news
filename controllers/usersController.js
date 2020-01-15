const selectUsers = require("../models/usersModel");

const sendUsers = (req, res, next) => {
  selectUsers(req.params.username)
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(err => {
      console.log(err, "in controller!");
      next(err);
    });
};

module.exports = { selectUsers, sendUsers };
