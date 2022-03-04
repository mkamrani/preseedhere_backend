import { Request, Response } from "express";
import { getProductById, getProduct as getAllProducts, getProductCount } from "../../models/products.service";
import { IGetQueryParams } from "../../models/utils";

// get products handler
async function getProductList(
  req: Request<{}, {}, {}, IGetQueryParams>,
  res: Response
): Promise<void> {
  try {
    let queryParams = Object.assign({}, req.query);
    if (req.query.Query === 'beta') {
      queryParams.Query = { isBeta: true };
    } else {
      queryParams.Query = { isBeta: false };
    }
    const products = await getAllProducts(queryParams);
    const count = await getProductCount(queryParams.Query);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    res.header("X-Total-Count", count.toString())
    res.send(products);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

async function getProduct(
  req: Request<{ id: String }, {}, {}, {}>,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const products = await getProductById(id);
    res.send(products);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export { getProduct, getProductList };
