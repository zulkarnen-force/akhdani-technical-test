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

FROM base AS deps-prod
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --only=production

FROM base AS build
COPY --from=deps-prod /app/node_modules /app/node_modules
COPY . .
RUN npm run build

FROM base AS prod
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/prisma /app/prisma
EXPOSE 3000
CMD ["npm", "start"]