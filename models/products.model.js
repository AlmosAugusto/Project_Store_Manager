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
  const getproductByName = async (name) => {
    const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
    const [result] = await connection.execute(query, [name]);
    console.log(result);
    return result[0];
  };

const createProduct = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
  VALUES (?, ?)`;
  const [registeredId] = await connection.execute(query, [name, quantity]);
  
  const createdProduct = {
    id: registeredId.insertId,
    name,
    quantity,
  };
  return createdProduct;
};

module.exports = {
  listProducts,
  findById,
  getproductByName,
  createProduct,
};