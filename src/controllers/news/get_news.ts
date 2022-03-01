import { Request, Response } from 'express';
import { getNewsById } from '../../models/news.service';

// get news handler
async function getNews(req: Request<{id: String}, {}, {}, {}>, res: Response): Promise<void> {
  try{
      const id = req.params.id;
      const news = await getNewsById(id);
      res.send(news);
  } catch (error: any) {
      res.status(400).send({message: error.message});
  }
}

export default getNews;