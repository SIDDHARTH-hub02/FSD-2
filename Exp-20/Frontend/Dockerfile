# Build stage with testing
FROM node:20 as test

WORKDIR /app

COPY package*.json ./

RUN npm ci --verbose

COPY . .

RUN npm run test -- run

# Production stage
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci --verbose

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
