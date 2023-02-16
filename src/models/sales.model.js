const connection = require('../db/connection');

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

module.exports = {
  insertSale,
  insertSoldProducts,
};
