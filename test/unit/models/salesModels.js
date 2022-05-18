const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');


const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

describe ('SALESMODEL - Testa se retorna uma lista com todos as vendas', () => {
  describe('Quando não existe nenhuma venda cadastrada ', () => {
    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
      .resolves(resultExecute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('se retorna um array', async() => {
      const result = await salesModel.listSales();
      expect(result).to.be.an('array');
      // console.log(result);
    })

    it('se retorna um array vazio', async() => {
      const result = await salesModel.listSales();
      expect(result).to.be.empty;
    })
  })
  describe('SALESMODEL - Quando existem vendas cadastradas no banco de dados', () => {
    const resultExecute =[
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    before(() => {
      sinon.stub(connection, 'execute')
      .resolves([resultExecute]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Teste se retorna um array', async() => {
      const result = await salesModel.listSales();
      expect(result).to.be.an('array');
    })

    it('Teste se o array retornado não está vazio', async() => {
      const result = await salesModel.listSales();
      expect(result).to.be.not.empty;
      // console.log(result);
    })
    it('Teste se o array retornado possui objetos', async() => {
      const [result] = await salesModel.listSales();
      expect(result).to.be.an('object');

    })
    it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
      const [result] = await salesModel.listSales();
      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
      )
    })
  })
})