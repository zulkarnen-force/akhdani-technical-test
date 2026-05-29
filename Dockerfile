FROM node:24.16 AS base
WORKDIR /app

FROM base AS deps-dev
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install

FROM base AS dev
COPY --from=deps-dev /app/node_modules /app/node_modules
COPY . .
CMD ["npm", "run", "dev"]