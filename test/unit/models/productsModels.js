// Resolvi tentar fazer os testes...
const productsModel = require('../../../models/products.model');
const connection = require('../../../models/connection');


const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

describe ('PRODUCTSMODEL - Testa se retorna uma lista com todos os produtos', () => {
  describe('Quando não existe nenhum produto cadastrado', () => {
    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
      .resolves(resultExecute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Teste se retorna um array', async() => {
      const result = await productsModel.listProducts();
      expect(result).to.be.an('array');
      // console.log(result);
    })

    it('Teste se retorna um array vazio', async() => {
      const result = await productsModel.listProducts();
      expect(result).to.be.empty;
    })
  })
  describe('PRODUCTSMODEL - Quando existem produtos cadastrados no banco de dados', () => {
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
      sinon.stub(connection, 'execute')
      .resolves([resultExecute]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Teste se retorna um array', async() => {
      const result = await productsModel.listProducts();
      expect(result).to.be.an('array');
    })

    it('Teste se o array retornado não está vazio', async() => {
      const result = await productsModel.listProducts();
      expect(result).to.be.not.empty;
      // console.log(result);
    })
    it('Teste se o array retornado possui objetos', async() => {
      const [result] = await productsModel.listProducts(); // desestrutura o result para retornar um objeto
      expect(result).to.be.an('object');

    })
    it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
      const [result] = await productsModel.listProducts();
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })
  })

})