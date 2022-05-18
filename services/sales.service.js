const models = require('../models/salesModel');

const listSales = async () => {
  const listedSales = await models.listSales();
  return listedSales;
};

const findById = async (id) => {
  const [findedSale] = await models.findById(id);
  return findedSale;
};

module.exports = {
  listSales,
  findById,
};