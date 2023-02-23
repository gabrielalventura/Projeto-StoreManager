const camelize = require('camelize');
const connection = require('../db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT p.sale_id, s.date, p.product_id, p.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS p ON s.id = p.sale_id
      ORDER BY p.sale_id, p.product_id;`,
  );
  // console.log('result', result);
  return camelize(result);
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT s.date, p.product_id, p.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS p ON s.id = p.sale_id
    WHERE s.id = ? ORDER BY p.sale_id, p.product_id;`,
    [saleId],
  );
  // console.log('result', result);
  return camelize(result);
};

const insertSale = async (date) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (?);',
    [date],
  );
  return insertId;
};

 const insertSoldProducts = async (insertId, soldProduct) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity ) VALUE (?, ?, ?);',
    [insertId, soldProduct.productId, soldProduct.quantity],
  );
 };

const deleteById = async (saleId) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id =  ?',
    [saleId],
  );
};

module.exports = {
  findAll,
  findById,
  insertSale,
  insertSoldProducts,
  deleteById,
};
