const express = require("express");
const cartController = require("../controllers/cartController");
const cartRoutes = express.Router();

cartRoutes.get("/", cartController.getAll); // ok
cartRoutes.get("/:id", cartController.getById); // ok
cartRoutes.post("/", cartController.create); // ok
cartRoutes.put("/:id", cartController.update); // ok
cartRoutes.delete("/:id", cartController.delete);

module.exports = cartRoutes;
