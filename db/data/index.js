// test, development, production

// exports.process.env.NODE_ENV = "test";
const ENV = process.env.NODE_ENV || "development";

const devData = require("./development-data/index");
const testData = require("./test-data/index");

const data = {
  development: devData,
  test: testData
};

// module.exports = { devData, testData };
module.exports = data[ENV];
