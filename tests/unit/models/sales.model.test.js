const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/db/connection');
const { sales } = require('./mocks/sales.model.mock');

describe('Testes de unidade model de sales', function () {
  it('Recuperando a lista de sales', async function () {
    //Arrange
    sinon.stub(connection, 'execute').resolves([sales]);
    //Act
    const result = await salesModel.findAll();
    //Assert
    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando uma sale a partir do seu id', async function () {
    //Arrange
    sinon.stub(connection, 'execute').resolves([sales[0]]);
    //Act
    const result = await salesModel.findById(1);
    //Assert
    expect(result).to.be.deep.equal(sales[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});