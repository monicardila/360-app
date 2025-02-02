const express = require("express");
const authenticate = require("../middleware/authenticate");

const protectedRouter = express.Router();

// Apply the middleware to all routes defined in this file.
protectedRouter.use(authenticate);

protectedRouter.get("/cashier", (req, res) => {
  res.json({ message: `Access granted, Role: ${req.user.role}` });
});

module.exports = protectedRouter;
