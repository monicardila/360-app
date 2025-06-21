const { cartItem } = require("../utils/prismaClient");
const queries = require("../utils/queries");

const cartController = {
  async getAll(req, res) {
    try {
      const cart = await queries.findAll("cart");
      res.status(200).json(cart);
    } catch (error) {
      console.log(`Error finding shopping cart: ${error.message}`);
      res.status(500).json({ error: "Error finding shopping cart" });
    }
  },
  // http://localhost:3000/api/v1/cart/8
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { includeCartItem } = req.query;
      const includeOptions =
        includeCartItem === "true"
          ? {
              cartItem: true,
            }
          : {};

      const cart = await queries.findById("cart", Number(id), includeOptions);
      if (!cart) {
        return res.status(404).json({ message: "shopping cart not found" });
      }
      res.status(200).json(cart);
    } catch (error) {
      console.log(`Error fetching shopping cart: ${error.message}`);
      res.status(500).json({ error: "Error fetching by id shopping cart" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const cart = await queries.create("cart", data);
      res.status(201).json(cart);
    } catch (error) {
      console.log(`Error creating shopping cart: ${error.message}`);
      res.status(500).json({ error: "Error creating shopping cart" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid shopping cart ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const cart = await queries.update("cart", Number(id), data);
      console.log("Updating shopping cart with ID:", id, "Data:", data);
      res.status(200).json(cart);
      if (!cart) {
        return res.status(404).json({ error: "shopping cart not found" });
      }
    } catch (error) {
      console.log(`Error updating shopping cart: ${error.message}`);
      res.status(500).json({ error: "Error updating shopping cart" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      // Intenta eliminar el carrito
      const deletedCart = await queries.delete("cart", Number(id));

      // Si no encontró nada para eliminar
      if (!deletedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Devuelve el carrito eliminado
      res
        .status(200)
        .json({ message: "Cart deleted successfully", cart: deletedCart });
    } catch (error) {
      console.error(`Error deleting cart: ${error.message}`);
      res.status(500).json({ error: "Error deleting cart" });
    }
  },
};

module.exports = cartController;
