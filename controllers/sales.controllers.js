const services = require('../services/sales.service');
const { SUCESS, NOT_FOUND } = require('../statusCode');

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

module.exports = {
  listSales,
  findById,
};