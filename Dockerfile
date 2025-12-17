# Build stage
FROM node:20 AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copy source code
COPY . .

# FAST BUILD - Just disable optimization
RUN npm run build -- \
    --output-path=dist \
    --optimization=false

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist/Sales-invoice-management/browser /usr/share/nginx/html/

# Configure nginx for Angular routing
RUN echo 'server { \
    listen 4200; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
