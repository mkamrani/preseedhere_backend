// import news model
import { INews, NewsModel } from "./news";
import { IGetQueryParams } from "./utils";

// implement createNews

async function createNews(news: INews): Promise<String> {
  const createdNews = await NewsModel.create(news);
  return createdNews._id.toString();
}

// implement updateNews
async function updateNews(newsId: String, news: INews): Promise<void> {
  await NewsModel.findByIdAndUpdate(newsId, news);
}

// implement deleteNews
async function deleteNewsById(newsId: String): Promise<void | null> {
  return await NewsModel.findByIdAndRemove(newsId, { new: true });
}

// implement getNews
async function getNewsById(newsId: String): Promise<INews | null> {
  const news = await NewsModel.findById(newsId);
  return news;
}

// implement getNews
async function getNews(
  queryParams: IGetQueryParams
): Promise<INews[]> {
  const perPage = queryParams.PerPage || 10;
  const page = queryParams.Page || 0;

  const news = await NewsModel.find(queryParams.Query, queryParams.Fields, {
    sort: queryParams.Sort,
    skip: perPage * page,
    limit: perPage,
  });
  return news;
}

export { createNews, deleteNewsById, getNewsById, updateNews, getNews };
