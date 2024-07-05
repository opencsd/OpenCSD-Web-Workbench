FROM python:3.8-slim

WORKDIR /main

COPY main.py /main
COPY favicon.ico /main
COPY templates /main/templates
COPY static /main/static
COPY routes /main/routes
COPY connectDB /main/connectDB
COPY tpc-h /main/tpc-h

RUN pip3 install --upgrade pip && \
    pip3 install Flask requests flask-cors influxdb pymysql prettytable

CMD ["python", "main.py"]