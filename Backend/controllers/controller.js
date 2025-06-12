const db = require("../db/queries.js");
const bycrypt = require("bcryptjs");
const passport = require("../auth/auth.js");

async function getCategoryItems(req, res) {
  try {
    const category_id = req.params.id;
    const category_items = await db.getCategory(Number(category_id));
    if (!category_items) {
      res.status(404).json({ message: "No such category" });
      return;
    }
    res.json(category_items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server Error" });
  }
}

async function getItem(req, res) {
  try {
    const { id } = req.params;
    const item = await db.getItem(Number(id));
    if (!item) {
      res.status(404).json({ message: "No such item" });
      return;
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Internal server Error" });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const { quantity, image_url, item, category } = req.body;

    if (!id || !quantity || !image_url || !item || !category) {
      res
        .status(400)
        .json({ message: "Missing item ID, quantity, category or image link" });
      return;
    }
    if (await db.updateItem(item, quantity, Number(id), image_url, category)) {
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      res.status(404).json({ message: "The id was not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing item ID or quantity" });
      return;
    }
    if (await db.deleteItem(Number(id))) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "The id was not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server Error" });
  }
}

async function addItem(req, res) {
  try {
    const { item, category, quantity, image_url } = req.body;
    if (!item || !category || !quantity || !image_url) {
      res
        .status(400)
        .json({ message: "Missing item, category, image_url or quantity" });
      return;
    }

    if (await db.addItem(item, quantity, image_url, category)) {
      res.status(200).json({ message: "Item added successfully" });
    } else {
      res.status(409).json({ message: "item already exists" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server Error" });
  }
}

async function addCategory(req, res) {
  try {
    const { new_category } = req.body;
    if (!new_category) {
      res.status(400).json({ message: "Missing new category" });
      return;
    }
    if (await db.addCategory(new_category)) {
      res.status(200).json({ message: "category added successfully" });
    } else {
      res.status(409).json({ message: "category exists" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server Error" });
  }
}
async function addUsers(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Missing username or password" });
      return;
    }

    const hashedPassword = await bycrypt.hash(password, 10);
    if (await db.addUsers(username, hashedPassword)) {
      res.status(200).json({ message: "User added successfully" });
    } else {
      res.status(409).json({ message: "Username already exists" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server Error" });
  }
}

module.exports = {
  getCategoryItems,
  getItem,
  updateItem,
  deleteItem,
  addItem,
  addCategory,
  addUsers,
};
