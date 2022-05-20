// const Joi = require('joi'); // Tentei tentei e não consegui fazer com JOI, vou fazer do outro jeito e mais pra frente tento novamente!
const { INVALID, UNPROCESSABLE_ENTITY } = require('../statusCode');

const validateProduct = (req, res, _next) => {
  const { name, quantity } = req.body;

  if (!name) return res.status(INVALID).json({ message: '"name" is required' });
  if (quantity === undefined) { 
    return res.status(INVALID).json({ message: '"quantity" is required' }); 
}

  if (name.length <= 5) {
    return res.status(UNPROCESSABLE_ENTITY).json({ 
      message: '"name" length must be at least 5 characters long' });
   }
   if (quantity <= 0) {
    return res.status(UNPROCESSABLE_ENTITY).json({ 
      message: '"quantity" must be greater than or equal to 1' });
   }

 /* return next(); */
};

module.exports = {
  validateProduct,
};