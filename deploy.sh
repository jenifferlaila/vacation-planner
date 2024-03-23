#!/bin/bash

# quit on error
set -e

SERVER_IP=$1

if [[ -z $SERVER_IP ]];
then
    echo "Run this script again with your server IPv4 address as arg"
    exit 1
fi

bash ./api/deploy.sh $SERVER_IP
bash ./client/deploy.sh $SERVER_IP
