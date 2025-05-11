# Build step
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve built files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Add custom nginx config if needed
EXPOSE 80
