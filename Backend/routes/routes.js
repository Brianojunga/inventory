const { Router } = require("express");
const route = Router();
const {
  login,
  logout,
  requireAuth,
  checkAdmin,
} = require("../controllers/authController");
const {
  getCategoryItems,
  getItem,
  updateItem,
  deleteItem,
  addItem,
  addCategory,
  addUsers,
} = require("../controllers/controller");

// public routes
route.post("/login", login);
route.post("/signup", addUsers);

route.use(requireAuth); // Protect all routes below this middleware they are private routes

//private routes
route.post("/logout", logout);
route.get("/items/:id", getItem);
route.get("/categories/:id", getCategoryItems);

route.use(checkAdmin); // Protect all routes below this middleware they are admin routes
route.post("/categories", addCategory);
route.post("/items", addItem);
route.patch("/items/:id", updateItem);
route.delete("/items/:id", deleteItem);

module.exports = route;
