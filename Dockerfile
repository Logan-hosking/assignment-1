FROM node:24-bookworm-slim

WORKDIR /app

ENV DATABASE_URL="file:./prisma/dev.db"

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]