import { expect } from "chai";
import {
  createNews,
  deleteNewsById,
  getNews,
  getNewsById,
  updateNews,
} from "../../src/models/news.service";
import { INews } from "../../src/models/news";
import { connect, clearDatabase, closeDatabase } from "./db";

describe("News model methods should work", () => {
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

  it("should create a news", async () => {
    const news: INews = {
      title: "test title",
      thumbnail: "test thumbnail",
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
      thumbnail: "test thumbnail",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdNewsId = await createNews(news);
    console.log(`'createdNewsId'`, createdNewsId);
    const got = await getNewsById(createdNewsId);
    expect(got).to.be.an("object");
    expect(got?.content).to.be.equal(news.content);
    expect(got?.tags.toString()).to.be.equal(news.tags.toString());
    expect(got?.createdAt.toISOString()).to.be.equal(
      news.createdAt.toISOString()
    );
    expect(got?.title).to.be.equal(news.title);
  });

  // it should get all news
  it("should get all news based on the paging parameters", async () => {
    // create 10 news
    const news: INews[] = await generateNews(10);
    // get all news
    // random number between 1 and 9
    const randomPageSize = Math.floor(Math.random() * 9) + 1;
    console.log("randomPageSize", randomPageSize);
    const queryParams = {
      PerPage: randomPageSize,
      Page: 0,
    };
    const got = await getNews(queryParams);
    expect(got).to.be.an("array");
    expect(got.length).to.be.equal(randomPageSize);
    expect(got[0].content).to.be.equal(news[0].content);
    const queryParams1 = {
      PerPage: randomPageSize,
      Page: 1,
    };
    const got1 = await getNews(queryParams1);
    expect(got1).to.be.an("array");
    expect(got1.length).to.be.lessThanOrEqual(randomPageSize);
    expect(got1[0].content).to.be.equal(news[randomPageSize].content);
  });

  it("should return all rows if the page size it too large", async () => {
    // create 10 news
    const news: INews[] = await generateNews(10);
    const queryParams = {
      Sort: { title: 1 },
      PerPage: 15,
      Page: 0,
    };
    const got = await getNews(queryParams);
    expect(got).to.be.an("array");
    expect(got.length).to.be.equal(10);
    expect(got[0].content).to.be.equal(news[0].content);
  });

  it("should return no news if the last page is passed", async () => {
    // create 10 news
    const news: INews[] = await generateNews(10);

    const queryParams = {
      PerPage: 10,
      Page: 1,
    };
    const got = await getNews(queryParams);
    expect(got).to.be.an("array");
    expect(got.length).to.be.equal(0);
  });

  // it should delete news
  it("should delete news", async () => {
    const news: INews = {
      title: "test title",
      thumbnail: "test thumbnail",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdNewsId = await createNews(news);
    console.log(`'createdNewsId'`, createdNewsId);
    await deleteNewsById(createdNewsId);
    const got = await getNewsById(createdNewsId);
    expect(got).to.be.null;
  });

  // it should update news
  it("should update news", async () => {
    const news: INews = {
      title: "test title",
      thumbnail: "test thumbnail",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdNewsId = await createNews(news);
    console.log(`'createdNewsId'`, createdNewsId);
    const updatedNews: INews = {
      title: "test title updated",
      thumbnail: "test thumbnail updated",
      content: "test content updated",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    await updateNews(createdNewsId, updatedNews);
    const got = await getNewsById(createdNewsId);
    expect(got).to.be.an("object");
    expect(got?.content).to.be.equal(updatedNews.content);
    expect(got?.tags.toString()).to.be.equal(updatedNews.tags.toString());
    expect(got?.createdAt.toISOString()).to.be.equal(
      updatedNews.createdAt.toISOString()
    );
    expect(got?.title).to.be.equal(updatedNews.title);
  });
});

//-------------
// create a function to generate n news
const generateNews = async (n: number) => {
  const news: INews[] = [];
  for (let i = 0; i < n; i++) {
    news.push({
      title: `test title ${i}`,
      thumbnail: `test thumbnail ${i}`,
      content: `test content ${i}`,
      createdAt: new Date(),
      tags: ["test", "test2"],
    });
  }
  await Promise.all(news.map(async (news) => await createNews(news)));
  return news;
};
