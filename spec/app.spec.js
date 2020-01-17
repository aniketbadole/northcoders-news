process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const chaiSorted = require("chai-sorted");

chai.use(chaiSorted);

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
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(response => {
            // console.log("*******In response", response.body.topics);
          });
      });
      it("GET - 200: Return an array of objects with description and slug", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(result => {
            expect(result.body.topics).to.be.an("array");
            expect(result.body.topics[0]).to.be.an("object");
            expect(result.body.topics[0]).to.have.keys("description", "slug");
          });
      });
      it("POST - 405: Return an error 405 when other methods are requested'", () => {
        return request(app)
          .post("/api/topics")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("PATCH - 405: Return an error 405 when other methods are requested'", () => {
        return request(app)
          .patch("/api/topics")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("DELETE - 405: Return an error 405 when other methods are requested'", () => {
        return request(app)
          .delete("/api/topics")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
    });

    describe("/users", () => {
      it("GET 200: Get a response from the server when a valid ID is passed", () => {
        return request(app)
          .get("/api/users/icellusedkars")
          .expect(200)
          .then(res => {
            expect(res.body.users[0].username).to.eql("icellusedkars");
          });
      });
      it("GET 404: Get an error from the server when a valid but non existent ID is passed", () => {
        return request(app)
          .get("/api/users/nonexistentid")
          .expect(404)
          .then(result => {
            expect(result.body.msg).to.equal("Not Found");
          });
      });
      it("GET 200: Get a response with username, avatar and name properties", () => {
        return request(app)
          .get("/api/users/icellusedkars")
          .expect(200)
          .then(res => {
            expect(res.body.users).to.be.an("Array");
            expect(res.body.users[0]).to.contain.keys(
              "username",
              "avatar_url",
              "name"
            );
          });
      });
      it("POST - 405: Return an error 405 when other methods are requested'", () => {
        return request(app)
          .post("/api/users")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("PATCH - 405: Return an error 405 when other methods are requested'", () => {
        return request(app)
          .patch("/api/users")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("DELETE - 405: Return an error 405 when other methods are requested'", () => {
        return request(app)
          .delete("/api/users")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
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
            const { article } = res.body;
            // console.log(article[0]);
            expect(article[0].article_id).to.equal(1);
          });
      });
      it("GET 200: Get a response with all properties including comment_count", () => {
        return request(app)
          .get("/api/articles/5")
          .expect(200)
          .then(res => {
            expect(res.body.article[0]).to.contain.keys(
              "author",
              "article_id",
              "title",
              "body",
              "votes",
              "comment_count"
            );
          });
      });
      it("GET 400: Bad Request: Returns an error when given an invalid ID", () => {
        return request(app)
          .get("/api/articles/invalidID")
          .expect(400)
          .then(res => {
            // console.log(res.body.msg);
            expect(res.body.msg).to.equal("Bad Request - Invalid ID");
          });
      });
      it("PATCH - 200: Update the vote when given an article_id and the number of votes", () => {
        return request(app)
          .patch("/api/articles/5")
          .send({ inc_votes: 10 })
          .expect(200)
          .then(res => {
            // console.log(res.body.article[0].votes, "body");
            expect(res.body.article[0].votes).to.equal(10);
          });
      });
      it("PATCH - 200: Decrement the votes when a negative value is passed", () => {
        return request(app)
          .patch("/api/articles/5")
          .send({ inc_votes: -20 })
          .expect(200)
          .then(res => {
            // console.log(res.body.article[0].votes, "body");
            expect(res.body.article[0].votes).to.equal(-20);
          });
      });
      it("PATCH - 404: Responds with a 404 error when passed a valid but non existent ID", () => {
        return request(app)
          .patch("/api/articles/987654321") //.send({ inc_votes: 1 })
          .expect(404)
          .then(res => {
            // console.log(res.body.msg, "failing this test");
            expect(res.body.msg).to.equal("Not Found");
          });
      });
      it("POST - 201: Posts a comment when given a username and body", () => {
        return request(app)
          .post("/api/articles/5/comments")
          .send({
            username: "rogersop",
            body: "Bastet walks amongst us, and the cats are taking arms!"
          })
          .expect(201)
          .then(res => {
            console.log(res.body.comments[0], "???????????");
            expect(res.body.comments[0].author).to.equal("rogersop");
          });
      });
      it("GET - 400 Bad Request: Returns an error when given an invalid ID in comments", () => {
        return request(app)
          .get("/api/articles/invalidID/comments")
          .expect(400)
          .then(res => {
            console.log(res.body.msg);
            expect(res.body.msg).to.equal("Bad Request - Invalid ID");
          });
      });
      it("GET - 200: Sort comments by created_at and in descending order by default", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .then(res => {
            expect(res.body.comments).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("POST - 405: Return an error 405 when other methods are requested", () => {
        return request(app)
          .put("/api/articles/1")
          .send({ hello: "hello" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("DELETE - 405: Return an error 405 when other methods are requested", () => {
        return request(app)
          .delete("/api/articles/1")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
    });
  });
});
