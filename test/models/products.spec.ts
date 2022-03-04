import { expect } from "chai";
import {
  createProduct,
  deleteProductById,
  getProduct,
  getProductById,
  updateProduct,
} from "../../src/models/products.service";
import { IProduct } from "../../src/models/products";
import { connect, clearDatabase, closeDatabase } from "./db";

describe("Products model methods should work", () => {
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

  it("should create a products", async () => {
    const product: IProduct = {
      isBeta: Math.random() > 0.5,
      title: "test title",
      thumbnail: "test thumbnail",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdProductsId = await createProduct(product);
    console.log(`'createdProductsId'`, createdProductsId);
    expect(createdProductsId).to.be.a("string");
  });

  // it should get products
  it("should get products", async () => {
    const product: IProduct = {
      isBeta: Math.random() > 0.5,
      title: "test title",
      thumbnail: "test thumbnail",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdProductsId = await createProduct(product);
    console.log(`'createdProductsId'`, createdProductsId);
    const got = await getProductById(createdProductsId);
    expect(got).to.be.an("object");
    expect(got?.content).to.be.equal(product.content);
    expect(got?.tags.toString()).to.be.equal(product.tags.toString());
    expect(got?.createdAt.toISOString()).to.be.equal(
      product.createdAt.toISOString()
    );
    expect(got?.title).to.be.equal(product.title);
  });

  // it should get all products
  it("should get all products based on the paging parameters", async () => {
    // create 10 products
    const products: IProduct[] = await generateProducts(10);
    // get all products
    // random number between 1 and 9
    const randomPageSize = Math.floor(Math.random() * 9) + 1;
    console.log("randomPageSize", randomPageSize);
    const queryParams = {
      PerPage: randomPageSize,
      Page: 0,
    };
    const got = await getProduct(queryParams);
    expect(got).to.be.an("array");
    expect(got.length).to.be.equal(randomPageSize);
    expect(got[0].content).to.be.equal(products[0].content);
    const queryParams1 = {
      PerPage: randomPageSize,
      Page: 1,
    };
    const got1 = await getProduct(queryParams1);
    expect(got1).to.be.an("array");
    expect(got1.length).to.be.lessThanOrEqual(randomPageSize);
    expect(got1[0].content).to.be.equal(products[randomPageSize].content);
  });

  it("should return all rows if the page size it too large", async () => {
    // create 10 products
    const products: IProduct[] = await generateProducts(10);
    const queryParams = {
      Sort: { title: 1 },
      PerPage: 15,
      Page: 0,
    };
    const got = await getProduct(queryParams);
    expect(got).to.be.an("array");
    expect(got.length).to.be.equal(10);
    expect(got[0].content).to.be.equal(products[0].content);
  });

  it("should return no products if the last page is passed", async () => {
    // create 10 products
    const products: IProduct[] = await generateProducts(10);

    const queryParams = {
      PerPage: 10,
      Page: 1,
    };
    const got = await getProduct(queryParams);
    expect(got).to.be.an("array");
    expect(got.length).to.be.equal(0);
  });

  // it should delete products
  it("should delete products", async () => {
    const product: IProduct = {
      isBeta: Math.random() > 0.5,
      title: "test title",
      thumbnail: "test thumbnail",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdProductsId = await createProduct(product);
    console.log(`'createdProductsId'`, createdProductsId);
    await deleteProductById(createdProductsId);
    const got = await getProductById(createdProductsId);
    expect(got).to.be.null;
  });

  // it should update product
  it("should update product", async () => {
    const product: IProduct = {
      isBeta: Math.random() > 0.5,
      title: "test title",
      thumbnail: "test thumbnail",
      content: "test content",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    const createdProductsId = await createProduct(product);
    console.log(`'createdProductsId'`, createdProductsId);
    const updatedProduct: IProduct = {
      isBeta: product.isBeta,
      title: "test title updated",
      thumbnail: "test thumbnail updated",
      content: "test content updated",
      createdAt: new Date(),
      tags: ["test", "test2"],
    };
    await updateProduct(createdProductsId, updatedProduct);
    const got = await getProductById(createdProductsId);
    expect(got).to.be.an("object");
    expect(got?.content).to.be.equal(updatedProduct.content);
    expect(got?.tags.toString()).to.be.equal(updatedProduct.tags.toString());
    expect(got?.createdAt.toISOString()).to.be.equal(
      updatedProduct.createdAt.toISOString()
    );
    expect(got?.title).to.be.equal(updatedProduct.title);
  });
});

//-------------
// create a function to generate n products
const generateProducts = async (n: number) => {
  const products: IProduct[] = [];
  for (let i = 0; i < n; i++) {
    products.push({
      isBeta: Math.random() > 0.5,
      title: `test title ${i}`,
      thumbnail: `test thumbnail ${i}`,
      content: `test content ${i}`,
      createdAt: new Date(),
      tags: ["test", "test2"],
    });
  }
  await Promise.all(products.map(async (products) => await createProduct(products)));
  return products;
};
