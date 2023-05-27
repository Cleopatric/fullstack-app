FROM python:3.8
RUN apt-get update
RUN apt-get install python3-dev default-libmysqlclient-dev  -y libmemcached-dev zlib1g-dev

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install requests
RUN pip install -r requirements.txt

COPY ./server /app
WORKDIR /app

