# Imagen base
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos necesarios
COPY package.json package-lock.json* ./
RUN npm install

# Copiar el resto del código
COPY . .

# Define las variables de entorno en build-time

ENV VITE_API_URL="https://test4-553546572170.us-east1.run.app"

# Construir con Vite
RUN npm run build

# Imagen final ligera
FROM node:18-alpine
WORKDIR /app

# Copiar archivos de la build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto correcto para Google Cloud Run
ENV PORT=8080
EXPOSE 8080

# Usar serve para servir la build
CMD ["npx", "serve", "-s", "dist", "-l", "8080"]
