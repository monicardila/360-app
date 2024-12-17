const express = require("express");
const categoryControllers = require("../controllers/categoryController");
const categoryRoutes = express.Router();

categoryRoutes.get("/count", categoryControllers.count); //Define specific routes FIRST
categoryRoutes.get("/status", categoryControllers.findStatus); //ok
categoryRoutes.get("/", categoryControllers.getAll); //ok
categoryRoutes.get("/:id", categoryControllers.getById); //ok
categoryRoutes.post("/", categoryControllers.create); //ok
categoryRoutes.put("/:id", categoryControllers.update); //ok
categoryRoutes.put("/deactivate/:id", categoryControllers.deactivate); //ok
categoryRoutes.put("/activate/:id", categoryControllers.activate); //ok

module.exports = categoryRoutes;
