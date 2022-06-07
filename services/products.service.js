const models = require('../models/products.model');
const { CONFLICT, NOT_FOUND } = require('../statusCode');

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
  // console.log(verifyName);
  if (verifyName) throw errorHandler(CONFLICT, 'Product already exists');

  const registredProduct = await models.createProduct(name, quantity);

  return registredProduct;
};

const updateProduct = async (id, name, quantity) => {
  const verifyId = await models.findById(id);
  // console.log(verifyId);
  if (verifyId.length === 0) throw errorHandler(NOT_FOUND, 'Product not found');

  const registredProduct = await models.updateProduct(id, name, quantity);

  return registredProduct;
};

const deleteProduct = async (id) => {
  const verifyId = await models.findById(id);
  // console.log(verifyId);
  if (verifyId.length === 0) throw errorHandler(NOT_FOUND, 'Product not found');

  const deletedProduct = await models.deleteProduct(id);

  return deletedProduct;
};

module.exports = {
  listProducts,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};