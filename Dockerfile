FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

RUN npm install -g serve

EXPOSE 4200

# Utiliser le bon nom avec majuscule
CMD ["serve", "-s", "dist/Sales-invoice-management/browser", "-l", "4200"]
