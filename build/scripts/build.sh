#!/usr/bin/env bash

if [ -f '.env' ]
then
    export $(egrep -v '^#' .env | xargs)

    if [ -z ${APP_ENVIRONMENT} ]
    then
        echo "[$(date)] !!!ERROR!!! [APP_ENVIRONMENT] not found"
        exit 1
    fi

    if [ ${APP_ENVIRONMENT} = "LOCAL" ]
    then
        cd build
        echo "[$(date)] Stopping2 containers"
        docker-compose -f local/docker-compose.yaml stop
        echo "[$(date)] Removing containers"
        docker-compose -f local/docker-compose.yaml  rm -f
        echo "[$(date)] Builds containers"
        docker-compose -f local/docker-compose.yaml  build
       echo "[$(date)] Starting containers and execute migrations"
       docker-compose -f local/docker-compose.yaml  up -d
       echo "[$(date)] Stopping containers"
       docker-compose -f local/docker-compose.yaml  stop
        echo "[$(date)] [BUILD SUCCESS]"
    elif [ ${APP_ENVIRONMENT} = "STAGE" ]
    then
        cd build
        echo "[$(date)] Stopping2 containers"
        docker-compose -f stage/docker-compose.yaml stop
        echo "[$(date)] Removing containers"
        docker-compose -f stage/docker-compose.yaml rm -f
        echo "[$(date)] Builds containers"
        docker-compose -f stage/docker-compose.yaml  build
       echo "[$(date)] Starting containers and execute migrations"
       docker-compose -f stage/docker-compose.yaml up
       echo "[$(date)] Stopping containers"
       docker-compose -f stage/docker-compose.yaml  stop
        echo "[$(date)] [BUILD SUCCESS]"
    else
        echo "[$(date)] !!!ERROR!!! [APP_ENVIRONMENT] invalid value"
        exit 1
    fi
else
    echo "[$(date)] !!!ERROR!!! .env not found "
    exit 1
fi
