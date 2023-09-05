FROM node:18.17.1

WORKDIR /app

EXPOSE 4051

COPY package.json package-lock.json ./
RUN npm install --silent
COPY . ./

CMD ["npm","run","dev"]



