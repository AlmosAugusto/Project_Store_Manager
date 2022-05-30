const productsModel = require('../../../models/products.model');
const productsService = require('../../../services/products.service')


const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

describe ('PRODUCTSSERVICE - Testa se retorna uma lista com todos os produtos', () => {
  describe('Quando não existe nenhum produto cadastrado', () => {
    const resultExecute = [];

    before(() => {
      sinon.stub(productsModel, 'listProducts')
      .resolves(resultExecute);
    })

    after(() => {
      productsModel.listProducts.restore();
    })

    it('Teste se retorna um array', async() => {
      const result = await productsModel.listProducts();
      expect(result).to.be.an('array');
    })

    it('Teste se retorna um array vazio', async() => {
      const result = await productsModel.listProducts();
      expect(result).to.be.empty;
    })
  })
  describe('PRODUCTSSERVICE - Quando existem produtos cadastrados no banco de dados', () => {
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
      sinon.stub(productsModel, 'listProducts')
      .resolves(resultExecute);
    })

    after(() => {
      productsModel.listProducts.restore();
    })

    it('Teste se retorna um array', async() => {
      const result = await productsService.listProducts();
      expect(result).to.be.an('array');
    })

    it('Teste se o array retornado não está vazio', async() => {
      const result = await productsService.listProducts();
      expect(result).to.be.not.empty;
    })
    it('Teste se o array retornado possui objetos', async() => {
      const [result] = await productsService.listProducts(); 
      expect(result).to.be.an('object');
    })
    it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
      const [result] = await productsService.listProducts();
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })
  })


  describe ('PRODUCTSERVICE - Testa se apenas o produto com o id presente na URL é retornado;', () => {
    describe('Quando não existe nenhum produto com o id informado na URl', () => {
      const resultExecute = [[]];
  
      before(() => {
        sinon.stub(productsModel, 'findById')
        .resolves(resultExecute);
      })
  
      after(() => {
        productsModel.findById.restore();
      })
  
      it('Teste se retorna um array', async() => {
        const result = await productsService.findById();
        expect(result).to.be.an('array');
        // console.log(result);
      })
  
      it('Teste se retorna um array vazio', async() => {
        const result = await productsService.findById();
        expect(result).to.be.empty;
      })
    })
  
    describe('PRODUCTSERVICE - Quando existem produtos cadastrados com o id informado', () => {
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
        sinon.stub(productsModel, 'findById')
        .resolves(resultExecute);
      })
  
      after(() => {
        productsModel.findById.restore();
      })
  
      it('Teste se o array retornado possui objetos', async() => {
        const result = await productsService.findById(2); // desestrutura o result para retornar um objeto
        expect(result).to.be.an('object');

      it('Teste se o array retornado não está vazio', async() => {
        const result = await productsService.findById(1);
        expect(result).to.be.not.empty;
      })  
  
      })
      it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
        const result = await productsService.findById(2);
        expect(result).to.be.includes.all.keys(
          'id',
          'name',
          'quantity'
        )
      })
    })
  })

})

describe ('PRODUCTSERVICE - Testa se apenas o produto com o id presente na URL é retornado;', () => {
  describe('Quando não existe nenhum produto com o id informado na URl', () => {
    const resultExecute = [[]];

    before(() => {
      sinon.stub(productsModel, 'findById')
      .resolves(resultExecute);
    })

    after(() => {
      productsModel.findById.restore();
    })

    it('Teste se retorna um array', async() => {
      const result = await productsService.findById();
      expect(result).to.be.an('array');
      // console.log(result);
    })

    it('Teste se retorna um array vazio', async() => {
      const result = await productsService.findById();
      expect(result).to.be.empty;
    })
  })

  describe('PRODUCTSERVICE - Quando existem produtos cadastrados com o id informado', () => {
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
      sinon.stub(productsModel, 'findById')
      .resolves(resultExecute);
    })

    after(() => {
      productsModel.findById.restore();
    })

    it('Teste se o array retornado possui objetos', async() => {
      const result = await productsService.findById(2); // desestrutura o result para retornar um objeto
      expect(result).to.be.an('object');

    it('Teste se o array retornado não está vazio', async() => {
      const result = await productsService.findById(1);
      expect(result).to.be.not.empty;
    })  

    })

    it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
      const result = await productsService.findById(2);
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })
  })
})

describe ('PRODUCTSSERVICE - Testa se o produto criado é retornado', () => {
  describe('Quando obtem sucesso no cadastro do produto', () => {
    const resultExecute =[[
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
    ]];

    before(() => {
      sinon.stub(productsModel, 'createProduct')
      .resolves(resultExecute);
    })

    after(() => {
      productsModel.createProduct.restore();
    })

    it('Teste se retorna um object', async() => {
      const [result] = await productsService.createProduct('produto C', 25);
      expect(result).to.be.an('array');
      // console.log(result, 247);
    })

    it('Teste se retorna um object não vazio', async() => {
      const [[result]] = await productsService.createProduct('produto C', 25);
      expect(result).to.be.not.empty;
      // console.log(result,253);
    })

    it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
      const [[result]] = await productsService.createProduct('produto C', 25);
      // console.log(result, 258);
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })
  })

  describe ('PRODUCTSSERVICE - Testa se o produto é atualizado', () => {
    describe('quando o produto é atualizado com sucesso', () => {
      const resultExecute =[[
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
      ]];
  
      before(() => {
        sinon.stub(productsModel, 'updateProduct')
        .resolves(resultExecute);
      })
  
      after(() => {
        productsModel.updateProduct.restore();
      })
  
      it('Teste se retorna um object', async() => {
        const [result] = await productsService.updateProduct(1, 'produto ABC', 25);
        expect(result).to.be.an('array');
      })
  
      it('Teste se retorna um object não vazio', async() => {
        const [[result]] = await productsService.updateProduct(1, 'produto A', 25);
        expect(result).to.be.not.empty;
      })
  
      it('Teste se o array retornado contem os atributos id, name e quantity', async() => {
        const [[result]] = await productsService.updateProduct(1, 'produto ABC', 25);
        // console.log(result, 303);
        expect(result).to.be.includes.all.keys(
          'id',
          'name',
          'quantity'
        )
      })
    })
  })
})

