const connection = require('./connection');

const listProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  
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