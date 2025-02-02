// const jwt = require("jsonwebtoken");
// const { SECRET_JWT_KEY } = require("../../config");

// const authenticate = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ error: "NO authorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_JWT_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalided token" });
//   }
// };

// module.exports = authenticate;

const jwt = require("jsonwebtoken");
const { SECRET_JWT_KEY } = require("../../config");

const authenticate = (allowedRoles = []) => {
  return (req, res, next) => {
    const token = req.cookies?.token; // Leer el token de las cookies
    if (!token) {
      return res.status(401).json({ error: "Not authorized" });
    }

    try {
      const decoded = jwt.verify(token, SECRET_JWT_KEY);
      req.user = decoded;

      // Verificar si el usuario tiene un rol permitido
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: "Access denied" }); // Forbidden
      }

      next(); // Pasar al siguiente middleware o controlador
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};

module.exports = authenticate;

// Token JWT (JSON Web Token)

// Propósito: Autenticar y transportar información entre el servidor y el cliente de forma segura.
// Cómo funciona:
// El servidor genera un token firmado usando una clave secreta (SECRET_JWT_KEY).
// El token contiene información codificada (como el ID del usuario, el rol, o cualquier otro dato relevante).
// El cliente almacena el token (por ejemplo, en una cookie o en localStorage) y lo envía con cada solicitud.
// El servidor valida el token usando la clave secreta para asegurarse de que no ha sido alterado.
// Características:
// Reversible: Puede decodificarse para leer la información que contiene (aunque solo el servidor puede verificar su validez).
// Uso en autenticación: Transporta información del usuario para permitir acceso a recursos protegidos.
