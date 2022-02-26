import { expect } from "chai";
import { createNews, deleteNews, getNews, updateNews } from "../../src/models/news.service";
import { INews } from "../../src/models/news";
import { connect, clearDatabase, closeDatabase } from "./db";

describe("News model methods should work", () => {
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

  it("should create a news", async () => {
    const news: INews = {
      title: "test title",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdNewsId = await createNews(news);
    console.log(`'createdNewsId'`, createdNewsId);
    expect(createdNewsId).to.be.a("string");
  });

  // it should get news
  it("should get news", async () => {
    const news: INews = {
      title: "test title",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdNewsId = await createNews(news);
    console.log(`'createdNewsId'`, createdNewsId);
    const got = await getNews(createdNewsId);
    expect(got).to.be.an("object");
    expect(got?.content).to.be.equal(news.content);
    expect(got?.tags.toString()).to.be.equal(news.tags.toString());
    expect(got?.createdAt.toISOString()).to.be.equal(news.createdAt.toISOString());
    expect(got?.title).to.be.equal(news.title);
  });
  // it should delete news
  it("should delete news", async () => {
    const news: INews = {
      title: "test title",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdNewsId = await createNews(news);
    console.log(`'createdNewsId'`, createdNewsId);
    await deleteNews(createdNewsId);
    const got = await getNews(createdNewsId);
    expect(got).to.be.null;
  });

  // it should update news
  it("should update news", async () => {
    const news: INews = {
      title: "test title",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdNewsId = await createNews(news);
    console.log(`'createdNewsId'`, createdNewsId);
    const updatedNews: INews = {
      title: "test title updated",
      content: "test content updated",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    await updateNews(createdNewsId, updatedNews);
    const got = await getNews(createdNewsId);
    expect(got).to.be.an("object");
    expect(got?.content).to.be.equal(updatedNews.content);
    expect(got?.tags.toString()).to.be.equal(updatedNews.tags.toString());
    expect(got?.createdAt.toISOString()).to.be.equal(updatedNews.createdAt.toISOString());
    expect(got?.title).to.be.equal(updatedNews.title);
  });
});

