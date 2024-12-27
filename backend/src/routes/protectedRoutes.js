const express = require("express");
const { authenticate } = require("../../auth");

const protectedRouter = express.Router();

// Apply the middleware to all routes defined in this file.
protectedRouter.use(authenticate);

// protectedRouter.get("/app/dashboard", (req, res) => {
//   res.json({ message: `Access granted, Rol: ${req.user.role}` });
// });

module.exports = protectedRouter;
