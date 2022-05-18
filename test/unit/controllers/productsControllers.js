const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller')

describe ('Req 1 - Testa se retorna uma lista com todos os produtos', () => {
  describe('PRODUCTSCONTROLER - Quando não existe nenhum produto cadastrado', () => {
    const response = {}
    const request = {}
    const resultExecute = [];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'listProducts').resolves(resultExecute);
    })

    after(() => {
      productService.listProducts.restore();
    })

    it('Teste se retorna o metodo "status" passando o codigo 200', async() => {
      await productsController.listProducts(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('Teste se retorna o metodo json contendo um array', async() => {
      await productsController.listProducts(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  })
})
describe('PRODUCTSCONTROLER - Quando existem produtos cadastrados no banco de dados', () => {
  const response = {}
  const request = {}
  const resultExecute =[
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "produto B",
      "quantity": 20
    }
  ];

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productService, 'listProducts').resolves(resultExecute);
  })

  after(() => {
    productService.listProducts.restore();
  })

  it('Teste se retorna o metodo "status" passando o codigo 200', async() => {
    await productsController.listProducts(request, response)
    expect(response.status.calledWith(200)).to.be.equal(true);
  })

  it('Teste se retorna o metodo json contendo os produtos', async() => {
    await productsController.listProducts(request, response);
    expect(response.json.calledWith(sinon.match.array.contains(resultExecute))); // documentaion sinon https://sinonjs.org/releases/latest/matchers/
    })


  })
})