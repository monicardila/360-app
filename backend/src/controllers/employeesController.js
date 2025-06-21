const queries = require("../utils/queries");

// info total

const employeesController = {
  async getAll(req, res) {
    try {
      const employees = await queries.findAll("employees");
      res.status(200).send(employees);
    } catch (error) {
      console.log(`Error finding employees: ${error.message}`);
      res.send(500).json({ error: "Error fetching employees" });
    }
  },
  // http://localhost:3000/api/v1/employees/1
  // http://localhost:3000/api/v1/employees/1?includeOrders=true
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { includeOrders } = req.query;
      const includeOptions = includeOrders === "true" ? { orders: true } : {};
      const employees = await queries.findById(
        "employees",
        Number(id),
        includeOptions
      );
      if (!employees) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.status(200).send(employees);
    } catch (error) {
      console.log(`Error fetching employee: ${error.message}`);
      res.status(500).json({ error: "Error fetching employee" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const employees = await queries.create("employees", data);
      res.status(201).json(employees);
    } catch (error) {
      console.log(`Error creating employee: ${error.message}`);
      res.status(500).json({ error: "Error creating employees" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid employee ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const employees = await queries.update("employees", Number(id), data);

      console.log("Updating employee with ID:", id, "Data:", data);

      if (!employees) {
        return res.status(404).json({ error: "Employee not found" });
      }

      res.status(200).json(employees);
    } catch (error) {
      console.error(`Error updating employee: ${error.message}`);
      res.status(500).json({ error: "Error updating employee" });
    }
  },
  async count(req, res) {
    try {
      const count = await queries.count("employees");
      res.status(200).json({ total: count });
    } catch (error) {
      console.log("Error in counting employees: ", error);
      res
        .status(500)
        .json({ error: `Error counting employees: ${error.message}` });
    }
  },
  //-------------
  async deactivate(req, res) {
    try {
      const { id } = req.params;
      const employees = await queries.deactivate("employees", Number(id));
      res
        .status(200)
        .json({ message: `Successfully disabled employees`, employees });
    } catch (error) {
      console.log(("Error deactivating employees:", error));
      res.status(500).json({ error: "Error deactivating employees" });
    }
  },

  async activate(req, res) {
    try {
      const { id } = req.params;
      const employees = await queries.activate("employees", Number(id));
      res
        .status(200)
        .json({ message: `Successfully activating employees`, employees });
    } catch (error) {
      console.log(("Error activating employees:", error));
      res.status(500).json({ error: "Error activating employees" });
    }
  },

  async findStatus(req, res) {
    try {
      const { status } = req.query;
      const employees = await queries.findStatus(
        "employees",
        status === "true"
      );
      res.status(200).json(employees);
    } catch (error) {
      console.log("Error fetching employees by status:", error);
      res.status(500).json({ error: "Error fetching employees by status" });
    }
  },
};

module.exports = employeesController;

// const employees = await queries.findMany("employees");:

// Esta línea llama a la función findMany del archivo queries y le pide todos los datos del modelo "employees".
// La función espera (con await) a que la consulta termine antes de seguir.
