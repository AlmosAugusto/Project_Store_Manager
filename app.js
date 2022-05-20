const express = require('express');

const app = express();
app.use(express.json());

const productsCrontroller = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controllers');
const { validateProduct } = require('./middlewares/products.middleware');
const { validateSales } = require('./middlewares/sales.middlewares');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Req2 - Get Products
app.get('/products', productsCrontroller.listProducts);
app.get('/products/:id', productsCrontroller.findById);

// Req2 - Get Sales
app.get('/sales', salesController.listSales);
app.get('/sales/:id', salesController.findById);

// Req4 - Post Product
app.post('/products', validateProduct, productsCrontroller.createProduct);

// Req? - Post Sales
app.post('/sales', validateSales);

// Req? - Put Product
app.put('/products/:id', validateProduct);

// Req? - Put Sales
app.put('/sales/:id', validateSales);

/* app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'internal Server Error' });
}); */
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
