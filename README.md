# Car Rental Platform

### Project Description
A platform which allows an office worker at a car rental company to make new contracts and return borrowed cars

### Getting Started
***
The instructions below will get you a copy of the project and allow you to run it on your local machine for development and testing purposes.

1. First clone this repository to your local machine. If you are not familiar with the process, please refer tо [github's instructions](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) on the topic.

2. For this project, we need to create a database with a docker and Postgres. If you already have a docker engine installed, you can directly continue with the process guidlines below. Otherwise, please follow the [official documentation](https://docs.docker.com/install/linux/docker-ce/ubuntu/) for your operating system and get familiar with [postgres in docker images](https://hub.docker.com/_/postgres).

3. We recommend you to follow the Automated Process Guidline below. If you would like to set everything yourself, you can refer to the Manual Process Guidline.

### Automated Process Guidline

1. Open a terminal in the root directory (folder rentalcar).

2. Run the following command: `./start.sh`

### Manual Process Guidline

#### Server

1. Open the terminal and create a new docker image with the command below for Linux. In the command you can customize three things: the name of the image by changing `custom_postgres`, the password and username which are currently set to `atscale`. Please note that you will need them in steps 6 and 7.

```
    docker run --name custom_postgres -p 5432:5432 -e POSTGRES_PASSWORD=atscale -e POSTGRES_USER=atscale -d postgres:11.5
```

2. You will need to start the image. Please repeat the command every time the computer is restarted.
```
    docker container start addImageIdHere
```

3. After the repository is successfully cloned (step 1), navigate to the server folder.

4. In the server folder, create .env file. It contains sensitive data about your server. In the .env file, you can set your username, password and database name by changing `YOUR_USERNAME`, `YOUR_PASSWORD` and `public` in the example below. They should match the ones you chose in step 3.

```
    DB_TYPE = postgres
    DB_HOST = localhost
    DB_PORT = 5432
    DB_USERNAME = YOUR_USERNAME
    DB_PASSWORD = YOUR_PASSWORD
    DB_DATABASE_NAME = public
```

5. Still in the server folder, create ormconfig.json file. As with the .env file before, you can set your username, password and database name. They should match the ones you chose in step 3.

```
    {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "postgres",
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
```

6. Open the terminal or bash in the server folder and run the following commands in the same order:
```JavaScript
npm install
npm run typeorm:run // runs the migration to the database
npm run seed // it will enter basic data in the database
npm run start // it will start the server
```

### Client

Having successfully run the server, you can run the application:


1. Navigate to the client folder

2. Open the terminal there and run the following commands:
```JavaScript
npm install
npm start
```

### Testing (Server)
In order to run the tests on the server, navigate to the server folder and run the command below:
`npm test`

### Testing (Client)
Navigate to the client folder and run he following command:
`npm test`

### Testing (Nightwatch)
Navigate to the client folder and run he following command:
`./node_modules/.bin/nightwatch tests/nightwatchTest.js`

***

### Technologies

* React
* NestJS
* TypeORM
* Nightwatch


### Authors and Contributors

Stanislav Trifonov


### License
This project is licensed under the MIT License
