FROM node:18-alpine

WORKDIR /app
ARG CACHEBUST=1

COPY package*.json ./
COPY vite.config.js ./
RUN npm install
COPY . .
RUN npm run build

RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]