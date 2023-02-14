const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { products } = require('./mocks/products.service.mock');

describe('Teste de unidade service de products', function () {
  describe('listagem de produtos', function () {
    it('Exibindo lista de produtos completa', async function () {
      //Arrange
      sinon.stub(productsModel, 'findAll').resolves(products);
      //Act
      const result = await productsService.findAll();
      //Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });

  describe('Busca por um produto a partir do id', function () {
    it('Retorna um erro caso receba ID invalido', async function () {
      //Arrange -> o Arrange é dispensavel quando não é necessário chamar o model! Seguindo os steps da aula 5.3 de backend
      //Act
      const result = await productsService.findById('x');
      //Assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('id invalido');
    });

    it('retorna o produto caso o ID exista', async function () {
      //Arrange
      sinon.stub(productsModel, 'findById').resolves(products[0]);
      //Act
      const result = await productsService.findById(1);
      //Assert
      // expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});