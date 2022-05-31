const express = require('express');

const app = express();
app.use(express.json());

const productsController = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controllers');
const { validateProduct } = require('./middlewares/products.middleware');
const { validateSales, validateProductQuantity } = require('./middlewares/sales.middlewares');
const { INTERNAL_SERVER_ERROR } = require('./statusCode');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Req2 - Get Products
app.get('/products', productsController.listProducts);
app.get('/products/:id', productsController.findById);

// Req2 - Get Sales
app.get('/sales', salesController.listSales);
app.get('/sales/:id', salesController.findById);

// Req4 - Post Product
app.post('/products', validateProduct, productsController.createProduct);

// Req5 - Put Product
app.put('/products/:id', validateProduct, productsController.updateProduct);

// Req6 - Delete Product
app.delete('/products/:id', productsController.deleteProduct);

// Req7 - Post Sales
app.post('/sales', validateSales, validateProductQuantity, salesController.createSale);

// Req8 - Put Sales
app.put('/sales/:id', validateSales, salesController.updateSale);

// Req9 - Delete Sale
app.delete('/sales/:id', salesController.deleteSale);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  console.log('CREATE sales:', err.message);
  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'internal Server Error 77' });
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
