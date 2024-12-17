const express = require("express");
const branchStoreController = require("../controllers/branchStoreController");
const branchStoreRoutes = express.Router();

branchStoreRoutes.get("/count", branchStoreController.count); //Define specific routes FIRST
branchStoreRoutes.get("/status", branchStoreController.findStatus); //ok
branchStoreRoutes.get("/", branchStoreController.getAll); //ok
branchStoreRoutes.get("/:id", branchStoreController.getById); //ok
branchStoreRoutes.post("/", branchStoreController.create); //ok
branchStoreRoutes.put("/:id", branchStoreController.update); //ok
branchStoreRoutes.put("/deactivate/:id", branchStoreController.deactivate); //ok
branchStoreRoutes.put("/activate/:id", branchStoreController.activate); //ok

module.exports = branchStoreRoutes;
