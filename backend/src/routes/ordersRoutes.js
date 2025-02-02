const express = require("express");
const ordersController = require("../controllers/ordersController");
const ordersRoutes = express.Router();

ordersRoutes.get("/count", ordersController.count); //Define specific routes FIRST
ordersRoutes.get("/", ordersController.getAll); //ok
ordersRoutes.get("/:id", ordersController.getById); //ok
ordersRoutes.post("/", ordersController.create); //ok
ordersRoutes.put("/:id", ordersController.update); //ok

module.exports = ordersRoutes;
