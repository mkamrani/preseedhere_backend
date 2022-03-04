import { Request, Response } from "express";
import { deleteProductById } from "../../models/products.service";

// get news handler
async function deleteProducts(
  req: Request<{ id: String }, {}, {}, {}>,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const news = await deleteProductById(id);
    if (!news) {
      res.status(400).send({ message: "element not found" });
      return;
    }
    res.send(news);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

export default deleteProducts;
