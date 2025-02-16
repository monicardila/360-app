const queries = require("../utils/queries");

const ordersController = {
  // http://localhost:3000/api/v1/orders?delivery_status=APROBADA
  async getAll(req, res) {
    try {
      const { delivery_status } = req.query;
      const filterOptions = {};

      if (delivery_status) {
        filterOptions.where = { delivery_status };
      }

      const orders = await queries.findAll("orders", filterOptions);

      if (!orders || orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found with the given status" });
      }
      res.status(200).json(orders);
    } catch (error) {
      console.log(`Error finding orders: ${error.message}`);
      res.status(500).json({ error: "Error finding orders" });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const orders = await queries.findById("orders", Number(id));
      if (!orders) {
        return res.status(404).json({ message: "order not found" });
      }

      res.status(200).json(orders);
    } catch (error) {
      console.log(`Error fetching orders: ${error.message}`);
      res.status(500).json({ error: "Error fetching by id orders" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const orders = await queries.create("orders", data);
      res.status(201).json(orders);
    } catch (error) {
      console.log(`Error creating orders: ${error.message}`);
      res.status(500).json({ error: "Error creating  orders" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid orders ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const orders = await queries.update("orders", Number(id), data);
      console.log("Updating orders with ID:", id, "Data:", data);
      res.status(200).json(orders);
      if (!orders) {
        return res.status(404).json({ error: "orders not found" });
      }
    } catch (error) {
      console.log(`Error updating orders: ${error.message}`);
      res.status(500).json({ error: "Error updating orders" });
    }
  },

  async count(req, res) {
    try {
      const orders = await queries.count("orders");
      res.status(200).json({ total: orders });
    } catch (error) {
      console.log("Error counting orders:", error);
      res.status(500).json({ error: "Error counting orders" });
    }
  },
};

module.exports = ordersController;
