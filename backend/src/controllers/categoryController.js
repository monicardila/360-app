const { products } = require("../utils/prismaClient");
const queries = require("../utils/queries");

const categoryControllers = {
  async getAll(req, res) {
    try {
      const category = await queries.findMany("category");
      res.status(200).json(category);
    } catch (error) {
      console.log(`Error finding category: ${error.message}`);
      res.status(500).json({ error: "Error finding category" });
    }
  },
  //FOCUS
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { includeProducts } = req.query;
      const includeOptions =
        includeProducts === "true"
          ? {
              products: true,
              parent: true,
            }
          : {};

      const category = await queries.findById(
        "category",
        Number(id),
        includeOptions
      );
      if (!category) {
        return res.status(404).json({ message: "category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      console.log(`Error fetching category: ${error.message}`);
      res.status(500).json({ error: "Error fetching by id category" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const category = await queries.create("category", data);
      res.status(201).json(category);
    } catch (error) {
      console.log(`Error creating category: ${error.message}`);
      res.status(500).json({ error: "Error creating  category" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid category ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const category = await queries.update("category", Number(id), data);
      console.log("Updating category with ID:", id, "Data:", data);
      res.status(200).json(category);
      if (!category) {
        return res.status(404).json({ error: "category not found" });
      }
    } catch (error) {
      console.log(`Error updating category: ${error.message}`);
      res.status(500).json({ error: "Error updating category" });
    }
  },

  async count(req, res) {
    try {
      const category = await queries.count("category");
      res.status(200).json({ total: category });
    } catch (error) {
      console.log("Error counting category:", error);
      res.status(500).json({ error: "Error counting category" });
    }
  },
  //-------------
  async deactivate(req, res) {
    try {
      const { id } = req.params;
      const category = await queries.deactivate("category", Number(id));
      res
        .status(200)
        .json({ message: `Successfully disabled category`, category });
    } catch (error) {
      console.log(("Error deactivating category:", error));
      res.status(500).json({ error: "Error deactivating category" });
    }
  },

  async activate(req, res) {
    try {
      const { id } = req.params;
      const category = await queries.activate("category", Number(id));
      res
        .status(200)
        .json({ message: `Successfully activating category`, category });
    } catch (error) {
      console.log(("Error activating category:", error));
      res.status(500).json({ error: "Error activating category" });
    }
  },

  async findStatus(req, res) {
    try {
      const { status } = req.query;
      const category = await queries.findStatus("category", status === "true");
      res.status(200).json(category);
    } catch (error) {
      console.log("Error fetching category by status:", error);
      res.status(500).json({ error: "Error fetching category by status" });
    }
  },
};

module.exports = categoryControllers;
