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
        echo "[$(date)] Starting loc server"
        docker-compose -f local/docker-compose.yaml up -d
        docker ps
        touch scripts/start.sh
    elif [ ${APP_ENVIRONMENT} = "STAGE" ]
    then
        cd build
        echo "[$(date)] Starting stage server"
        docker-compose -f stage/docker-compose.yaml up -d
        docker ps
        echo "[$(date)] Server running at http://localhost:${SERVER_PORT}"
        touch scripts/start.sh
    else
        echo "[$(date)] !!!ERROR!!! [APP_ENVIRONMENT] invalid value"
        exit 1
    fi
else
    echo "[$(date)] !!!ERROR!!! .env not found "
    exit 1
fi
