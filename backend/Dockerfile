# Dockerfile para el Backend
FROM node:20-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración
COPY package.json package-lock.json ./
RUN npm install

# Copia todo el contenido del backend al contenedor
COPY . .

# Comando para iniciar el servidor
CMD ["node", "server.js"]
