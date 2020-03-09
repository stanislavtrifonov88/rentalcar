Car Rental Platform

Project Description
  A platform which allows an office worker at a car rental compnay to make new contracts and return borrwered cars


Getting Started
These instructions will get you a copy of the project and allow you to run it on your local machine for development and testing purposes.

Server
After you clone successfully this repository:


navigate to the api folder


create a database with docker and Postgres. As a defaut name for the db you can use 'car'. https://hub.docker.com/_/postgres

Create a new docker image:
docker run --name custom_postgres -p 5432:5432 -e POSTGRES_PASSWORD=atscale -e POSTGRES_USER=atscale -d postgres:11.5

You may need to start the image:
docker container start addImageIdHere

create .env file at root level- it contains sensitive data about your server. DB_USERNAME and DB_PASSWORD are the ones set by you


DB_TYPE = postgres
 DB_HOST = localhost
 DB_PORT = 5432
 DB_USERNAME = YOUR_USERNAME
 DB_PASSWORD = YOUR_PASSWORD
 DB_DATABASE_NAME = car

create ormconfig.json file at root level

{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "car",
    "synchronize": "false",
    "entities": [
        "src/database/entities/**/*.ts"
    ],
    "migrations": [
        "src/database/migration/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/database/entities",
        "migrationsDir": "src/database/migration"
    }
}


open the terminal or bash at root level and run the following commands:
$ npm install
- to populate the database:
$ npm run typeorm:run 
- runs the migration to the database
$ npm run seed
- it will enter basic data in the database
$ npm run start


Client

Having successfully run the server, you can run the application


navigate to the client folder


open the terminal and run the following commands:
$ npm install
$ npm start


Testing (Server)
$ npm test


Technologies

React
NestJS
TypeORM


Authors and Contributors

Stanislav Trifonov


License
This project is licensed under the MIT License
