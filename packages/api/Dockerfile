FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

EXPOSE 3001

CMD ["pnpm", "dev"]
