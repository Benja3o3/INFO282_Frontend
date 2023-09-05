FROM node:lts-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm install --silent && \
    npm cache clean --force && \
    rm -rf /tmp/* /var/tmp/* /usr/share/man /tmp/* /var/tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp
COPY . .
RUN npm run build


EXPOSE 4051
CMD ["npm", "run", "dev"]
