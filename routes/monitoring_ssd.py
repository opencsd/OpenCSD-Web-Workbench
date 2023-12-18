# -*- coding: utf-8 -*-

dashboard_summary = {
    'dbms_type': 'MySQL',
    'db_size': '1089.8 (MB)',
    'db_name': 'tpc-h',
    'storage_type': 'SSD',
    'db_user': 'keti',
    'workbench_user': 'keti-mysql-admin',
    'db_host_ip': '10.0.4.80:3306',
    'data_store_type': 'Row Base',
}

from flask import Blueprint, jsonify, request, render_template
from connectDB import influx, mysql, info
from collections import deque 
import sys, os, pytz
from datetime import datetime, timezone, timedelta

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


monitoring_ssd_bp = Blueprint('monitoring_ssd', __name__, url_prefix='/monitoring_ssd')

# 오른쪽에서 값이 들어오면 왼쪽부터 삭제됨
ddl_count_outer = deque(maxlen=20)
client_count_outer = deque(maxlen=20)
disk_ratio_outer = deque(maxlen=20)
cache_usage_outer = deque(maxlen=20)
cache_ratio_outer = deque(maxlen=20)

select_init = 0
insert_init = 0
delete_init = 0
update_init = 0
cnt = 0

# DDL (delete, insert, select, update 순)
def get_ddl_count():
  global select_init, insert_init, delete_init, update_init, cnt

  query = "SELECT * FROM GLOBAL_STATUS WHERE VARIABLE_NAME = 'Com_select' OR VARIABLE_NAME = 'Com_insert' OR VARIABLE_NAME = 'Com_delete' OR VARIABLE_NAME = 'Com_update'"
  result = mysql.execute_query_mysql_demo("information_schema", query)

  timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
  timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
  timestamp = timestamp_result['time']
  ddl_count_inner = {}

  for i in range(len(result)):
    variable_name = result[i]['VARIABLE_NAME']
    variable_value = result[i]['VARIABLE_VALUE']

    ddl_count_inner['timestamp'] = timestamp

    # if cnt == 0:
    #   pass
    # else: 
    #   ddl_count_inner['timestamp'] = 0

    if variable_name == 'COM_SELECT':
      if cnt != 0:
        ddl_count_inner['select_count'] = int(variable_value) - select_init
      select_init = int(variable_value)

    elif variable_name == 'COM_DELETE':
      if cnt != 0:
        ddl_count_inner['delete_count'] = int(variable_value) - delete_init
      delete_init = int(variable_value)

    elif variable_name == 'COM_INSERT':
      # if cnt == 0:
      #   insert_init = int(variable_value)
      if cnt != 0:
        ddl_count_inner['insert_count'] = int(variable_value) - insert_init
      insert_init = int(variable_value)

    elif variable_name == 'COM_UPDATE':
      if cnt != 0:
        ddl_count_inner['update_count'] = update_init - int(variable_value)
      update_init = int(variable_value)

  if cnt == 0:
    pass
  else:
    ddl_count_outer.append(ddl_count_inner)
  cnt = 1
  # print(ddl_count_outer)

# client (시간 추가해야 함)
def get_client_count():
  query = "SHOW STATUS LIKE 'Threads_connected'"
  result = mysql.execute_query_mysql_demo("information_schema", query)

  timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
  timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
  timestamp = timestamp_result['time']

  client_count_inner = {}
  client_count_inner['timestamp'] = timestamp
  client_count_inner['client'] = int(result[0]['Value'])
  client_count_outer.append(client_count_inner)

