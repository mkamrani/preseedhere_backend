import { Request, Response } from "express";
import { deleteNewsById, getNewsById } from "../../models/news.service";

// get news handler
async function deleteNews(
  req: Request<{ id: String }, {}, {}, {}>,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const news = await deleteNewsById(id);
    if (!news) {
      res.status(400).send({ message: "element not found" });
      return;
    }
    res.send(news);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

export default deleteNews;
