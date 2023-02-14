const camelize = require('camelize');
const connection = require('../db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return camelize(result);
};

module.exports = {
  findAll,
};