# disk r/w (시간 추가해야 함)
def get_disk_rw():
  query = "SELECT * FROM GLOBAL_STATUS WHERE VARIABLE_NAME LIKE '%ROCKSDB_BYTES_READ%' OR VARIABLE_NAME LIKE '%ROCKSDB_BYTES_WRITTEN%'"
  result = mysql.execute_query_mysql_demo("information_schema", query)
  
  timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
  timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
  timestamp = timestamp_result['time']

  disk_ratio_inner = {}
  for i in range(len(result)):  
    disk_ratio_inner['timestamp'] = timestamp
    if result[i]['VARIABLE_NAME'] == 'ROCKSDB_BYTES_READ':
      disk_ratio_inner['disk_read'] = int(result[i]['VARIABLE_VALUE'])

    elif result[i]['VARIABLE_NAME'] == 'ROCKSDB_BYTES_WRITTEN':
      disk_ratio_inner['disk_write'] = int(result[i]['VARIABLE_VALUE'])

  disk_ratio_outer.append(disk_ratio_inner)

# cache usage
def get_cache_usage():
  query = "SELECT * FROM GLOBAL_STATUS WHERE VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_BYTES_READ%' OR VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_BYTES_WRITE%'"
  result = mysql.execute_query_mysql_demo("information_schema", query)
  
  timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
  timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
  timestamp = timestamp_result['time']

  cache_usage_inner = {}
  cache_usage_inner['timestamp'] = timestamp
  for i in range(len(result)):
    variable_name = result[i]['VARIABLE_NAME']
    variable_value = result[i]['VARIABLE_VALUE']

    if variable_name == 'ROCKSDB_BLOCK_CACHE_BYTES_READ':
      cache_read = int(variable_value)

    elif variable_name == 'ROCKSDB_BLOCK_CACHE_BYTES_WRITE':
      cache_write = int(variable_value)
  cache_usage_inner['cache_hit_rate'] = cache_read + cache_write
  cache_usage_outer.append(cache_usage_inner)

# cache hit
def get_cache_ratio():
  query = "SELECT * FROM information_schema.GLOBAL_STATUS WHERE VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_HIT%' OR VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_MISS%'"
  result = mysql.execute_query_mysql_demo("information_schema", query)

  timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
  timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
  timestamp = timestamp_result['time']

  cache_ratio_inner = {}
  cache_ratio_inner['timestamp'] = timestamp

  for i in range(len(result)):
    if result[i]['VARIABLE_NAME'] == 'ROCKSDB_BLOCK_CACHE_HIT':
      cache_hit = int(result[i]['VARIABLE_VALUE'])

    elif result[i]['VARIABLE_NAME'] == 'ROCKSDB_BLOCK_CACHE_MISS':
      cache_miss = int(result[i]['VARIABLE_VALUE'])

  cache_ratio_inner['cache_hit_ratio'] = float(cache_hit) / (cache_hit + cache_miss) * 100
  cache_ratio_outer.append(cache_ratio_inner)


# host server metric
cpu_usage_outer = deque(maxlen=20)
memory_usage_outer = deque(maxlen=20)
disk_usage_outer = deque(maxlen=20)
network_usage_outer = deque(maxlen=20)
power_usage_outer = deque(maxlen=20)

