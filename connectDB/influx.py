from influxdb import InfluxDBClient

# 어느정도의 시간 텀을 가지고 데이터를 추출할지? => 일단 20개로 
def query_influxdb(ip, port, username, password, dbname, query):
    try:
        client = InfluxDBClient(ip, port, username, password, dbname)
        result = client.query(query)
        return list(result)
    
    except Exception as e:
        return f"Error: {str(e)}"
    
def execute_query_influx_management(host_, port_, user_, password_, db_, query_):
    try:
        client = InfluxDBClient(host_, port_, user_, password_, db_)
        result = client.query(query_)
        return result
    
    except Exception as e:
        return f"Error: {str(e)}"
    
def execute_query_influx_instance(host_, port_, user_, password_, db_, query_):
    try:
        client = InfluxDBClient(host_, port_, user_, password_, db_)
        result = client.query(query_)
        return result
    
    except Exception as e:
        return f"Error: {str(e)}"
