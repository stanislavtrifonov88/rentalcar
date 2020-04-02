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

# docker run --name $database -p 5432:5432 -e POSTGRES_PASSWORD=$password -e POSTGRES_USER=$username -d postgres:11.5
# Need to uncomment the previous line and also make sure that i can always take the latest
# Why are permission required to start the file for a first time??? 1) pwd 2)chmod a+x /home/strifonov/React_Play/BASH/test.sh  

docker container start a42c9a5b0b229ba786dbb526d8adbff3fd124eac99a40ca2df03d2e858b606a7

cd server

