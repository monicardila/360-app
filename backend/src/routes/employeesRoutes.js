const express = require("express");
const employeesController = require("../controllers/employeesController");
const employeesRoutes = express.Router();

employeesRoutes.get("/count", employeesController.count);
employeesRoutes.get("/status", employeesController.findStatus); //ok
employeesRoutes.get("/", employeesController.getAll); //ok
employeesRoutes.get("/:id", employeesController.getById); //ok
employeesRoutes.post("/", employeesController.create); //ok
employeesRoutes.put("/:id", employeesController.update); //ok
employeesRoutes.put("/deactivate/:id", employeesController.deactivate); //ok
employeesRoutes.put("/activate/:id", employeesController.activate); //ok

module.exports = employeesRoutes;
