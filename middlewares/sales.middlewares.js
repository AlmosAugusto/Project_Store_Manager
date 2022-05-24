// const Joi = require('joi'); // Tentei tentei e não consegui fazer com JOI, vou fazer do outro jeito e mais pra frente tento novamente!
const { INVALID, UNPROCESSABLE_ENTITY } = require('../statusCode');

const validateSales = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (productId === undefined) { 
    return res.status(INVALID).json({ message: '"productId" is required' }); 
}
  if (quantity === undefined) { 
    return res.status(INVALID).json({ message: '"quantity" is required' }); 
}

   if (quantity <= 0) {
    return res.status(UNPROCESSABLE_ENTITY).json({ 
      message: '"quantity" must be greater than or equal to 1' });
   }

 return next();
};

module.exports = {
  validateSales,
};