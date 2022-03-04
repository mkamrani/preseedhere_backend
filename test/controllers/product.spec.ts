// unit test for create_update_product.ts
// var httpMocks = require('node-mocks-http');
import request from "supertest";

import { expect } from "chai";
import { connect, clearDatabase, closeDatabase } from "../models/db";
import createServer from "../../src/server";
import { IProduct } from "../../src/models/products";

describe("Product CRUD tests", () => {
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

  // test POST /product
  it("should create a product", async () => {
    const product = newProduct();
    const {statusCode, body} = await request(app)
      .post("/product")
      .send(product);
      console.log(`body`, body);
      expect(statusCode).to.be.equal(200);
      expect(body.id).to.be.a("string");
  });
 
  it("should return 400 if create a product has invalid payload", async () => {
    const required = ["isBeta", "title", "thumbnail", "content"];
    //random string from required
    const toRemove = required[Math.floor(Math.random() * required.length)];
    let product = newProduct([toRemove]);
    const {statusCode, body} = await request(app)
      .post("/product")
      .send(product);
      console.log(`body`, body);
      expect(statusCode).to.be.equal(400);
      expect(body.message).to.be.a("string");
      expect(body.message).to.contain(toRemove);
  });

  // test PUT /product/:id
  it("should update a product", async () => {
    const product = newProduct();
    const {body: addBody} = await request(app)
      .post("/product")
      .send(product);
      console.log(`body`, addBody);
      const id = addBody.id;

    const product1 = newProduct();
    const {statusCode, body} = await request(app)
      .put(`/product/id/${id}`)
      .send(product1);
      console.log(`body`, body);
      expect(statusCode).to.be.equal(200);
  }
  );

  // test GET /product/:id
  it("should get a product", async () => {
    const product = newProduct();
    const {body: addBody} = await request(app)
      .post("/product")
      .send(product);
      console.log(`body`, addBody);
      const id = addBody.id;

    const {statusCode, body} = await request(app)
      .get(`/product/id/${id}`);
      console.log(`body`, body);
      expect(statusCode).to.be.equal(200);
      expect(body.id).to.be.equal(id);
      expect(body.isBeta).to.be.equal(product.isBeta);
      expect(body.title).to.be.equal(product.title);
      expect(body.content).to.be.equal(product.content);
      expect(body.createdAt).to.be.a("string");
      expect(body.tags.toString()).to.be.equal(product.tags.toString());
  }
  );

  // test DELETE /product/:id
  it("should delete a product", async () => {
    const product = newProduct();
    const {body: addBody} = await request(app)
      .post("/product")
      .send(product);
      console.log(`body`, addBody);
      const id = addBody.id;

    const {statusCode} = await request(app)
      .delete(`/product/id/${id}`);
      expect(statusCode).to.be.equal(200);
    
    const {statusCode: statusCodeNew} = await request(app)
      .delete(`/product/id/${id}`);
      expect(statusCodeNew).to.be.equal(400);
  }
  );

});


function newProduct(omit: string[] = []): IProduct {

  const obj: any = {
    isBeta: Math.random() >= 0.5,
    title: `test title ${Math.random()}`,
    thumbnail: `test thumbnail ${Math.random()}`,
    content: `test content ${Math.random()}`,
    createdAt: new Date(),
    tags: Array.from({length: Math.floor(Math.random() * 10)}, () => `test ${Math.random()}`),
  };

  // delete keys from obj
  omit.forEach(key => {
    delete obj[key];
  });
  
  return obj;

  // return {
  //   isBeta: Math.random() >= 0.5,
  //   title: `test title ${Math.random()}`,
  //   thumbnail: `test thumbnail ${Math.random()}`,
  //   content: `test content ${Math.random()}`,
  //   createdAt: new Date(),
  //   tags: Array.from({length: Math.floor(Math.random() * 10)}, () => `test ${Math.random()}`),
  // };
}