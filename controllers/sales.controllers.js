const services = require('../services/sales.service');
const { SUCESS, NOT_FOUND, CREATED, DELETE } = require('../statusCode');

const listSales = async (_req, res, _next) => {
  const sales = await services.listSales();

  return res.status(SUCESS).json(sales);
  };

const findById = async (req, res, _next) => {
  const { id } = req.params;
  const findedById = await services.findById(id);

  if (!findedById || findedById.length === 0) {
return res.status(NOT_FOUND).json(
    { message: 'Sale not found' },
  ); 
    }
  return res.status(SUCESS).json(findedById);
  };

const createSale = async (req, res, next) => {
    try {
      const productIdQuantity = req.body;

      const createdSale = await services.createSale(productIdQuantity);
      return res.status(CREATED).json(createdSale);
    } catch (err) {
      return next(err);
    }
  };

  const updateSale = async (req, res, next) => {
    try {
      const { id } = req.params;
      const productIdQuantity = req.body;

      const updatedSale = await services.updateSale(id, productIdQuantity);
      return res.status(SUCESS).json(updatedSale);
    } catch (err) {
      next(err);
    }
  };  

  const deleteSale = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedSale = await services.deleteSale(id);
      return res.status(DELETE).json(deletedSale);
    } catch (err) {
      next(err);
    }
  };

module.exports = {
  listSales,
  findById,
  createSale,
  updateSale,
  deleteSale,
};