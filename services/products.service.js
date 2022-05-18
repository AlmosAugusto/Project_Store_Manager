const models = require('../models/productsModel');

const listProducts = async () => {
  const listedProducts = await models.listProducts();
  return listedProducts;
};

const findById = async (id) => {
  const findedProduct = await models.findById(id);
  return findedProduct[0];
};

module.exports = {
  listProducts,
  findById,
};