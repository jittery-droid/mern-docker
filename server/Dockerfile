FROM node:10.16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN ls
RUN npm ci
COPY . .
RUN ls
EXPOSE 8080
CMD ["npm","start"]