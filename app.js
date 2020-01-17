const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

// app.use(function(err, req, res, next) {
//   if (err.status) {
//     // or condition (err.code = "22P02") for invalid ID
//     res.status(err.status).send({ msg: err.msg });
//   } else {
//     res.status(400).send({ msg: "Bad Request" });
//   }
// });

app.use(function(err, req, res, next) {
  if (err.code) {
    const psqlErrors = {
      "42703": "Bad Request",
      "22P02": "Bad Request - Invalid ID"
    };
    res.status(400).send({ msg: psqlErrors[err.code] });
  } else if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
});

// function errorHandler(err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500);
//   res.render("error", { error: err });
// }

module.exports = app;

// app.use(function(err, req, res, next) {
//   res.status(400).send({ msg: "Bad request" });
// });
