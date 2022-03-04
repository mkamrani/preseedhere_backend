// unit test for create_update_news.ts
// var httpMocks = require('node-mocks-http');
import request from "supertest";

import { expect } from "chai";
import { connect, clearDatabase, closeDatabase } from "../models/db";
import createServer from "../../src/server";

describe("Should create and update news", () => {
  const app = createServer();

  // run before each test
  before(async () => {
    await connect();
  });

  // run after each tests
  afterEach(async () => {
    await clearDatabase();
  });

  // run after all the tests
  after(async () => {
    await closeDatabase();
  });

  // test POST /news
  it("should create a news", async () => {
    const {statusCode, body} = await request(app)
      .post("/news")
      .send({
        title: "test title",
        thumbnail: "test thumbnail",
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
        thumbnail: "test thumbnail",
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
        thumbnail: "test thumbnail 2",
        content: "test content",
        createdAt: new Date(),
        tags: ["test", "test2"],
      });
      console.log(`body`, body);
      expect(statusCode).to.be.equal(200);
  }
  );

  // test GET /news/:id
  it("should get a news", async () => {
    const {body: addBody} = await request(app)
      .post("/news")
      .send({
        title: "test title",
        thumbnail: "test thumbnail",
        content: "test content",
        createdAt: new Date(),
        tags: ["test", "test2"],
      });
      console.log(`body`, addBody);
      const id = addBody.id;

    const {statusCode, body} = await request(app)
      .get(`/news/id/${id}`);
      console.log(`body`, body);
      expect(statusCode).to.be.equal(200);
      expect(body.id).to.be.equal(id);
      expect(body.title).to.be.equal("test title");
      expect(body.content).to.be.equal("test content");
      expect(body.createdAt).to.be.a("string");
      expect(body.tags.toString()).to.be.equal("test,test2");
  }
  );

  // test DELETE /news/:id
  it("should delete a news", async () => {
    const {body: addBody} = await request(app)
      .post("/news")
      .send({
        title: "test title",
        thumbnail: "test thumbnail",
        content: "test content",
        createdAt: new Date(),
        tags: ["test", "test2"],
      });
      console.log(`body`, addBody);
      const id = addBody.id;

    const {statusCode} = await request(app)
      .delete(`/news/id/${id}`);
      expect(statusCode).to.be.equal(200);
    
    const {statusCode: statusCodeNew} = await request(app)
      .delete(`/news/id/${id}`);
      expect(statusCodeNew).to.be.equal(400);
  }
  );


});

