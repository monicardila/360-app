# TRES60 🚀

**TRES60** es una aplicación web diseñada para facilitar la gestión de múltiples tareas en un solo lugar. Ofrece funciones como control de roles de usuario, generación de facturas, contacto directo con proveedores, control de ventas, gestión de stock, empleados y aspectos contables. La aplicación está construida utilizando **Svelte**, **HTML**, **CSS** y **Tailwind CSS**.

## 🚧 Requisitos Previos

Antes de poder ejecutar el proyecto, asegúrate de tener instalados los siguientes componentes:

1. **Node.js** (versión 20 o superior) 🌐  
   Puedes descargar e instalar Node.js desde su [página oficial](https://nodejs.org/).

2. **pnpm** 📦  
   pnpm es un gestor de paquetes rápido y eficiente. Para instalar pnpm, ejecuta el siguiente comando en tu terminal:

    ```bash
    npm install -g pnpm
    ```

## 🚀 Instalación y Ejecución

Sigue estos pasos para clonar y ejecutar la aplicación en tu entorno local:

1. **Clona el repositorio** 🌀:

    ```bash
    git clone https://github.com/monicardila/360-app/tree/wip
    cd 360-app
    ```

2. **Instala las dependencias** 📥:

    ```bash
    pnpm install
    ```

3. **Inicia el servidor de desarrollo** 🖥️:

    ```bash
    pnpm dev
    ```

## 📁 Estructura del Proyecto

```plaintext
TRES60/
├── public/          # Archivos públicos, como imágenes y fuentes
├── src/             # Código fuente de la aplicación
│   ├── lib/         # Componentes reutilizables
│   ├── routes/      # Rutas y páginas principales
│   ├── styles/      # Archivos de estilo (CSS/Tailwind)
│   └── +page.svelte # Archivo principal de la página de inicio
├── package.json     # Dependencias y scripts del proyecto
└── tailwind.config.js # Configuración de Tailwind CSS
```

## ✨ Características

-   **Gestión de usuarios** 👥
-   **Control de ventas y stock** 📊
-   **Integración con proveedores** 🛒
-   **Generación de informes y facturas** 🧾
