import { Request, Response } from "express";
import { getNewsById, getNews as getAllNews, getNewsCount } from "../../models/news.service";
import { IGetQueryParams } from "../../models/utils";

class GetQueryParams implements IGetQueryParams {}

// get news handler
async function getNewsList(
  req: Request<{}, {}, {}, GetQueryParams>,
  res: Response
): Promise<void> {
  try {
    const news = await getAllNews(req.query);
    const count = await getNewsCount();
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    res.header("X-Total-Count", count.toString())
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
