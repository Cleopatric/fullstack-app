#!/usr/bin/env bash

if [ -f '.env' ]
then
    export $(egrep -v '^#' .env | xargs)

    if [ -z ${APP_ENVIRONMENT} ]
    then
        echo "[$(date)] !!!ERROR!!! [APP_ENVIRONMENT] not found"
        exit 1
    fi

    if [ ${APP_ENVIRONMENT} = "STAGE" ]
    then
        cd build
        echo "[$(date)] Creating admin"
        docker exec -it stage-web python manage.py createsuperuser
        echo "[$(date)] [ADMIN CREATED]"
        touch scripts/create_admin.sh
    else
        echo "[$(date)] !!!ERROR!!! [APP_ENVIRONMENT] invalid value"
        exit 1
    fi
else
    echo "[$(date)] !!!ERROR!!! .env not found "
    exit 1
fi
