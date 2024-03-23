#!/bin/bash

# quit on error
set -e

SERVER_IP=$1

if [[ -z $SERVER_IP ]];
then
    echo "Run this script again with your server IPv4 address as arg"
    exit 1
fi

TARGET_HOST="jenifferlaila.dev"
APP_PREFIX="vacation-planner"
LOG_PREFIX="[SCRIPT (CLIENT)] >"
PAYLOAD_DIR="./dist"

echo "$LOG_PREFIX Installing dependencies..."
npm i

if [[ -d $PAYLOAD_DIR ]];
then
    echo "$LOG_PREFIX Removing build..."
    rm -rf $PAYLOAD_DIR
fi

echo "$LOG_PREFIX Starting build in 2 seconds..."
sleep 2
npm run build

echo "$LOG_PREFIX Starting build in 2 seconds..."
sleep 2
scp -r "$PAYLOAD_DIR"/* "root@$SERVER_IP:/var/www/$APP_PREFIX.$TARGET_HOST"
