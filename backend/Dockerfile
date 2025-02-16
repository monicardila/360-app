# Usa Node.js 20 como base
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del backend
COPY . .

# Genera las migraciones de Prisma y ejecuta la migración
RUN npx prisma generate

# Expone el puerto del backend
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
