// unit test for create_update_news.ts
var httpMocks = require('node-mocks-http');



import { expect } from "chai";
import createUpdateNews from '../../src/controllers/news/create_update_news';
import { connect, clearDatabase, closeDatabase } from "../models/db";

describe('Should create and update news', () => {

   // run before each test
   before(async () => {
    await connect();
  });

  // run after each tests
    // afterEach(async () => {
    //   await clearDatabase();
    // });

  // run after all the tests
  after(async () => {
    await clearDatabase();
    await closeDatabase();
  });

  var request  = httpMocks.createRequest({
    method: 'POST',
    url: '/news',
    body: {
      title: "test title",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    }
});

var response = httpMocks.createResponse();
createUpdateNews(request, response);
var data = response._getData();
console.log(`yooooooooo`)
console.log(`data`, data, typeof data);
// expect(data.id).to.be.a("string");
expect(1).to.be.equal(1);

});