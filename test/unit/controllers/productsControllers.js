const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');
const { NOT_FOUND, SUCESS } = require('../../../statusCode');
const req = require('express/lib/request');

describe ('Testa se retorna uma lista com todos os produtos', () => {
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
      expect(response.status.calledWith(SUCESS)).to.be.equal(true);
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
    expect(response.status.calledWith(SUCESS)).to.be.equal(true);
  })

  it('Teste se retorna o metodo json contendo os produtos', async() => {
    await productsController.listProducts(request, response);
    expect(response.json.calledWith(sinon.match.array.contains(resultExecute))); // documentaion sinon https://sinonjs.org/releases/latest/matchers/
    })


  })
})

describe ('Testa se apenas a venda com o id presente na URL é retornado', () => {
  describe('PRODUCTSCONTROLER - Quando não existe nenhuma venda com o id informado na URl', () => {
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
      request.params = { id: 999 }
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'findById').resolves(resultExecute);
    })

    after(() => { productService.findById.restore() })

   /*  it('Teste se retorna o metodo "status" passando o codigo 404', async() => {
      await productsController.findById(request, response)
      expect(response.status.calledWith(NOT_FOUND)).to.be.equal(true);
    }) */

})
describe('PRODUCTSCONTROLER - Quando existem vendas cadastradas com o id informado na URL', () => {
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
    request.params = { id: 99 }
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productService, 'findById').resolves(resultExecute);
  })

  after(() => {
    productService.findById.restore();
  })

  it('Teste se retorna o metodo "status" passando o codigo 200', async() => {
    await productsController.findById(request, response)
    expect(response.status.calledWith(200)).to.be.equal(true);
  })

  it('Teste se retorna o metodo json contendo os produtos', async() => {
    await productsController.findById(request, response);
    expect(response.json.calledWith(sinon.match.array.contains(resultExecute))); // documentaion sinon https://sinonjs.org/releases/latest/matchers/
    })


  })
})
