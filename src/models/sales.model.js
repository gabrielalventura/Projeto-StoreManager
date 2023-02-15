// const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('../db/connection');

const insertSoldProducts = async (saleID, soldProduct) => {
  const columns = Object.keys(snakeize(soldProduct)).join(', ');
  const placeholders = Object.keys(soldProduct).map((_key) => '?').join(', ');

  const [{ register }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (${placeholders});`,
    [saleID, ...Object.values(soldProduct)],
    
  );
  console.log('register', register);
  return register;
};

module.exports = {
  insertSoldProducts,
};
