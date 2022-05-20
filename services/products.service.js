const models = require('../models/products.model');

const listProducts = async () => {
  const listedProducts = await models.listProducts();

  return listedProducts;
};

const findById = async (id) => {
  const findedProduct = await models.findById(id);
  return findedProduct[0];
};

const createProduct = async (name, quantity) => {
  const nameExists = await models.getproductByName(name);
  if (nameExists.length !== 0) throw new Error('Product already exists');

  const registredProduct = await models.createProduct(name, quantity);

  return registredProduct;
};

module.exports = {
  listProducts,
  findById,
  createProduct,
};