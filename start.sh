#!/bin/bash         

clear
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

# docker run --name $database -p 5432:5432 -e POSTGRES_PASSWORD=$password -e POSTGRES_USER=$username -d postgres:11.5
# Need to uncomment the previous line and also make sure that i can always take the latest id
# Why are permission required to start the file for a first time??? 1) pwd 2)chmod a+x /home/strifonov/React_Play/BASH/test.sh  


docker container start a42c9a5b0b229ba786dbb526d8adbff3fd124eac99a40ca2df03d2e858b606a7

npm i

npm run typeorm:run

npm run seed

# every time you run the bash script the seed executes. How to avoid that?

cd ../

cd client

npm i




