const connection = require('./connection');

const listSales = async () => {
  const [result] = await connection.execute(
    `SELECT s.id AS saleId,s.date,sp.product_id AS productId, sp.quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON  s.id = sp.sale_id`,
  );
  
  return result;
};

const findById = async (id) => {
  const query = `SELECT s.date, sp.product_id AS productId, sp.quantity
  FROM StoreManager.sales AS s 
  INNER JOIN StoreManager.sales_products AS sp
  ON s.id = sp.sale_id WHERE s.id = ?`;
  const result = await connection.execute(query, [id]);

  return result;
};

module.exports = {
  listSales,
  findById,
};