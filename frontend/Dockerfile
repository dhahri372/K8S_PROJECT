# Étape 1 : Construction de l'app React
FROM node:18-alpine as build
WORKDIR /app

# On copie les fichiers de dépendances
COPY package*.json ./

# CONFIGURATION ROBUSTE POUR NPM
# 1. On augmente le timeout (600s)
# 2. On augmente le nombre de tentatives (5)
# 3. On ajoute une sécurité : si npm install échoue, on attend 10s et on réessaie une fois
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retries 5 && \
    (npm install || (sleep 10 && npm install))

COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine
# L'image nginx:alpine est déjà dans ton cache local maintenant !
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]