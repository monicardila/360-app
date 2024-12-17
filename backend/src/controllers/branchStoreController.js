const { employees } = require("../utils/prismaClient");
const queries = require("../utils/queries");

const branchStoreControllers = {
  async getAll(req, res) {
    try {
      const branchStore = await queries.findMany("branchStore");
      res.status(200).json(branchStore);
    } catch (error) {
      console.log(`Error finding branch Store: ${error.message}`);
      res.status(500).json({ error: "Error finding branch Store" });
    }
  },
  // http://localhost:3000/api/v1/branchStore/8?includeEmployees=true
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { includeEmployees } = req.query;
      const includeOptions =
        includeEmployees === "true"
          ? {
              employees: true,
            }
          : {};

      const branchStore = await queries.findById(
        "branchStore",
        Number(id),
        includeOptions
      );
      if (!branchStore) {
        return res.status(404).json({ message: "branch Store not found" });
      }
      res.status(200).json(branchStore);
    } catch (error) {
      console.log(`Error fetching branch Store: ${error.message}`);
      res.status(500).json({ error: "Error fetching by id branch Store" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const branchStore = await queries.create("branchStore", data);
      res.status(201).json(branchStore);
    } catch (error) {
      console.log(`Error creating branch Store: ${error.message}`);
      res.status(500).json({ error: "Error creating  branch Store" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid branch Store ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const branchStore = await queries.update("branchStore", Number(id), data);
      console.log("Updating branch Store with ID:", id, "Data:", data);
      res.status(200).json(branchStore);
      if (!branchStore) {
        return res.status(404).json({ error: "branch Store not found" });
      }
    } catch (error) {
      console.log(`Error updating branch Store: ${error.message}`);
      res.status(500).json({ error: "Error updating branch Store" });
    }
  },

  async count(req, res) {
    try {
      const branchStore = await queries.count("branchStore");
      res.status(200).json({ total: branchStore });
    } catch (error) {
      console.log("Error counting branch Store:", error);
      res.status(500).json({ error: "Error counting branch Store" });
    }
  },
  //-------------
  async deactivate(req, res) {
    try {
      const { id } = req.params;
      const branchStore = await queries.deactivate("branchStore", Number(id));
      res
        .status(200)
        .json({ message: `Successfully disabled branch Store`, branchStore });
    } catch (error) {
      console.log(("Error deactivating category:", error));
      res.status(500).json({ error: "Error deactivating branch Store" });
    }
  },

  async activate(req, res) {
    try {
      const { id } = req.params;
      const branchStore = await queries.activate("branchStore", Number(id));
      res
        .status(200)
        .json({ message: `Successfully activating branch Store`, branchStore });
    } catch (error) {
      console.log(("Error activating branch Store:", error));
      res.status(500).json({ error: "Error activating branch Store" });
    }
  },

  async findStatus(req, res) {
    try {
      const { status } = req.query;
      const branchStore = await queries.findStatus(
        "branchStore",
        status === "true"
      );
      res.status(200).json(branchStore);
    } catch (error) {
      console.log("Error fetching branch Store by status:", error);
      res.status(500).json({ error: "Error fetching branch Store by status" });
    }
  },
};

module.exports = branchStoreControllers;
