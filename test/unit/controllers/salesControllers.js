const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/sales.service');
const salesController = require('../../../controllers/sales.controllers');
const { CREATED, SUCESS, DELETE } = require('../../../statusCode');

describe ('Req 1 - Testa se retorna uma lista com todos as vendas', () => {
  describe('SALESCONTROLER - Quando não existe nenhum vendas cadastrado', () => {
    const response = {}
    const request = {}
    const resultExecute = [];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'listSales').resolves(resultExecute);
    })

    after(() => {
      salesService.listSales.restore();
    })

    it('Teste se retorna o metodo "status" passando o codigo 200', async() => {
      await salesController.listSales(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('Teste se retorna o metodo json contendo um array', async() => {
      await salesController.listSales(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  })
})

describe('SALESCONTROLER - Quando existem vendas cadastradas no banco de dados', () => {
  const response = {}
  const request = {}
  const resultExecute =  [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ];

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'listSales').resolves(resultExecute);
  })

  after(() => {
    salesService.listSales.restore();
  })

  it('Teste se retorna o metodo "status" passando o codigo 200', async() => {
    await salesController.listSales(request, response)
    expect(response.status.calledWith(200)).to.be.equal(true);
  })

  it('Teste se retorna o metodo json contendo os produtos', async() => {
    await salesController.listSales(request, response);
    expect(response.json.calledWith(sinon.match.array.contains(resultExecute))); 
    })
  })
})

describe ('SALESCONTROLER - Testa se a venda criada é retornada', () => {
  describe('Quando obtem sucesso no cadastro da venda', () => {
    const response = {}
    const request = {}
    const resultExecute =  [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];


    before(() => {
      request.body = { name: 'productId:2', quantity: 25 }
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSale').resolves(resultExecute);
    })

    after(() => { salesService.createSale.restore() })

    it('Teste se retorna o metodo "status" passando o codigo 201', async() => {
      await salesController.createSale(request, response)
      expect(response.status.calledWith(CREATED)).to.be.equal(true);
    })

    it('Teste se retorna um array', async() => {
      await salesController.createSale(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })

      it('Teste se retorna o metodo json contendo o produto', async() => {
        await salesController.createSale(request, response);
        expect(response.json.calledWith(sinon.match.array.contains(resultExecute))); // documentaion sinon https://sinonjs.org/releases/latest/matchers/
        })  
  })
}) 

describe ('PRODUCTSCONTROLER - Testa se a venda atualizada é retornado', () => {
  describe('Quando obtem sucesso na atulização da venda', () => {
  const response = {}
  const request = {}
  const resultExecute =  [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ];


  before(() => {
    request.params = { id: 1 };
    request.body = { name: 'productId:2', quantity: 25 }

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateSale').resolves(resultExecute);
  })

  after(() => { salesService.updateSale.restore() })

  it('Teste se retorna o metodo "status" passando o codigo 200', async() => {
    await salesController.updateSale(request, response)
    expect(response.status.calledWith(SUCESS)).to.be.equal(true);
  })

  it('Teste se retorna um array', async() => {
    await salesController.updateSale(request, response);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })

  it('Teste se retorna o metodo json contendo o produto', async() => {
    await salesController.updateSale(request, response);
    expect(response.json.calledWith(sinon.match.array.contains(resultExecute))); 
    })  
  })
})
describe ('SALESCONTROLLER - Testa se a venda é deletetada', () => {
  describe('Quando obtem sucesso na exclusão da venda', () => {
  const response = {}
  const request = {}
  const resultExecute =  [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ];


  before(() => {
    request.params = { id: 1 };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'deleteSale').resolves(resultExecute);
  })

  after(() => { salesService.deleteSale.restore() })

  it('Teste se retorna o metodo "status" passando o codigo 204', async() => {
    await salesController.deleteSale(request, response)
    expect(response.status.calledWith(DELETE)).to.be.equal(true);
    })
  })
})  
