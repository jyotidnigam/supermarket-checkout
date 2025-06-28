# Stage 1: Build TS → JS
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npx tsc --pretty

# Stage 2: Run the app
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]