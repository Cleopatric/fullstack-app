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
        echo "[$(date)] START LOGGING"
        docker-compose -f local/docker-compose.yaml logs -f
    elif [ ${APP_ENVIRONMENT} = "STAGE" ]
    then
        cd build
        echo "[$(date)] START LOGGING"
        docker-compose -f stage/docker-compose.yaml logs -f
    else
        echo "[$(date)] !!!ERROR!!! [APP_ENVIRONMENT] invalid value"
        exit 1
    fi
else
    echo "[$(date)] !!!ERROR!!! .env not found "
    exit 1
fi
