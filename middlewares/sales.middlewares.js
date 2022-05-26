const Joi = require('joi'); 
const { INVALID, UNPROCESSABLE_ENTITY } = require('../statusCode');

const SALES = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).integer().required(),
});

const validateSales = (req, _res, next) => {
  const productIdQuantity = req.body;

  const { error } = productIdQuantity.map((sales) => SALES.validate(sales));

  if (error && error.details[0].message.includes('required')) { // Codigo mostrado pelo Rafael SUMMER da turma 17,na aula de "Validção em JOI"
    next({ status: INVALID, message: error.details[0].message });
   }
  if (error && error.details[0].message.includes('must be')) {
    next({ status: UNPROCESSABLE_ENTITY, message: error.details[0].message });
   }

 return next();
};

module.exports = {
  validateSales,
};