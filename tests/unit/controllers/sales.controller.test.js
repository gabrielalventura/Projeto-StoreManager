const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { sales } = require('./mocks/sales.controller.mock');

describe('Teste de unidade controller de sales', function () {
  describe('Lista os produtos', function () {
    it('Retorna o status 200 e a lista', async function () {
      //Arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves({ type: null, message: sales });

      //Act
      await salesController.listProducts(req, res);

      //Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });
  });

  describe('Buscando um produto', function () {
    it('Retorna com status 200 e os dados do produto quando este existir', async function () {
      //Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findById')
        .resolves({ type: null, message: sales });

      //Act
      await salesController.listProductsById(req, res);

      //Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});