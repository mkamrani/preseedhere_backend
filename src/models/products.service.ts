// import products model
import { IProduct, ProductModel } from "./products";
import { IGetQueryParams } from "./utils";

// implement createProducts

async function createProduct(products: IProduct): Promise<String> {
  const createdProducts = await ProductModel.create(products);
  return createdProducts._id.toString();
}

// implement updateProducts
async function updateProduct(productId: String, product: IProduct): Promise<void> {
  const {isBeta, ...update} = product; // We don't want to update the isBeta field
  await ProductModel.findByIdAndUpdate(productId, { $set: update}, { new: true });
}

// implement deleteProducts
async function deleteProductById(productsId: String): Promise<void | null> {
  return await ProductModel.findByIdAndRemove(productsId, { new: true });
}

// implement getProducts
async function getProductById(productsId: String): Promise<IProduct | null> {
  const products = await ProductModel.findById(productsId);
  return products;
}

// implement getProducts
async function getProduct(
  queryParams: IGetQueryParams
): Promise<IProduct[]> {
  const perPage = queryParams.PerPage || 10;
  const page = queryParams.Page || 0;

  const products = await ProductModel.find(queryParams.Query, queryParams.Fields, {
    sort: queryParams.Sort,
    skip: perPage * page,
    limit: perPage,
  });
  return products;
}

// get news count
async function getProductCount(query?: any): Promise<number> {
  return await ProductModel.countDocuments(query);
}

export { createProduct, deleteProductById, getProductById, updateProduct, getProduct, getProductCount };
