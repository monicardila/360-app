📦 TRES60 - Sistema de Inventarios

TRES60 es un proyecto personal diseñado para facilitar el control de inventarios y la gestión sistemática de productos, proveedores y clientes de manera eficiente. Es una aplicación web moderna que permite administrar el inventario en tiempo real mediante una interfaz intuitiva y robusta. 🚀

🛠️ Tecnologías Utilizadas

Este proyecto está desarrollado con las siguientes tecnologías:

🖥️ Frontend: Svelte + Vite

⚙️ Backend: Node.js con Prisma

🛢️ Base de Datos: PostgreSQL

🐳 Contenedores: Docker

🎨 Estilos: Tailwind CSS

🔧 Lenguajes: JavaScript

📥 Instalación y Configuración

Para ejecutar el proyecto en tu entorno local, sigue estos pasos:

📌 1. Clonar el Repositorio

git clone https://github.com/monicardila/360-app.git
cd tu-repositorio

📌 2. Instalar Dependencias

🔹 Backend

cd backend
npm install

🔹 Frontend

cd frontend
npm install

📌 3. Configurar la Base de Datos

Asegúrate de tener Docker instalado y ejecuta:

docker-compose up -d

Esto iniciará un contenedor con PostgreSQL y la base de datos configurada.

📌 4. Configurar Variables de Entorno

Crea un archivo .env en la carpeta backend y agrega:

DATABASE_URL="postgresql://admin:admin@localhost:5432/tres60?schema=public"

📌 5. Ejecutar la Aplicación

🔹 Backend

cd backend
pnpm dev

🔹 Frontend

cd frontend
pnpm dev

La aplicación estará disponible en http://localhost:5173/.

🎯 Funcionalidades Principales

📊 Gestión de Inventarios: Control de productos, stock y proveedores.

🧑‍💼 Manejo de Clientes y Usuarios: Registro y administración de clientes.

📑 Facturación: Generación y control de facturas de compra y venta.

📈 Reportes y Análisis: Visualización de datos para toma de decisiones.

🤝 Contribuciones

Si quieres contribuir al proyecto, ¡eres bienvenido! Abre un issue o envía un pull request con mejoras.

📜 Licencia

Este proyecto está bajo la licencia MIT.

# TRES60 - Aplicación Web de Inventario

Bienvenido/a a TRES60, una solución integral para el manejo de inventario, facturación, usuarios, y más.

---

## 🚀 Requisitos

- Tener instalado [Docker](https://www.docker.com/products/docker-desktop)
- Tener instalado [Git](https://git-scm.com/)

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/monicardila/360-app
   cd 360
   ```
