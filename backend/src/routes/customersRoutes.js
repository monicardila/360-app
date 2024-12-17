const express = require("express");
const customersController = require("../controllers/customersController");
const customersRoutes = express.Router();

customersRoutes.get("/count", customersController.count); //Define specific routes FIRST
customersRoutes.get("/", customersController.getAll); //ok
customersRoutes.get("/:id", customersController.getById); //ok
customersRoutes.post("/", customersController.create); //ok
customersRoutes.put("/:id", customersController.update); //ok

module.exports = customersRoutes;
