# syntax=docker/dockerfile:1.4

FROM node:22-alpine

# Installation des dépendances du système nécessaires pour Playwright
RUN apk add --no-cache \
    ca-certificates \
    dumb-init \
    git \
    chromium \
    nss-tools \
    # Ajoutez d'autres dépendances du système si nécessaire
;

# Installation des navigateurs pour Chromium via le système de paquets (solution plus stable)
RUN apk add --no-cache wget gnupg unzip

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 playwright && \
    adduser -D -u 1001 -G playwright playwright

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances (y compris devDependencies pour les tests)
RUN npm ci --only=production

# Installer les navigateurs et les dépendances système de Playwright
RUN npx playwright install --with-deps

# Installer toutes les dépendances (y compris dev pour les tests)
RUN npm ci

# Configurer npm pour utiliser chromium installé via le système de paquets
ENV CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium
ENV PLAYWRIGHT_BROWSERS_PATH=/usr/local/lib/node_modules/@playwright/test/lib

# Copier le reste du code source
COPY . .

# Changer la propriété des fichiers pour l'utilisateur non-root
RUN chown -R playwright:playwright /app

# Passer à l'utilisateur non-root
USER playwright

# Commande par défaut pour exécuter les tests
CMD ["dumb-init", "npx", "playwright", "test"]
