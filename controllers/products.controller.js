const services = require('../services/products.service');
const { SUCESS, NOT_FOUND } = require('../statusCode');

const listProducts = async (_req, res, _next) => {
  const products = await services.listProducts();
  return res.status(SUCESS).json(products);
  };

  const findById = async (req, res, _next) => {
    const { id } = req.params;
    const findedById = await services.findById(id);
    if (!findedById) return res.status(NOT_FOUND).json({ message: 'Product not found' });
    return res.status(SUCESS).json(findedById);
    };

module.exports = {
  listProducts,
  findById,
};
