FROM node:18-alpine

WORKDIR /app

# This receives CACHEBUST from docker-compose.yml
ARG CACHEBUST
ENV CACHEBUST=${CACHEBUST}

COPY package*.json ./
COPY vite.config.js ./
RUN npm install

COPY . .

# Vite will rebuild fresh because CACHEBUST changes
RUN npm run build

RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]