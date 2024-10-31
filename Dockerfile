FROM python:3.8-slim

WORKDIR /opencsd-web-workbench

COPY main.py /opencsd-web-workbench
COPY favicon.ico /opencsd-web-workbench
COPY templates /opencsd-web-workbench/templates
COPY static /opencsd-web-workbench/static
COPY routes /opencsd-web-workbench/routes
COPY connectDB /opencsd-web-workbench/connectDB
COPY tpc-h /opencsd-web-workbench/tpc-h

RUN pip3 install --upgrade pip && \
    pip3 install Flask requests flask-cors influxdb pymysql prettytable

CMD ["python3", "main.py"]