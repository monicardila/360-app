const express = require("express");
const supplierInvoicesController = require("../controllers/supplierInvoicesController");
const supplierInvoicesRoutes = express.Router();

supplierInvoicesRoutes.get("/count", supplierInvoicesController.count); //Define specific routes FIRST
supplierInvoicesRoutes.get("/", supplierInvoicesController.getAll); //ok
supplierInvoicesRoutes.get("/:id", supplierInvoicesController.getById); //ok
supplierInvoicesRoutes.post("/", supplierInvoicesController.create); //ok
supplierInvoicesRoutes.put("/:id", supplierInvoicesController.update); //ok

module.exports = supplierInvoicesRoutes;
