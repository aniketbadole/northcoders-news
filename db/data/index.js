// test, development, production

exports.process.env.NODE_ENV = "test";

const devData = require("./development-data/index");
const testData = require("./test-data/index");

module.exports = { devData, testData };
