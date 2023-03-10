const services = require('../services/products.service');
const { SUCESS, NOT_FOUND, CREATED, CONFLICT, DELETE } = require('../statusCode');

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

  const createProduct = async (req, res, _next) => {
    try {
      const { name, quantity } = req.body;

      const createdProduct = await services.createProduct(name, quantity);
      return res.status(CREATED).json(createdProduct);
    } catch (err) {
      return res.status(CONFLICT).json({ message: 'Product already exists' });
    }
  };

  const updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;

      const updatedProduct = await services.updateProduct(id, name, quantity);
      return res.status(SUCESS).json(updatedProduct);
    } catch (err) {
      // return res.status(NOT_FOUND).json({ message: 'Product not foundout' });
      next(err);
    }
  };

  const deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProduct = await services.deleteProduct(id);
      return res.status(DELETE).json(deletedProduct);
    } catch (err) {
      next(err);
    }
  };

module.exports = {
  listProducts,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
