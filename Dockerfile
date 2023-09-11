FROM node:20

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install --include=dev 

COPY . .

COPY ./books-schema.sql ./docker-entrypoint-initdb.d/

EXPOSE 3791 

EXPOSE 5432

CMD ["npm","run","dev"]