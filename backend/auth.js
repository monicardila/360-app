// authStore.js
// register svelte
// login svelte

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("./src/utils/prismaClient");

const router = express.Router();
const app = express();
const { SECRET_JWT_KEY } = require("./config");

app.use(express.json());

router.post("/register", async (req, res) => {
  const { name, email, password, role, brand } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        brand,
      },
    });

    res.status(201).json({ message: "User successfully registered.", user });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user || (await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials auth" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_JWT_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only HTTPS in production
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});
// Middleware to protect routes

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No authorized" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { router, authenticate };

// const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña.
// const isValid = await bcrypt.compare(password, user.password); // Compara la contraseña ingresada.

// Flujo completo
// Registro (/api/register):

// El usuario se registra y su contraseña se hashea antes de almacenarla.
// Inicio de sesión (/api/login):

// Se verifica la contraseña ingresada (comparándola con la versión hasheada).
// Si es correcta, se genera un token JWT y se guarda en las cookies del cliente.
// Rutas protegidas:

// El cliente incluye automáticamente las cookies con el token al hacer una solicitud.
// El middleware verifica si el token es válido antes de procesar la solicitud.
// Sin este paso, cualquier solicitud sería tratada como válida, lo que expondría rutas protegidas a usuarios no autenticados.

//------- SECURITY CODE -------------------

// const generateSecurityCode = () => Math.floor(100000 + Math.random() * 900000); // Genera un número aleatorio de 6 dígitos

// let securityCode = generateSecurityCode(); // Código global (puedes almacenarlo en una base de datos para mayor seguridad)

// // Ruta para obtener el código de seguridad
// router.get("/security-code", (req, res) => {
//   res.json({ securityCode });
// });

// // Modificar la lógica del registro
// router.post("/register", async (req, res) => {
//   const { name, email, password, role, code } = req.body;

//   try {
//     if (!name || !email || !password || !code) {
//       return res.status(400).json({ error: "Todos los campos son requeridos" });
//     }

//     // Validar el código de seguridad
//     if (parseInt(code) !== securityCode) {
//       return res.status(400).json({ error: "Código de seguridad incorrecto" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.supplier.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         role: role || "user",
//       },
//     });

//     securityCode = generateSecurityCode(); // Regenera un nuevo código después del registro

//     res.status(201).json({ message: "Usuario registrado exitosamente.", user });
//   } catch (error) {
//     res.status(500).json({ error: "Error al registrar usuario" });
//   }
// });
