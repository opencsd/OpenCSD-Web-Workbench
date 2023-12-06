<<<<<<< HEAD
from influxdb import InfluxDBClient
from connectDB import info

# 어느정도의 시간 텀을 가지고 데이터를 추출할지? => 일단 20개로 
def execute_query_influxdb(ip, port, username, password, dbname, query):
=======
# from flask import jsonify
# import json
from influxdb import InfluxDBClient

# 어느정도의 시간 텀을 가지고 데이터를 추출할지? => 일단 20개로 
def query_influxdb(ip, port, username, password, dbname, query):
>>>>>>> hun_branch
    try:
        client = InfluxDBClient(ip, port, username, password, dbname)
        result = client.query(query)
        return list(result)
    
    except Exception as e:
        return f"Error: {str(e)}"
<<<<<<< HEAD
    
def execute_query_influx_management(query_):
    try:
        host=info.MYSQL_DB_HOST
        port=info.MYSQL_DB_PORT
        user=info.MYSQL_DB_USER
        password=info.MYSQL_DB_PASSWORD
        db=info.MYSQL_DB_NAME
        client = InfluxDBClient(host, port, user, password, db)
        result = client.query(query_)
        return result
    
    except Exception as e:
        return f"Error: {str(e)}"
=======

# 사용 예제
# ip = '10.0.4.85'
# port = 30002
# username = 'keti'
# password = 'keti_linux'
# dbname = 'opencsd_management_platform'
# query_str = 'select * from csd2_metric limit 20'

# result = query_influxdb(ip, port, username, password, dbname, query_str)
# print("Result: {0}".format(result))

def query_influxdb_
>>>>>>> hun_branch
