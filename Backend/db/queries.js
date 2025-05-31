const pool = require("./pool");

async function findId(id) {
  const { rows } = await pool.query("SELECT id FROM items WHERE id = $1", [id]);
  return rows;
}

async function getCategory(category_id) {
  const { rows } = await pool.query(
    "SELECT * FROM items where id IN (SELECT item_id FROM category_items WHERE category_id = $1) ",
    [category_id],
  );
  return rows;
}

async function getItem(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return rows[0];
}

async function updateItem(name, quantity, id, image_url, category) {
  const row = await findId(id);
  if (!row[0]) return false;
  const { rows } = await pool.query(
    "UPDATE items SET name = $1, quantity = $2, inward_date = NOW(), image_url = $3 WHERE id = $4 RETURNING id",
    [name, quantity, image_url, id],
  );
  const item_id = rows[0].id

  await pool.query(
    "UPDATE category_items SET category_id = $1 WHERE item_id = $2",
    [category, item_id]
  )

  return true;
}

async function deleteItem(id) {
  const rows = await findId(id);
  if (!rows[0]) return false;
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
  return true;
}

async function addItem(name, quantity, image_url , value) {
  const { rows } = await pool.query("SELECT name FROM items WHERE name = $1", [
    name,
  ]);
  if (rows[0]) return false;

  const result = await pool.query(
    "INSERT INTO items(name, quantity, image_url) VALUES ($1, $2, $3) RETURNING id",
    [name, quantity, image_url],
  );

  const item_id = result.rows[0].id;

  await pool.query(
    "INSERT INTO category_items(category_id, item_id) VALUES ($1, $2)",
    [value, item_id],
  );
  return true;
}

async function addCategory(name){
  const { rows } = await pool.query('SELECT * FROM categories')
  const rowExists = rows.find(row => row.name === name)
  if(rowExists) return false
  await pool.query("INSERT INTO categories(name) VALUES ($1)", [name])
  return true
}

module.exports = {
  getCategory,
  getItem,
  updateItem,
  deleteItem,
  addItem,
  addCategory
};