def get_instance_metric():
  query = "select * from instance_node_monitoring order by time desc limit 1;"
  result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "node_metric", query)

  host_metric = [] #그냥 패키징 용도라서 함수 내부에 선언 => 매 요청마다 초기화 되어야 함

  time = result[0][0].get('time')
  date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
  timestamp = date_time_obj.strftime('%H:%M:%S') 

  # for i in range(len(result[0])):
  cpu_usage_inner = {}
  memory_usage_inner = {}
  disk_usage_inner = {}
  network_usage_inner = {}
  power_usage_inner = {}

  # timestamp = result[0][0].get('currTime')
  # time = result[0][0].get('time')
  # date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
  # timestamp = date_time_obj.strftime('%H:%M:%S') 
  # print(timestamp)
  
  # if timestamp is None:
  #   cpu_usage_inner['timestamp'] = 0
  #   memory_usage_inner['timestamp'] = 0
  #   disk_usage_inner['timestamp'] = 0
  #   network_usage_inner['timestamp'] = 0
  #   power_usage_inner['timestamp'] = 0
  # else:
  cpu_usage_inner['timestamp'] = timestamp
  memory_usage_inner['timestamp'] = timestamp
  disk_usage_inner['timestamp'] = timestamp
  network_usage_inner['timestamp'] = timestamp
  power_usage_inner['timestamp'] = timestamp

  cpu_usage_inner['storage_cpu_usage'] = result[0][0].get('cpu_usage')
  memory_usage_inner['storage_memory_usage'] = result[0][0].get('memory_usage')
  
  disk_usage = result[0][0].get('disk_usage')
  if disk_usage is None:
    disk_usage_inner['disk_usage'] = 0
  else:
    disk_usage_inner['disk_usage'] = disk_usage
  
  network_rx_byte = result[0][0].get('network_rx_byte')
  network_tx_byte = result[0][0].get('network_tx_byte')
  if network_rx_byte is None and network_tx_byte is None:
    network_usage_inner['storage_network_usage'] = 0
  elif network_rx_byte is None:
    network_usage_inner['storage_network_usage'] = float(int(network_tx_byte)) / 1000
  elif network_tx_byte is None: 
    network_usage_inner['storage_network_usage'] = float(int(network_rx_byte)) / 1000
  else:
    network_usage_inner['storage_network_usage'] = float(int(network_rx_byte) + int(network_tx_byte)) / 1000


  power_usage = result[0][0].get('power_usage')
  if power_usage is None:
    power_usage_inner['storage_power_usage'] = 0
  else:
    power_usage_inner['storage_power_usage'] = power_usage

  cpu_usage_outer.append(cpu_usage_inner)
  memory_usage_outer.append(memory_usage_inner)
  disk_usage_outer.append(disk_usage_inner)
  network_usage_outer.append(network_usage_inner)
  power_usage_outer.append(power_usage_inner)

  cpu_usage_outer.reverse()
  memory_usage_outer.reverse()
  disk_usage_outer.reverse()
  network_usage_outer.reverse()
  power_usage_outer.reverse()

  # host_metric.append(list(cpu_usage_outer))
  # host_metric.append(list(memory_usage_outer))
  # host_metric.append(list(disk_usage_outer))
  # host_metric.append(list(network_usage_outer))
  # host_metric.append(list(power_usage_outer))

  host_metric.append(cpu_usage_outer[-1])
  host_metric.append(memory_usage_outer[-1])
  host_metric.append(disk_usage_outer[-1])
  host_metric.append(network_usage_outer[-1])
  host_metric.append(power_usage_outer[-1])
  # print(host_metric)
  return host_metric

# DB Monitoring - SSD
@monitoring_ssd_bp.route('/')  
def monitoring_ssd():
    get_ddl_count() #ddl 초기화
    # get_client_count()
    return render_template('monitoring-ssd.html', dashboard_summary=dashboard_summary)

# DDL Data Get 요청
@monitoring_ssd_bp.route('/get_queryChart', methods=['GET'])
def get_queryChart():
    get_ddl_count()
    return jsonify(ddl_count_outer[-1])

# 연결된 클라이언트 수 Get 요청
@monitoring_ssd_bp.route('/get_ConnectedClient', methods=['GET'])
def get_ConnectedClient():
    get_client_count()
    return jsonify(client_count_outer[-1])

# Disk R/W Get 요청
@monitoring_ssd_bp.route('/get_ReadWrite', methods=['GET'])
def get_ReadWrite():
    get_disk_rw()
    return jsonify(disk_ratio_outer[-1])

# Cache Usage Get 요청
@monitoring_ssd_bp.route('/get_CacheUsage', methods=['GET'])
def get_CacheUsage():
    get_cache_usage()
    return jsonify(cache_usage_outer[-1])

# Cache Ratio Get 요청
@monitoring_ssd_bp.route('/get_CacheHitRatio', methods=['GET'])
def get_CacheRatio():
    get_cache_ratio()
    return jsonify(cache_ratio_outer[-1])

# # Slow Query Get 요청
# @monitoring_ssd_bp.route('/get_SlowQuery', methods=['GET'])
# def get_SlowQuery():
#     return jsonify(slow_query)

# Host Server Metric 사용량
@monitoring_ssd_bp.route('/get_HostMetric', methods=['GET'])
def get_HostMetric():
    return jsonify(get_instance_metric())