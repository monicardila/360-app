# Usa Node.js para construir la aplicación
FROM node:20 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Construye la aplicación Svelte
RUN npm run build

# Usa una imagen de Nginx para servir el frontend
FROM nginx:alpine

# Copia los archivos generados en `build` a la carpeta de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto del frontend
EXPOSE 80
