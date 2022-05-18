const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/sales.service');
const salesController = require('../../../controllers/sales.controllers')

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
  ]

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