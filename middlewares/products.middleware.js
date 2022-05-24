const Joi = require('joi'); 
const { INVALID, UNPROCESSABLE_ENTITY } = require('../statusCode');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).integer().required(),
});

const validateProduct = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = PRODUCT.validate({ name, quantity });

  if (error && error.details[0].message.includes('required')) { // Codigo mostrado pelo Rafael SUMMER da turma 17,na aula de "Validção em JOI"
    next({ status: INVALID, message: error.details[0].message });
   }
  if (error && error.details[0].message.includes('must be')) {
    next({ status: UNPROCESSABLE_ENTITY, message: error.details[0].message });
   }

 return next();
};

module.exports = {
  validateProduct,
};