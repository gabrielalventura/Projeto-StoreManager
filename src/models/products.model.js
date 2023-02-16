const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('../db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return camelize(result);
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return camelize(result);
};

const insert = async (product) => {
  const columns = Object.keys(snakeize(product)).join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders});`,
    [...Object.values(product)],
  );
  return insertId;
};

const updateById = async (productId, productName) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?);',
    [productName, productId],
  );
  return { id: productId, name: productName };
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};