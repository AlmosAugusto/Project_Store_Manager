const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');
const { SUCESS, CREATED, DELETE} = require('../../../statusCode');

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

describe ('Testa se apenas o produto com o id presente na URL é retornado', () => {
  
  describe('PRODUCTSCONTROLER - Quando existem produtos cadastrados com o id informado na URL', () => {
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
    expect(response.status.calledWith(SUCESS)).to.be.equal(true);
  })
  
  it('Teste se retorna o metodo json contendo os produtos', async() => {
    await productsController.findById(request, response);
    expect(response.json.calledWith(sinon.match.array.contains(resultExecute))); // documentaion sinon https://sinonjs.org/releases/latest/matchers/
    })
  })
})

describe ('PRODUCTSCONTROLER - Testa se o produto criado é retornado', () => {
  describe('Quando obtem sucesso no cadastro do produto', () => {
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
      request.body = { name: 'produto C', quantity: 25 }
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'createProduct').resolves(resultExecute);
    })

    after(() => { productService.createProduct.restore() })

    it('Teste se retorna o metodo "status" passando o codigo 201', async() => {
      await productsController.createProduct(request, response)
      expect(response.status.calledWith(CREATED)).to.be.equal(true);
    })

    it('Teste se retorna um array', async() => {
      await productsController.createProduct(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })

      it('Teste se retorna o metodo json contendo o produto', async() => {
        await productsController.createProduct(request, response);
        expect(response.json.calledWith(sinon.match.array.contains(resultExecute))); // documentaion sinon https://sinonjs.org/releases/latest/matchers/
        })  
  })
}) 
  describe ('PRODUCTSCONTROLER - Testa se o produto atualizado é retornado', () => {
    describe('Quando obtem sucesso na atulização do produto', () => {
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
      request.params = { id: 1 };
      request.body = { name: 'produto ABC', quantity: 25 }
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProduct').resolves(resultExecute);
    })

    after(() => { productService.updateProduct.restore() })

    it('Teste se retorna o metodo "status" passando o codigo 200', async() => {
      await productsController.updateProduct(request, response)
      expect(response.status.calledWith(SUCESS)).to.be.equal(true);
    })

    it('Teste se retorna um array', async() => {
      await productsController.updateProduct(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      })

    it('Teste se retorna o metodo json contendo o produto', async() => {
      await productsController.updateProduct(request, response);
      expect(response.json.calledWith(sinon.match.array.contains(resultExecute))); 
      })  
  })
}) 

describe ('PRODUCTSCONTROLER - Testa se o produto é deletado', () => {
  describe('Quando obtem sucesso na exclusão do produto', () => {
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
    request.params = { id: 1 };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productService, 'deleteProduct').resolves(resultExecute);
  })

  after(() => { productService.deleteProduct.restore() })

  it('Teste se retorna o metodo "status" passando o codigo 204', async() => {
    await productsController.deleteProduct(request, response)
    expect(response.status.calledWith(DELETE)).to.be.equal(true);
    })
  })
}) 

