#!/bin/bash

docker kill vacation
docker rm vacation

docker run -d -p 3001:3001 --name vacation vacation-planner-api:latest
