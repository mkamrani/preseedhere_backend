// unit test for create_update_news.ts
// var httpMocks = require('node-mocks-http');
import request from "supertest";

import { expect } from "chai";
import createUpdateNews from "../../src/controllers/news/create_update_news";
import { connect, clearDatabase, closeDatabase } from "../models/db";
import createServer from "../../src/server";

describe("Should create and update news", () => {
  const app = createServer();

  // run before each test
  before(async () => {
    await connect();
  });

  // run after all the tests
  after(async () => {
    await clearDatabase();
    await closeDatabase();
  });

  // test POST /news
  it("should create a news", async () => {
    const {statusCode, body} = await request(app)
      .post("/news")
      .send({
        title: "test title",
        content: "test content",
        createdAt: new Date(),
        tags: ["test", "test2"],
      });
      console.log(`body`, body);
      expect(statusCode).to.be.equal(200);
      expect(body.id).to.be.a("string");
  });

  // test PUT /news/:id
  it("should update a news", async () => {

    const {body: addBody} = await request(app)
      .post("/news")
      .send({
        title: "test title",
        content: "test content",
        createdAt: new Date(),
        tags: ["test", "test2"],
      });
      console.log(`body`, addBody);
      const id = addBody.id;

    const {statusCode, body} = await request(app)
      .put(`/news/id/${id}`)
      .send({
        title: "test title 2",
        content: "test content",
        createdAt: new Date(),
        tags: ["test", "test2"],
      });
      console.log(`body`, body);
      expect(statusCode).to.be.equal(200);
  }
  );


});
