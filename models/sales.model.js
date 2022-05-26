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

const createSale = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  const registeredSale = await connection.execute(query, [saleId, productId, quantity]);
  
  return registeredSale;
};

const createNewSaleId = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES(sysdate())';
  const [registredSaleId] = await connection.execute(query);

  return registredSaleId.insertId;
};

module.exports = {
  listSales,
  findById,
  createSale,
  createNewSaleId,
};