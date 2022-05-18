const connection = require('./connection');

const listProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  
  return result;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const result = await connection.execute(query, [id]);

  return result[0];
};

module.exports = {
  listProducts,
  findById,
};