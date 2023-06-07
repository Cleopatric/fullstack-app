# Shipments App
![Python](https://img.shields.io/badge/-Python-black?style=flat-square&logo=Python)
![Django Rest Framework](https://img.shields.io/badge/DRF-red?style=flat-square&logo=Django)
![React](https://img.shields.io/badge/-React-%232c3e50?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Postgresql](https://img.shields.io/badge/-Postgresql-%232c3e50?style=flat-square&logo=Postgresql)
![Redis](https://img.shields.io/badge/-Redis-FCA121?style=flat-square&logo=Redis)
![Docker](https://img.shields.io/badge/-Docker-46a2f1?style=flat-square&logo=docker&logoColor=white)

### Backend setup

1. Install requirements:

    ```sh
     pip install -r requirements.txt
    ```
 
2. Set .env 

    ```sh
    ### BASE  #################################
    SECRET_KEY=<YOU-SECRET-KEY>
    APP_ENVIRONMENT=LOCAL
    SERVER_PORT=8000
    DEBUG=True
   
    ### POSTGRES  #############################
    POSTGRES_PASSWORD=admin
    POSTGRES_USER=admin
    POSTGRES_DB=shipments
    POSTGRES_PORT=5432
    POSTGRES_HOST=127.0.0.1
   
    #### REDIS ##############################
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379
    REDIS_DATABASE=1
    REDIS_LOCATION=redis://127.0.0.1:6379/1
    ```

3. Run postgres and redis:

    ```sh
    make start
    ```

4. Run django migrations

    ```sh
    cd server/
    python manage.py migrate
    ```

5. Run server

    ```sh
    python manage.py runserver
    ```

6. Run tests

    ```sh
    python manage.py test shipments
    ```

### Frontend setup
1. Install requirements:

    ```sh
     npm install
    ```
   
2. Run application:

    ```sh
     npm start
    ```