FROM node:20 AS build

WORKDIR /app
COPY package.json package-lock.json ./

# Instalación limpia
RUN npm ci --omit=dev

# Copia el código y el prisma schema
COPY . .

# Genera el cliente de Prisma para Linux
RUN npx prisma generate

# Reconstruye bcrypt si usas
RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000
CMD ["node", "server.js"]
