FROM node:20-alpine

WORKDIR /app

# Dépendances d'abord (cache Docker)
COPY package*.json ./
RUN npm install

# Code
COPY . .

EXPOSE 3000

# En dev, docker-compose surcharge avec `npm run dev` (nodemon)
CMD ["npm", "start"]
