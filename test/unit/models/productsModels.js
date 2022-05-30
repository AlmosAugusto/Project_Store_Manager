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

  describe ('PRODUCTSMODEL - Testa se apenas o produto com o id presente na URL é retornado;', () => {
    describe('Quando não existe nenhum produto com o id informado na URl', () => {
      const resultExecute = [[]];
  
      before(() => {
        sinon.stub(connection, 'execute')
        .resolves(resultExecute);
      })
  
      after(() => {
        connection.execute.restore();
      })
  
      it('Teste se retorna um array', async() => {
        const result = await productsModel.findById();
        expect(result).to.be.an('array');
        // console.log(result);
      })
  
      it('Teste se retorna um array vazio', async() => {
        const result = await productsModel.findById();
        expect(result).to.be.empty;
      })
    })
  
    describe('PRODUCTSMODEL - Quando existem produtos cadastrados com o id informado', () => {
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
        const result = await productsModel.findById(1);
        expect(result).to.be.an('array');
      })
  
      it('Teste se o array retornado não está vazio', async() => {
        const result = await productsModel.findById(1);
        expect(result).to.be.not.empty;
      })

      it('Teste se o array retornado possui objetos', async() => {
        const [result] = await productsModel.findById(2); // desestrutura o result para retornar um objeto
        expect(result).to.be.an('object');
  
      })
      it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
        const [result] = await productsModel.findById(2);
        expect(result).to.be.includes.all.keys(
          'id',
          'name',
          'quantity'
        )
      })
    })
})

describe ('PRODUCTSMODEL - Testa se apenas o produto com o nome presente na URL é retornado;', () => {
  describe('Quando não existe nenhum produto com o nome informado na URl', () => {
    const resultExecute = [[[]]];

    before(() => {
      sinon.stub(connection, 'execute')
      .resolves(resultExecute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Teste se retorna um array', async() => {
      const result = await productsModel.getproductByName('naoExiste');
      expect(result).to.be.an('array');
      // console.log(result);
    })

    it('Teste se retorna um array vazio', async() => {
      const result = await productsModel.getproductByName('naoExiste');
      expect(result).to.be.empty;
    })
  })

  describe('PRODUCTSMODEL - Quando existem produtos cadastrados com o nome informado', () => {
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
      sinon.stub(connection, 'execute')
      .resolves([resultExecute]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Teste se retorna um array', async() => {
      const result= await productsModel.getproductByName('produto A');
      expect(result).to.be.an('array');
    })

    it('Teste se o array retornado não está vazio', async() => {
      const result = await productsModel.getproductByName('produto A');
      expect(result).to.be.not.empty;
    })

    it('Teste se o array retornado possui objetos', async() => {
      const [result] = await productsModel.getproductByName('produto A'); 
      expect(result).to.be.an('object');

    })
    it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
      const [result] = await productsModel.getproductByName('produto A');
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })
  })
})

describe ('PRODUCTSMODEL - Testa se o produto criado é retornado;', () => {
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
      sinon.stub(connection, 'execute')
      .resolves(resultExecute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Teste se retorna um object', async() => {
      const result = await productsModel.createProduct(3, 'produto C', 25);
      expect(result).to.be.an('object');
    })

    it('Teste se retorna um object não vazio', async() => {
      const result = await productsModel.createProduct(3, 'produto C', 25);
      expect(result).to.be.not.empty;
      // console.log(result);
    })

    it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
      const result = await productsModel.createProduct(3,'produto C', 25);
      // console.log(result);
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })
  })
})

describe('Testa se o produto é atualizado', () => {
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
      sinon.stub(connection, 'execute')
      .resolves(resultExecute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Teste se retorna um object', async() => {
      const result = await productsModel.updateProduct(1,'produto A', 25);
      expect(result).to.be.an('object');
    })

    it('Teste se retorna um object não vazio', async() => {
      const result = await productsModel.updateProduct(1, 'produto A', 25);
      // console.log(result, 310);
      expect(result).to.be.not.empty;
    })

    it('Teste se o objeto dentro do array retornado contem os atributos id, name e quantity', async() => {
      const result = await productsModel.createProduct(1, 'produto A', 25);
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      )
    })    

  })
})

describe('Testa se o produto é deletado', () => {
  describe('quando o produto é deletado com sucesso', () => { 
 
    before(() => {
      sinon.stub(connection, 'execute')
      .resolves();
    })

    after(() => {
      connection.execute.restore();
    })


    it('Teste se retorna um object vazio', async() => {
      const result = await productsModel.deleteProduct(1);
      // console.log(result, 310);
      expect(result).to.be.undefined;
    })

  })
})


