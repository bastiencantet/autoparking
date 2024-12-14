# Utiliser une image Node.js officielle comme base
FROM node:22-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# install ts-node
RUN npm install -g ts-node

RUN npm install

# Copier le reste du code dans le conteneur
COPY . .

# Exposer le port WebSocket sur lequel le serveur écoute
EXPOSE 8080

# Commande pour démarrer le serveur WebSocket
CMD ["ts-node", "index.ts"]
