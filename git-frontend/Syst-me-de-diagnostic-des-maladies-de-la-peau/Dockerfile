# Utilisez une image de base avec Node.js
FROM node:18

# Créez un répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tous les fichiers de l'application dans le conteneur
COPY . .

# Build de l'application React.js
RUN npm run build

# Port que l'application React.js écoute
EXPOSE 3000

# Commande pour exécuter l'application au démarrage du conteneur
CMD ["npm", "start"]
