const models = require('../models/products.model');
const { CONFLICT } = require('../statusCode');

const listProducts = async () => {
  const listedProducts = await models.listProducts();
  return listedProducts;
};

const findById = async (id) => {
  const findedProduct = await models.findById(id);
  return findedProduct[0];
};

const errorHandler = (status, message) => ({
  status,
  message,
});
const createProduct = async (name, quantity) => {
  const verifyName = await models.getproductByName(name);
  console.log(verifyName);
  if (verifyName) throw errorHandler(CONFLICT, 'Product already exists');

  const registredProduct = await models.createProduct(name, quantity);

  return registredProduct;
};

module.exports = {
  listProducts,
  findById,
  createProduct,
};