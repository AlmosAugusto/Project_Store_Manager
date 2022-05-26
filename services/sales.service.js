const models = require('../models/sales.model');

const listSales = async () => {
  const listedSales = await models.listSales();
  return listedSales;
};

const findById = async (id) => {
  const [findedSale] = await models.findById(id);
  return findedSale;
};

const createSale = async (sales) => {
  const saleId = await models.createNewSaleId();
  console.log(saleId);

  await Promise.all(sales.map(
    ({ productId, quantity }) => models.createSale(saleId, productId, quantity),
));

  const registeredSale = {
    id: saleId,
    itemsSold: sales,
  };
  return registeredSale;
};

module.exports = {
  listSales,
  findById,
  createSale,
};