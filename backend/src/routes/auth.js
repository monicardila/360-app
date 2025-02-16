// authStore.js
// register svelte
// login svelte

const express = require("express");
const bcrypt = require("bcrypt"); // to protect passwords
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prismaClient");

const routerAuth = express.Router();
const { SECRET_JWT_KEY } = require("../../config");

// WORKS
routerAuth.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10); // A salt is a random value that is added to a password before it is encrypted.
  const hashedPassword = await bcrypt.hash(req.body.password, salt); // create an irreversible representation of the password

  const { name, email, password, role, brand } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        //brand,
      },
    });

    // mirar para que en la bd no aparezca la password

    res
      .status(201)
      .json({ message: "User successfully registered.", userInfo: user });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// EXAMPLE REGISTRATION

// {
//   "name": "alexandra",
//   "email": "a@b.com",
//   "password": "ab",
//  " role":  "user"
// }

// r/
// {
//   "message": "User successfully registered.",
//   "userInfo": {
//       "id": 9,
//       "company_id": null,
//       "name": "alexandra",
//       "email": "a@b.com",
//       "password": "$2b$10$Kx2kkPZU4RuP.n6NTtSe0u7EtiL0vbUA4GoS/rXwsMSWG8OFoMD1y",
//       "role": "user",
//       "brand": null,
//       "createdAt": "2025-01-19T16:31:56.077Z"
//   }
// }

routerAuth.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found AUTH.JS" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_JWT_KEY, {
      expiresIn: "24h",
    });

    ////////////////////

    //res.send(token); // example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzczMjUwNTQsImV4cCI6MTczNzMyODY1NH0.u3qUW-nwKeZPhNN2LDpA-dTRUYyBd-jJ4NnXWmhZUxU

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Cambiar a false en localhost
      //secure: process.env.NODE_ENV === "production", // solo en producción
      sameSite: "Strict", // O "Lax", dependiendo de tu caso
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    // decodificar el token para acceder al role
    const decodedToken = jwt.decode(token);
    console.log("Role del token: ", decodedToken.role);
    console.log("Role del token: ", token);

    res.json({ message: "Login successfully", role: user.role, token: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error logging in AUTH.JS" });
  }
});

// EXAMPLE LOGIN
// {
//   "email": "a@b.com",
//   "password": "ab"
// }

// r/

// {
//   "message": "Login successfully",
//   "rol": "user"
// }

routerAuth.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies["token"];

    const claims = jwt.verify(cookie, SECRET_JWT_KEY);

    if (!claims) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const user = await prisma.users.findUnique({ where: { id: claims.id } });

    const { password, ...data } = user; // Excluye la contraseña de los datos retornados

    res.send(data); // it return the same cookie as the login with the same credentials
  } catch (error) {
    return res.status(401).send({ message: "Unauthenticated catch" });
  }
});

routerAuth.post("/logout", (req, res) => {
  res.cookie("token", "", {
    maxAge: 0, // Elimina la cookie inmediatamente.
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción.
    sameSite: "lax", // Opcional, para evitar problemas con solicitudes entre dominios.
  });

  res.send({ message: "Logout..." });
});

module.exports = routerAuth;

// Middleware to protect routes

// const authenticate = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ error: "No authorized" });
//   }
//   try {
//     const decoded = jwt.verify(token, SECRET_JWT_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

//---------EXPLICACION--------

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
