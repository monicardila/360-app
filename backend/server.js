require("dotenv").config();
const prisma = require("./src/utils/prismaClient");
const express = require("express");
const cors = require("cors"); // Imports CORS middleware
const { PORT } = require("./config");
const cookieParser = require("cookie-parser");
const routerAuth = require("./src/routes/auth");
const protectedRoutes = require("./src/routes/protectedRoutes");
const authenticate = require("./src/middleware/authenticate");

const employeesRoutes = require("./src/routes/employeesRoutes");
const supplierRoutes = require("./src/routes/supplierRoutes");
const customersRoutes = require("./src/routes/customersRoutes");
const productsRoutes = require("./src/routes/productsRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const branchStoreRoutes = require("./src/routes/branchStoreRoutes");
const ordersRoutes = require("./src/routes/ordersRoutes");
const customerInvoiceRoutes = require("./src/routes/customerInvoiceRoutes");
const supplierInvoiceRoutes = require("./src/routes/supplierInvoicesRoutes");
const invoiceContentSupplierRoutes = require("./src/routes/invoiceContentSupplierRoutes");
const invoiceContentCustomerRoutes = require("./src/routes/invoiceContentCustomerRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const cartItemRoutes = require("./src/routes/cartItemRoutes");
const salesRoutes = require("./src/routes/salesRoutes");

// specific configuration CORS
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions)); // Aplica las opciones CORS en todas las rutas
app.use(express.json());
app.use(cookieParser());

// Route general
app.get("/", (req, res) => {
  res.send("principal");
});

// Routes models
app.use("/api/v1/invoiceContentCustomer", invoiceContentCustomerRoutes); //ok
app.use("/api/v1/invoiceContentSupplier", invoiceContentSupplierRoutes); //ok
app.use("/api/v1/supplierInvoices", supplierInvoiceRoutes); //ok
app.use("/api/v1/customerInvoice", customerInvoiceRoutes); //ok
app.use("/api/v1/orders", ordersRoutes); //ok
app.use("/api/v1/branchStore", branchStoreRoutes); //ok
app.use("/api/v1/category", categoryRoutes); //ok
app.use("/api/v1/products", productsRoutes); //ok
app.use("/api/v1/customers", customersRoutes); //ok
app.use("/api/v1/employees", employeesRoutes); //ok
app.use("/api/v1/suppliers", supplierRoutes); //ok
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/cartItem", cartItemRoutes);
app.use("/api/v1/sales", salesRoutes);

// Routes authentication
app.use("/api/v1/auth", routerAuth);

// Routes protected
//app.use("/app/protected", authenticate(["user"]), protectedRoutes);

app.use((req, res, next) => {
  console.log("Incoming request body:", req.body);
  next();
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
