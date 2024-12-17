FROM node:20-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos del proyecto al contenedor
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia los archivos del proyecto al contenedor
COPY . .

# Compila Prisma
RUN npm run build

# Expone el puerto donde correra el backend
EXPOSE 5174

# Comando de inicio para iniciar un servidor local que sirva la aplicación compilada
CMD ["npm", "run", "preview"]