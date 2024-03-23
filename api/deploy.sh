#!/bin/bash

# quit on error
set -e

SERVER_IP=$1

if [[ -z $SERVER_IP ]];
then
    echo "Run this script again with your server IPv4 address as arg"
    exit 1
fi

PAYLOAD_DIR="./dist"
ROUTINE_SCRIPT="routine.sh"

TAG="latest"
PREFIX="vacation-planner-api"
FILENAME="$PREFIX:$TAG.tar"

LOG_PREFIX="[SCRIPT (API)] >"
SERVER_SERVICES_DIR="/var/web-services"
SERVER_TARGET_DIR="root@$SERVER_IP:$SERVER_SERVICES_DIR/$PREFIX"

echo "$LOG_PREFIX Starting build..."
docker build . --label $PREFIX --tag "$PREFIX:$TAG"

echo "$LOG_PREFIX Saving image..."
docker save --output=$FILENAME $PREFIX

if [[ -d $PAYLOAD_DIR ]];
then
    echo "$LOG_PREFIX Removing workdir..."
    rm -rf $PAYLOAD_DIR
fi

mkdir $PAYLOAD_DIR

echo "$LOG_PREFIX Moving image file and routine script..."
mv $FILENAME $PAYLOAD_DIR
cp $ROUTINE_SCRIPT $PAYLOAD_DIR

echo "$LOG_PREFIX Files will be sent over SSH to server in 2 seconds..."
sleep 2
scp $PAYLOAD_DIR/* $SERVER_TARGET_DIR
