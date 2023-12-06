# from flask import jsonify
# import json
from influxdb import InfluxDBClient

# 어느정도의 시간 텀을 가지고 데이터를 추출할지? => 일단 20개로 
def query_influxdb(ip, port, username, password, dbname, query):
    try:
        client = InfluxDBClient(ip, port, username, password, dbname)
        result = client.query(query)
        return list(result)
    
    except Exception as e:
        return f"Error: {str(e)}"

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