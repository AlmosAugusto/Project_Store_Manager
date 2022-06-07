const models = require('../models/sales.model');
const { NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../statusCode');

const errorHandler = (status, message) => ({
  status,
  message,
});

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
  const [findedSale] = await models.findById(sales[0].productId);

  console.log(findedSale[0].quantity);
  if (sales[0].quantity > findedSale[0].quantity) {
     throw errorHandler(UNPROCESSABLE_ENTITY, 'Such amount is not permitted to sell'); 
    }

  await Promise.all(sales.map(
    ({ productId, quantity }) => models.createSale(saleId, productId, quantity),
));
/* if (sales[0].quantity > 50) {
     throw errorHandler(UNPROCESSABLE_ENTITY, 'Such amount is not permitted to sell'); 
    }  */

  const registeredSale = {
    id: saleId,
    itemsSold: sales,
  };
  
 /*  if (registeredSale.itemsSold[0].quantity > 50) {
     throw errorHandler(UNPROCESSABLE_ENTITY, 'Such amount is not permitted to sell'); 
    } */

  return registeredSale;
};

const updateSale = async (id, sales) => {
  const [verifyId] = await models.findById(id);
  // console.log(verifyId);
  if (verifyId.length === 0) throw errorHandler(NOT_FOUND, 'Sale not found');
  // console.log(sales);

  await Promise.all(sales.map(
    ({ productId, quantity }) => models.updateSale(id, productId, quantity),
));
    const updatedSale = {
      saleId: id,
      itemUpdated: sales,
    };
  return updatedSale;
};

const deleteSale = async (id) => {
  const [verifyId] = await models.findById(id);
  if (verifyId.length === 0) throw errorHandler(NOT_FOUND, 'Sale not found');

  const deletedSale = await models.deleteSale(id);

  return deletedSale;
};

module.exports = {
  listSales,
  findById,
  createSale,
  updateSale,
  deleteSale,
};