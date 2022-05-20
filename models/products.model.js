const connection = require('./connection');

const listProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  
  return result;
};

const findById = async (id) => {
  const result = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
     [id],
);
  return result[0];
};
  const getproductByName = async (name) => {
    const [byName] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
    );
    return byName;
  };

const createProduct = async (name, quantity) => {
  const [result] = await connection.execute(
    `INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?)`,
    [name, quantity],
);
return {
  id: result.insertId,
  name,
  quantity,
};
};

module.exports = {
  listProducts,
  findById,
  createProduct,
  getproductByName,
};