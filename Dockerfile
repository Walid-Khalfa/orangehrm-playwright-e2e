# syntax=docker/dockerfile:1.4

FROM node:22-alpine

# Dépendances système essentielles pour Playwright
RUN apk add --no-cache \
    ca-certificates \
    dumb-init \
    git \
    chromium \
    nss-tools \
    unzip \
    wget \
    curl

# Définir le répertoire de travail pour l'application
WORKDIR /app

# Installer les dépendances principales via les fichiers npm
COPY package*.json ./
RUN npm ci

# Copier tous les autres fichiers de code source dans l'image
COPY . .

# Commande d'exécution par défaut pour exécuter les tests Playwright
CMD ["dumb-init", "npx", "playwright", "test"]
