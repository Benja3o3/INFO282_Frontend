
## STAGE 1
FROM node:lts-bullseye as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

## STAGE 2
FROM nginx:alpine
ADD ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


