import { Request, Response } from "express";
import { getNewsById, getNews as getAllNews } from "../../models/news.service";
import { IGetQueryParams } from "../../models/utils";

class GetQueryParams implements IGetQueryParams {}

// get news handler
async function getNewsList(
  req: Request<{}, {}, {}, GetQueryParams>,
  res: Response
): Promise<void> {
  try {
    const news = await getAllNews(req.query);
    res.send(news);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

async function getNews(
  req: Request<{ id: String }, {}, {}, {}>,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const news = await getNewsById(id);
    res.send(news);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export { getNews, getNewsList };
