#!/bin/bash         

# If permissions are required to start the file for a first time: chmod a+x ./start.sh  
clear
echo "Creating the database:"
echo "Please enter the database name or press enter to use the default option - StanislavDB:"
read databaseName
defvalue=StanislavDB
database=${databaseName:-$defvalue}

echo "Please enter your username:"
read username
echo "Please enter your password:"
read password
echo "$database, $username, $password"

cd server

echo "Creating .env file ..."
cat > .env <<- "EOF"
    DB_TYPE = postgres
    DB_HOST = localhost
    DB_PORT = 5432
    DB_USERNAME = username
    DB_PASSWORD = password
    DB_DATABASE_NAME = database
EOF

### maybe try to find a direct way to instert variables into the files on creation instead of using "sed"
sed -i "s/username/$username/g" .env
sed -i "s/password/$password/g" .env
sed -i "s/database/$database/g" .env

echo "Creating ormconfig.json file ..."
cat > ormconfig.json <<- "EOF"
    {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "YOUR_DATABASE",
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
EOF

sed -i "s/YOUR_USERNAME/$username/g" ormconfig.json
sed -i "s/YOUR_PASSWORD/$password/g" ormconfig.json
sed -i "s/YOUR_DATABASE/$database/g" ormconfig.json

docker run --name $database -p 5432:5432 -e POSTGRES_PASSWORD=$password -e POSTGRES_USER=$username -d postgres:11.5


docker container start $database

echo "Installing node dependencies ..."
npm i
echo "Running the migrations ..."
npm run typeorm:run

cd ../
echo "Setting up the client ..."
cd client

echo "Installing client dependencies"
npm i

echo ""
echo "Environment setup was successfull"
echo ""
echo "Tips:"
echo "1) to run the server, go the the server folder, open a terminal and type: npm run start"
echo ""
echo "     npm run start"
echo ""
echo "2) to run the client, go the the client folder, open a terminal and type: npm start"
echo ""
echo "     npm start"
echo ""

