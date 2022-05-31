const Joi = require('joi'); 
const { INVALID, UNPROCESSABLE_ENTITY } = require('../statusCode');
// const services = require('../services/sales.service');

const SALES = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).max(50).integer()
.required(),
});

const validateSales = (req, _res, next) => {
  const nameQuantity = req.body;

  nameQuantity.forEach(({ productId, quantity }) => {
    const { error } = SALES.validate({ productId, quantity });

    if (error && error.details[0].message.includes('required')) { // Codigo mostrado pelo Rafael SUMMER da turma 17,na aula de "Validção em JOI"
      next({ status: INVALID, message: error.details[0].message });
    }
    if (error && error.details[0].message.includes('must be greater')) {
      next({ status: UNPROCESSABLE_ENTITY, message: error.details[0].message });
    }
  });
    return next();
};

const validateProductQuantity = async (req, _res, next) => {
  const nameQuantity = req.body;
  /* const { id } = req.params;
  const findedById = await services.findById(id);
  // console.log(findedById); */

  nameQuantity.forEach(({ productId, quantity }) => {
    const { error } = SALES.validate({ productId, quantity });

    if (error && error.details[0].message.includes('must be less')) {
      next({ status: UNPROCESSABLE_ENTITY, message: 'Such amount is not permitted to sell' });
    }
  });
    return next();
};

module.exports = {
  validateSales,
  validateProductQuantity,
};