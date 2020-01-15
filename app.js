const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use("/api", apiRouter);

app.use(function(err, req, res, next) {
  res.status(err.status).send({ msg: err.msg });
});

module.exports = app;

// app.use(function(err, req, res, next) {
//   res.status(400).send({ msg: "Bad request" });
// });
