// import news model
import  {INews, NewsModel}  from './news';

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
async function deleteNews(newsId: String): Promise<void> {
    await NewsModel.findByIdAndRemove(newsId);
}

// implement getNews
async function getNews(newsId: String): Promise<INews | null> {
    const news = await NewsModel.findById(newsId);
    return news;
}

export {
  createNews,
  deleteNews,
  getNews,
  updateNews
}

