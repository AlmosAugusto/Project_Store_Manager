const express = require('express');

const app = express();
app.use(express.json());
const productsCrontroller = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controllers');

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
app.post('/products', productsCrontroller.createProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
