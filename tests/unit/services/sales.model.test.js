const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { sales } = require('./mocks/sales.model.mock');

describe('Teste de unidade service de sales', function () {
  describe('listagem de sales', function () {
    it('Exibindo lista de sales completa', async function () {
      //Arrange
      sinon.stub(salesModel, 'findAll').resolves(sales);
      //Act
      const result = await salesService.findAll();
      //Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(sales);
    });
  });

  describe('Busca por uma sale a partir do id', function () {
    it('Retorna um erro caso receba ID invalido', async function () {
      //Arrange -> o Arrange é dispensavel quando não é necessário chamar o model! Seguindo os steps da aula 5.3 de backend
      //Act
      const result = await salesService.findById('x');
      //Assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('id invalido');
    });

    it('retorna a sale caso o ID exista', async function () {
      //Arrange
      sinon.stub(salesModel, 'findById').resolves(sales[0]);
      //Act
      const result = await salesService.findById(1);
      //Assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(sales[0]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});