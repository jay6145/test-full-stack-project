FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# use a simple web server for the static build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]