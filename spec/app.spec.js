process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("app", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });

  describe("/api", () => {
    describe("/topics", () => {
      it("GET 200: Get a response from the server", () => {
        request(app)
          .get("/api/topics")
          .expect(200)
          .then(response => {
            // console.log("*******In response", response.body.topics);
          });
      });
    });

    describe("/users", () => {
      it("GET 200: Get a response from the server when a valid ID is passed", () => {
        return request(app)
          .get("/api/users/icellusedkars")
          .expect(200)
          .then(res => {
            // const { user } = res.body;
            // console.log(res.body.users[0].username);
            // console.log(res.body);
            expect(res.body.users[0].username).to.eql("icellusedkars");
          });
      });
      it("GET 404: Get an error from the server when a valid but non existent ID is passed", () => {
        return request(app)
          .get("/api/users/nonexistentid")
          .expect(404)
          .then(result => {
            console.log(result.body, "in here!!!!!!!!!!!!!!!");
          });
      });
      it("GET 200: Get a response with username, avatar and name properties", () => {
        return request(app)
          .get("/api/users/icellusedkars")
          .expect(200)
          .then(res => {
            // console.log(res.body.users[0]);
            // console.log(res.body.users);
            expect(res.body.users).to.be.an("Array");
            expect(res.body.users[0]).to.contain.keys(
              "username",
              "avatar_url",
              "name"
            );
          });
      });
    });

    describe("/articles", () => {
      it("GET 200: Get a response from the server", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(res => {
            // console.log(res.body.articles[0].article_id);
            // console.log(res.body);
            expect(res.body.articles[0].article_id).to.equal(1);
          });
      });
      it("GET 200: Get a response with all properties including comment_count", () => {
        return request(app)
          .get("/api/articles/5")
          .expect(200)
          .then(res => {
            console.log(res.body);
          });
      });
    });
  });
});
