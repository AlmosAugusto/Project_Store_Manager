const salesModel = require('../../../models/sales.model');
const salesService = require('../../../services/sales.service')


const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

describe ('SALESSERVICE - Testa se retorna uma lista com todos as vendas', () => {
  describe('Quando não existe nenhuma venda cadastrada ', () => {
    const resultExecute = [];

    before(() => {
      sinon.stub(salesModel, 'listSales')
      .resolves(resultExecute);
    })

    after(() => {
      salesModel.listSales.restore();

    })

    it('se retorna um array', async() => {
      const result = await salesModel.listSales();
      expect(result).to.be.an('array');
    })

    it('se retorna um array vazio', async() => {
      const result = await salesModel.listSales();
      expect(result).to.be.empty;
    })
  })
  describe('SALESSERVICE - Quando existem vendas cadastradas no banco de dados', () => {
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
      sinon.stub(salesModel, 'listSales')
      .resolves(resultExecute);
    })

    after(() => {
      salesModel.listSales.restore();
    })

    it('Teste se retorna um array', async() => {
      const result = await salesService.listSales();
      expect(result).to.be.an('array');
    })

    it('Teste se o array retornado não está vazio', async() => {
      const result = await salesService.listSales();
      expect(result).to.be.not.empty;
    })
    it('Teste se o array retornado possui objetos', async() => {
      const [result] = await salesService.listSales();
      expect(result).to.be.an('object');

    })
    it('Teste se o objeto dentro do array retornado contem os atributos saleId, date, productId e quantity', async() => {
      const [result] = await salesService.listSales();
      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
      )
    })
  })

  describe ('PRODUCTSERVICE - Testa se apenas a venda com o id presente na URL é retornado;', () => {
    describe('Quando não existe nenhuma venda com o id informado na URl', () => {
      const resultExecute = [[]];
  
      before(() => {
        sinon.stub(salesModel, 'findById')
        .resolves(resultExecute);
      })
  
      after(() => {
        salesModel.findById.restore();
      })
  
      it('Teste se retorna um array', async() => {
        const result = await salesService.findById();
        expect(result).to.be.an('array');
      })
  
      it('Teste se retorna um array vazio', async() => {
        const result = await salesService.findById();
        expect(result).to.be.empty;
      })
    })
  
    describe('SALESSERVICE - Quando existem vendas cadastradas com o id informado na URL', () => {
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
        sinon.stub(salesModel, 'findById')
        .resolves(resultExecute);
      })
  
      after(() => {
        salesModel.findById.restore();
      })
  
      it('Teste se o array retornado possui objetos', async() => {
        const result = await salesService.findById(2); // desestrutura o result para retornar um objeto
        expect(result).to.be.an('object');

      it('Teste se o array retornado não está vazio', async() => {
        const result = await salesService.findById(1);
        expect(result).to.be.not.empty;
      })  
  
      })
      it('Teste se o objeto dentro do array retornado contem os atributos saleId, date, productId e quantity', async() => {
        const result = await salesService.findById(2);
        // console.log(result);
        expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
        )
      })
    })
  })

  describe ('SALESSERVICE - Testa se a venda é atualizada', () => {
    describe('quando a venda é atualizada com sucesso', () => {
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
        sinon.stub(salesModel, 'updateSale')
        .resolves(resultExecute);
      })
  
      after(() => {
        salesModel.updateSale.restore();
      })
  
      it('Teste se retorna um object', async() => {
        const [result] = await salesModel.updateSale(1, 25);
        expect(result).to.be.an('object');
      })
  
      it('Teste se retorna um object não vazio', async() => {
        const [result] = await salesModel.updateSale(1, 25);
        expect(result).to.be.not.empty;
      })
  
      it('Teste se o array retornado contem os atributos saleId, date, productId e quantity', async() => {
        const [result] = await salesModel.updateSale(1, 25);
        expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
        )
      })
    })
  })

  describe ('SALESSERVICE - Testa se a venda é deletada', () => {
    describe('quando a venda é deletada com sucesso', () => {
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
        sinon.stub(salesModel, 'findById').resolves(resultExecute)
        sinon.stub(salesModel, 'deleteSale')
        .resolves();
      })
  
      after(() => {
        salesModel.findById.restore();
        salesModel.deleteSale.restore();
      })
  

      it('Teste se retorna um object não vazio', async() => {
        const result = await salesService.deleteSale(1);
        expect(result).to.be.undefined;
      })
  
    })
  })
})

