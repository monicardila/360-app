# Etapa de construcción
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa de producción
FROM node:20

WORKDIR /app
COPY --from=build /app ./
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "build"]
