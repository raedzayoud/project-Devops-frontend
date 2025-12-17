FROM node:20 AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installation avec gestion des erreurs
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build -- --configuration production

# Stage de production
FROM node:20-alpine
WORKDIR /app

# Copier les fichiers buildés
COPY --from=builder /app/dist ./dist

# Installer serve globalement
RUN npm install -g serve

EXPOSE 4200

# Démarrer l'application
CMD ["serve", "-s", "dist/Sales-invoice-management/browser", "-l", "4200"]
