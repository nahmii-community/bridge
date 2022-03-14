# Build stage
FROM node:16-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Final image
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]