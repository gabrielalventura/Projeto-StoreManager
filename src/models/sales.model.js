const connection = require('../db/connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW());',
  );
  return insertId;
};

 const insertSoldProducts = async (insertId, soldProduct) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity ) VALUE (?, ?, ?);',
    [soldProduct.productId, insertId, soldProduct.quantity],
  );
};

module.exports = {
  insertSale,
  insertSoldProducts,
};
