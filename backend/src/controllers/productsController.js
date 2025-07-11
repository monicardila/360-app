const queries = require("../utils/queries");

// // if (isNaN(id) || id <= 0) {
//   return res.status(400).json({ error: "Invalid product ID" });
// }

const productsController = {
  async getAll(req, res) {
    try {
      const products = await queries.findAll("products");
      res.status(200).send(products);
    } catch (error) {
      console.log(`Error finding products: ${error.message}`);
      res.send(500).json({ error: "Error fetching products CONTROLLER ALL" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const products = await queries.create("products", data);
      res.status(201).json(products);
    } catch (error) {
      console.log(`Error creating products: ${error.message}`);
      res.status(500).json({ error: "Error creating products" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const { includeSupplier } = req.query;
      const includeOptions =
        includeSupplier === "true" ? { supplier: true } : {};
      const products = await queries.findById(
        "products",
        Number(id),
        includeOptions
      );
      if (!products) {
        return res.status(404).json({ error: "products not found" });
      }
      res.status(200).send(products);
    } catch (error) {
      console.log(`Error fetching products: ${error.message}`);
      res.status(500).json({ error: "Error fetching products CONTROLLER ID" });
    }
  },

  async getByName(req, res) {
    try {
      const { name } = req.params;
      if (!name) {
        return res.status(400).json({ error: "Name parameter is required" });
      }
      const products = await queries.findByName("products", name);
      if (!products) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).send(products);
    } catch (error) {
      console.log(`Error fetching products:${error.message}`);
      res.status(500).json({ error: "Error fetching products" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid products ID" });
      }

      const allowedFields = [
        "name",
        "description",
        "price",
        "stock",
        "supplier_id",
        "categoryId",
        "status",
      ];

      const incomingData = req.body;

      if (
        !incomingData ||
        typeof incomingData !== "object" ||
        Array.isArray(incomingData)
      ) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      // Solo incluir los campos válidos
      const data = {};
      for (const field of allowedFields) {
        if (field in incomingData) {
          data[field] = incomingData[field];
        }
      }

      if (Object.keys(data).length === 0) {
        return res
          .status(400)
          .json({ error: "No valid fields provided for update." });
      }

      const product = await queries.update("products", Number(id), data);

      console.log("Updating product with ID:", id, "Data:", data);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(`Error updating products: ${error.message}`);
      res.status(500).json({ error: "Error updating products" });
    }
  },

  async count(req, res) {
    try {
      const products = await queries.count("products");
      res.status(200).json({ total: products });
    } catch (error) {
      console.log("Error in counting products: ", error);
      res
        .status(500)
        .json({ error: `Error counting products: ${error.message}` });
    }
  },
  //-------------
  async deactivate(req, res) {
    try {
      const { id } = req.params;
      const products = await queries.deactivate("products", Number(id));
      res
        .status(200)
        .json({ message: `Successfully disabled products`, products });
    } catch (error) {
      console.log(("Error deactivating products:", error));
      res.status(500).json({ error: "Error deactivating products" });
    }
  },

  async activate(req, res) {
    try {
      const { id } = req.params;
      const products = await queries.activate("products", Number(id));
      res
        .status(200)
        .json({ message: `Successfully activating products`, products });
    } catch (error) {
      console.log(("Error activating products:", error));
      res.status(500).json({ error: "Error activating products" });
    }
  },

  async getStatus(req, res) {
    try {
      const { status } = req.query;

      if (status !== undefined) {
        const normalizedStatus =
          status === "true" ? true : status === "false" ? false : null;
        console.log("Normalized status CONTROLLER:", normalizedStatus);

        const products = await queries.findStatus("products", normalizedStatus);
        console.log("Products fetched by status:", products);

        return res.status(200).send(products);
      }

      const products = await queries.findStatus("products", status);
      return res.status(200).send(products);
    } catch (error) {
      console.log("Error fetching products by status:", error);
      res.status(500).json({ error: "Error fetching products by status" });
    }
  },
};

module.exports = productsController;

//  descativar producto, no eliminar
