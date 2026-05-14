# Image de base légère
FROM node:18-alpine

# Création du dossier de travail
WORKDIR /app

# Installation des dépendances (séparé pour optimiser le cache Docker)
COPY package*.json ./
RUN npm install --production

# Copie du reste du code
COPY . .

# Exposer le port du backend
EXPOSE 5000

# Lancer l'application
CMD ["node", "index.js"]