const { cartItem, products } = require("../utils/prismaClient");
const queries = require("../utils/queries");

const cartItemControllers = {
  async getAll(req, res) {
    try {
      const cartItem = await queries.findAll("cartItem");
      res.status(200).json(cartItem);
    } catch (error) {
      console.log(`Error finding cartItem: ${error.message}`);
      res.status(500).json({ error: "Error finding cartItem" });
    }
  },
  // http://localhost:3000/api/v1/cartItem/8
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { includeProducts } = req.query;
      const includeOptions =
        includeProducts === "true"
          ? {
              products: true,
            }
          : {};

      const cartItem = await queries.findById(
        "cartItem",
        Number(id),
        includeOptions
      );
      if (!cartItem) {
        return res.status(404).json({ message: "cartItem not found" });
      }
      res.status(200).json(cartItem);
    } catch (error) {
      console.log(`Error fetching cartItem: ${error.message}`);
      res.status(500).json({ error: "Error fetching by id cartItem" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const cartItem = await queries.create("cartItem", data);
      res.status(201).json(cartItem);
    } catch (error) {
      console.log(`Error creating cartItem: ${error.message}`);
      res.status(500).json({ error: "Error creating cartItem" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid cartItem ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const cartItem = await queries.update("cartItem", Number(id), data);
      console.log("Updating cartItem with ID:", id, "Data:", data);
      res.status(200).json(cartItem);
      if (!cartItem) {
        return res.status(404).json({ error: "cartItem not found" });
      }
    } catch (error) {
      console.log(`Error updating cartItem: ${error.message}`);
      res.status(500).json({ error: "Error updating cartItem" });
    }
  },

  async count(req, res) {
    try {
      const cartItem = await queries.count("cartItem");
      res.status(200).json({ total: cartItem });
    } catch (error) {
      console.log("Error in counting cartItem: ", error);
      res
        .status(500)
        .json({ error: `Error counting cartItem: ${error.message}` });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Intenta eliminar el carrito
      const deletedItem = await queries.delete("cartItem", Number(id));

      // Si no encontró nada para eliminar
      if (!deletedItem) {
        return res.status(404).json({ message: "cartItem not found" });
      }

      // Devuelve el carrito eliminado
      res
        .status(200)
        .json({
          message: "cartItem deleted successfully",
          cartItem: deletedItem,
        });
    } catch (error) {
      console.error(`Error deleting cartItem : ${error.message}`);
      res.status(500).json({ error: "Error deleting cartItem" });
    }
  },
};

module.exports = cartItemControllers;
