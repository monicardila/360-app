const express = require("express");
const cartItemController = require("../controllers/cartItemController");
const cartItemRoutes = express.Router();

cartItemRoutes.get("/count", cartItemController.count);
cartItemRoutes.get("/", cartItemController.getAll); // ok
cartItemRoutes.get("/:id", cartItemController.getById); // ok
cartItemRoutes.post("/", cartItemController.create); // ok
cartItemRoutes.put("/:id", cartItemController.update); // ok
cartItemRoutes.delete("/:id", cartItemController.delete);

module.exports = cartItemRoutes;
