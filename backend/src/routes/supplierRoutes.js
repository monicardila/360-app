const express = require("express");
const supplierController = require("../controllers/supplierController");
const supplierRoutes = express.Router();

supplierRoutes.get("/count", supplierController.count); //Define specific routes FIRST
supplierRoutes.get("/status", supplierController.findStatus); //ok
supplierRoutes.get("/", supplierController.getAll); //ok
supplierRoutes.get("/:id", supplierController.getById); //ok
supplierRoutes.post("/", supplierController.create); //ok
supplierRoutes.put("/:id", supplierController.update); //ok
supplierRoutes.put("/deactivate/:id", supplierController.deactivate); //ok
supplierRoutes.put("/activate/:id", supplierController.activate);

module.exports = supplierRoutes;

// error con deactivate
