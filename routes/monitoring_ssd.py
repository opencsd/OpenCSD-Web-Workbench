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
import sys, os
from datetime import datetime, timedelta

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
monitoring_ssd_bp = Blueprint('monitoring_ssd', __name__, url_prefix='/monitoring-ssd')

@monitoring_ssd_bp.route('/') 
def monitoring_ssd():
    return render_template('monitoring-ssd.html')

# Metric 그래프 데이터 요청
@monitoring_ssd_bp.route('/metric', methods=['GET', 'POST'])
def metric_handler():
    if request.method == 'GET':
        try:
            query = "select * from instance_node_monitoring order by time desc limit 10 tz('Asia/Seoul')"
            result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                            info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                            info.INSTANCE_NODE_METRIC_DB_NAME, query)
            
            return jsonify(result[0])
            
        except:
            return ""

# # 오른쪽에서 값이 들어오면 왼쪽부터 삭제됨
# # ddl_count_outer = deque(maxlen=20)
# mysql_timestamp_outer = deque(maxlen=20)

# select_count_outer = deque(maxlen=20)
# insert_count_outer = deque(maxlen=20)
# delete_count_outer = deque(maxlen=20)
# update_count_outer = deque(maxlen=20)

# client_count_outer = deque(maxlen=20)
# disk_ratio_outer = deque(maxlen=20)
# cache_usage_outer = deque(maxlen=20)
# cache_ratio_outer = deque(maxlen=20)

# select_init = 0
# insert_init = 0
# delete_init = 0
# update_init = 0
# cnt = 0

# # DDL (delete, insert, select, update 순)
# # mysql metric
# def get_total_mysql_metric():
#   global select_init, insert_init, delete_init, update_init, cnt

#   query = "SELECT * FROM GLOBAL_STATUS WHERE VARIABLE_NAME = 'Com_select' OR VARIABLE_NAME = 'Com_insert' OR VARIABLE_NAME = 'Com_delete' OR VARIABLE_NAME = 'Com_update' OR VARIABLE_NAME LIKE '%ROCKSDB_BYTES_READ%' OR VARIABLE_NAME LIKE '%ROCKSDB_BYTES_WRITTEN%' OR VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_BYTES_READ%' OR VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_BYTES_WRITE%' OR VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_HIT%' OR VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_MISS%' OR VARIABLE_NAME LIKE '%Threads_connected%'"
#   result = mysql.execute_query_mysql_demo("information_schema", query)
#   # print(result)

#   timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
#   timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
#   timestamp = timestamp_result['time']

#   host_metric = {}
#   mysql_metric_inner = {}
#   # ddl_count_inner = {}

#   mysql_metric_inner['timestamp'] = timestamp
#   mysql_timestamp_outer.append(timestamp)

#   # result[0]['VARIABLE_NAME']
#   for i in range(len(result)):
#     variable_name = result[i]['VARIABLE_NAME']
#     variable_value = result[i]['VARIABLE_VALUE']

#     # ddl_count_inner['timestamp'] = timestamp

#     # # time
#     # mysql_metric_inner['timestamp'] = timestamp

#     # DDL
#     if variable_name == 'COM_SELECT':
#       if cnt != 0:
#         mysql_metric_inner['select_count'] = int(variable_value) - select_init
#         select_count_outer.append(int(variable_value) - select_init)
#       else:
#         mysql_metric_inner['select_count'] = 0
#         select_count_outer.append(0)
#       select_init = int(variable_value)

#     elif variable_name == 'COM_DELETE':
#       if cnt != 0:
#         mysql_metric_inner['delete_count'] = int(variable_value) - delete_init
#         delete_count_outer.append(int(variable_value) - delete_init)
#       else:
#         mysql_metric_inner['delete_count'] = 0  
#         delete_count_outer.append(0)      
#       delete_init = int(variable_value)

#     elif variable_name == 'COM_INSERT':
#       if cnt != 0:
#         mysql_metric_inner['insert_count'] = int(variable_value) - insert_init
#         insert_count_outer.append(int(variable_value) - insert_init)
#       else:
#         mysql_metric_inner['insert_count'] = 0 
#         insert_count_outer.append(0)       
#       insert_init = int(variable_value)

#     elif variable_name == 'COM_UPDATE':
#       if cnt != 0:
#         mysql_metric_inner['update_count'] = int(variable_value) - update_init
#         update_count_outer.append(int(variable_value) - update_init)
#       else:
#         mysql_metric_inner['update_count'] = 0   
#         update_count_outer.append(0)     
#       update_init = int(variable_value)
    
#     # client
#     elif variable_name == 'THREADS_CONNECTED':
#       client_cnt = int(variable_value)
#       mysql_metric_inner['client_cnt'] = client_cnt

#     # Disk usage
#     elif variable_name == 'ROCKSDB_BYTES_READ':
#       disk_read = int(variable_value)
#       mysql_metric_inner['disk_read'] = disk_read


#     elif variable_name == 'ROCKSDB_BYTES_WRITTEN':
#       disk_write = int(variable_value)
#       mysql_metric_inner['disk_write'] = disk_write

#     #Cache usage
#     elif variable_name == 'ROCKSDB_BLOCK_CACHE_BYTES_READ':
#       cache_read = int(variable_value)
#       mysql_metric_inner['cache_bytes_read'] = cache_read

#     elif variable_name == 'ROCKSDB_BLOCK_CACHE_BYTES_WRITE':
#       cache_write = int(variable_value)  
#       mysql_metric_inner['cache_bytes_write'] = cache_write

#     #Cache hit
#     elif result[i]['VARIABLE_NAME'] == 'ROCKSDB_BLOCK_CACHE_HIT':
#       cache_hit = int(variable_value)
#       mysql_metric_inner['cache_hit'] = cache_hit

#     elif result[i]['VARIABLE_NAME'] == 'ROCKSDB_BLOCK_CACHE_MISS':
#       cache_miss = int(variable_value)
#       mysql_metric_inner['cache_miss'] = cache_miss

#   client_count_outer.append(client_cnt)
#   disk_ratio_outer.append(disk_read + disk_write)
#   cache_usage_outer.append(cache_read + cache_write)
#   cache_ratio_outer.append(float(cache_hit) / (cache_hit + cache_miss) * 100)

#   # reversed_timestamp_outer = list(deque(reversed(mysql_timestamp_outer)))

#   # reversed_select_count_outer = list(deque(reversed(select_count_outer)))
#   # reversed_insert_count_outer = list(deque(reversed(insert_count_outer)))
#   # reversed_delete_count_outer = list(deque(reversed(delete_count_outer)))
#   # reversed_update_count_outer = list(deque(reversed(update_count_outer)))

#   # reversed_client_count_outer = list(deque(reversed(client_count_outer)))
#   # reversed_disk_ratio_outer = list(deque(reversed(disk_ratio_outer)))
#   # reversed_cache_usage_outer = list(deque(reversed(cache_usage_outer)))
#   # reversed_cache_ratio_outer = list(deque(reversed(cache_ratio_outer)))

#   # host_metric['timestamp'] = reversed_timestamp_outer

#   # host_metric['select_count'] = reversed_select_count_outer
#   # host_metric['insert_count'] = reversed_insert_count_outer
#   # host_metric['delete_count'] = reversed_delete_count_outer
#   # host_metric['update_count'] = reversed_update_count_outer
  
#   # host_metric['client_count'] = reversed_client_count_outer
#   # host_metric['disk_usage'] = reversed_disk_ratio_outer
#   # host_metric['cache_usage'] = reversed_cache_usage_outer
#   # host_metric['cache_ratio'] = reversed_cache_ratio_outer

#   host_metric['timestamp'] = list(mysql_timestamp_outer)

#   host_metric['select_count'] = list(select_count_outer)
#   host_metric['insert_count'] = list(insert_count_outer)
#   host_metric['delete_count'] = list(delete_count_outer)
#   host_metric['update_count'] = list(update_count_outer)
  
#   host_metric['client_count'] = list(client_count_outer)
#   host_metric['disk_usage'] = list(disk_ratio_outer)
#   host_metric['cache_usage'] = list(cache_usage_outer)
#   host_metric['cache_ratio'] = list(cache_ratio_outer)
#   # print(mysql_metric_inner)  

#   cnt = 1
#   print(host_metric)
#   return host_metric
  

# # client (시간 추가해야 함)
# def get_client_count():
#   query = "SHOW STATUS LIKE 'Threads_connected'"
#   result = mysql.execute_query_mysql_demo("information_schema", query)

#   timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
#   timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
#   timestamp = timestamp_result['time']

#   client_count_inner = {}
#   client_count_inner['timestamp'] = timestamp
#   client_count_inner['client'] = int(result[0]['Value'])
#   client_count_outer.append(client_count_inner)

# # disk r/w (시간 추가해야 함)
# def get_disk_rw():
#   query = "SELECT * FROM GLOBAL_STATUS WHERE VARIABLE_NAME LIKE '%ROCKSDB_BYTES_READ%' OR VARIABLE_NAME LIKE '%ROCKSDB_BYTES_WRITTEN%'"
#   result = mysql.execute_query_mysql_demo("information_schema", query)
  
#   timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
#   timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
#   timestamp = timestamp_result['time']

#   disk_ratio_inner = {}
#   for i in range(len(result)):  
#     disk_ratio_inner['timestamp'] = timestamp
#     if result[i]['VARIABLE_NAME'] == 'ROCKSDB_BYTES_READ':
#       disk_ratio_inner['disk_read'] = int(result[i]['VARIABLE_VALUE'])

#     elif result[i]['VARIABLE_NAME'] == 'ROCKSDB_BYTES_WRITTEN':
#       disk_ratio_inner['disk_write'] = int(result[i]['VARIABLE_VALUE'])

#   disk_ratio_outer.append(disk_ratio_inner)

# # cache usage
# def get_cache_usage():
#   query = "SELECT * FROM GLOBAL_STATUS WHERE VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_BYTES_READ%' OR VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_BYTES_WRITE%'"
#   result = mysql.execute_query_mysql_demo("information_schema", query)
  
#   timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
#   timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
#   timestamp = timestamp_result['time']

#   cache_usage_inner = {}
#   cache_usage_inner['timestamp'] = timestamp
#   for i in range(len(result)):
#     variable_name = result[i]['VARIABLE_NAME']
#     variable_value = result[i]['VARIABLE_VALUE']

#     if variable_name == 'ROCKSDB_BLOCK_CACHE_BYTES_READ':
#       cache_read = int(variable_value)

#     elif variable_name == 'ROCKSDB_BLOCK_CACHE_BYTES_WRITE':
#       cache_write = int(variable_value)
#   cache_usage_inner['cache_hit_rate'] = cache_read + cache_write
#   cache_usage_outer.append(cache_usage_inner)

# # cache hit
# def get_cache_ratio():
#   query = "SELECT * FROM information_schema.GLOBAL_STATUS WHERE VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_HIT%' OR VARIABLE_NAME LIKE '%ROCKSDB_BLOCK_CACHE_MISS%'"
#   result = mysql.execute_query_mysql_demo("information_schema", query)

#   timestamp_query = "SELECT TIME_FORMAT(NOW(), '%H:%i:%s') AS time"
#   timestamp_result = mysql.execute_query_timestamp_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT, info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD, "information_schema", timestamp_query)
#   timestamp = timestamp_result['time']

#   cache_ratio_inner = {}
#   cache_ratio_inner['timestamp'] = timestamp

#   for i in range(len(result)):
#     if result[i]['VARIABLE_NAME'] == 'ROCKSDB_BLOCK_CACHE_HIT':
#       cache_hit = int(result[i]['VARIABLE_VALUE'])

#     elif result[i]['VARIABLE_NAME'] == 'ROCKSDB_BLOCK_CACHE_MISS':
#       cache_miss = int(result[i]['VARIABLE_VALUE'])

#   cache_ratio_inner['cache_hit_ratio'] = float(cache_hit) / (cache_hit + cache_miss) * 100
#   cache_ratio_outer.append(cache_ratio_inner)


# # host server metric 관리
# timestamp_outer = deque(maxlen=20)
# cpu_usage_outer = deque(maxlen=20)
# memory_usage_outer = deque(maxlen=20)
# disk_usage_outer = deque(maxlen=20)
# network_usage_outer = deque(maxlen=20)
# power_usage_outer = deque(maxlen=20)

# def get_total_instance_metric():
#   query = "select * from instance_node_monitoring order by time desc limit 20;"
#   result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "node_metric", query)
#   global timestamp_outer, cpu_usage_outer, memory_usage_outer, disk_usage_outer, network_usage_outer, power_usage_outer
#   host_metric = {}

#   for i in range(len(result[0])):
    
#     host_metric_inner = {}

#     time = result[0][i].get('time')
#     date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
#     timestamp = date_time_obj.strftime('%H:%M:%S') 
#     cpu_usage = result[0][i].get('cpu_usage')
#     memory_usage = result[0][i].get('memory_usage')
#     disk_usage = result[0][i].get('disk_usage')
#     network_rx_byte = result[0][i].get('network_rx_byte')
#     network_tx_byte = result[0][i].get('network_tx_byte')
#     network_usage = network_rx_byte  + network_tx_byte
#     power_usage = result[0][i].get('power_usage')

#     host_metric_inner['timestamp' ] = timestamp
#     host_metric_inner['storage_cpu_usage'] = cpu_usage
#     host_metric_inner['storage_memory_usage'] = memory_usage
#     host_metric_inner['disk_usage'] = disk_usage

#     if network_rx_byte is None and network_tx_byte is None:
#       host_metric_inner['storage_network_usage'] = 0
#     elif network_rx_byte is None:
#       host_metric_inner['storage_network_usage'] = float(int(network_tx_byte)) / 1000
#     elif network_tx_byte is None: 
#       host_metric_inner['storage_network_usage'] = float(int(network_rx_byte)) / 1000
#     else:
#       host_metric_inner['storage_network_usage'] = float(int(network_rx_byte) + int(network_tx_byte)) / 1000

#     if power_usage is None:
#       host_metric_inner['storage_power_usage'] = 0
#     else:
#       host_metric_inner['storage_power_usage'] = power_usage
    
#     timestamp_outer.append(timestamp)
#     cpu_usage_outer.append(cpu_usage)
#     memory_usage_outer.append(memory_usage)
#     disk_usage_outer.append(disk_usage)
#     network_usage_outer.append(network_usage)
#     power_usage_outer.append(power_usage)

#   reversed_timestamp_outer = list(deque(reversed(timestamp_outer)))
#   reversed_cpu_usage_outer = list(deque(reversed(cpu_usage_outer)))
#   reversed_memory_usage_outer = list(deque(reversed(memory_usage_outer)))
#   reversed_disk_usage_outer = list(deque(reversed(disk_usage_outer)))
#   reversed_network_usage_outer = list(deque(reversed(network_usage_outer)))
#   reversed_power_usage_outer = list(deque(reversed(power_usage_outer)))

#   host_metric['timestamp'] = reversed_timestamp_outer
#   host_metric['cpu_usage'] = reversed_cpu_usage_outer
#   host_metric['memory_usage'] = reversed_memory_usage_outer
#   host_metric['disk_usage'] = reversed_disk_usage_outer
#   host_metric['network_usage'] = reversed_network_usage_outer
#   host_metric['power_usage'] = reversed_power_usage_outer

#   # print(host_metric)
#   return host_metric

# def get_instance_metric():
#   query = "select * from instance_node_monitoring order by time desc limit 1;"
#   result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "node_metric", query)
#   global timestamp_outer, cpu_usage_outer, memory_usage_outer, disk_usage_outer, network_usage_outer, power_usage_outer
#   host_metric = {} #그냥 패키징 용도라서 함수 내부에 선언 => 매 요청마다 초기화 되어야 함
  
#   time = result[0][0].get('time')
#   date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
#   timestamp = date_time_obj.strftime('%H:%M:%S') 
#   cpu_usage = result[0][0].get('cpu_usage')
#   memory_usage = result[0][0].get('memory_usage')
#   disk_usage = result[0][0].get('disk_usage')
#   network_rx_byte = result[0][0].get('network_rx_byte')
#   network_tx_byte = result[0][0].get('network_tx_byte')
#   network_usage = network_rx_byte  + network_tx_byte
#   power_usage = result[0][0].get('power_usage')

#   reversed_timestamp_outer = list(deque(reversed(timestamp_outer)))

#   host_metric['timestamp'] = timestamp
#   host_metric['cpu_usage'] = cpu_usage
#   host_metric['memory_usage'] = memory_usage
#   host_metric['disk_usage'] = disk_usage
#   host_metric['network_usage'] = network_usage
#   host_metric['power_usage'] = power_usage

#   timestamp_outer.append(timestamp)
#   cpu_usage_outer.append(cpu_usage)
#   memory_usage_outer.append(memory_usage)
#   disk_usage_outer.append(disk_usage)
#   network_usage_outer.append(network_usage)
#   power_usage_outer.append(power_usage)    

#   return host_metric

# # DB Monitoring - SSD
# @monitoring_ssd_bp.route('/')  
# def monitoring_ssd():
#     # get_ddl_count() #ddl 초기화
#     get_total_mysql_metric()
#     # get_client_count()
#     return render_template('monitoring-ssd.html', dashboard_summary=dashboard_summary)

# # DDL Data Get 요청
# # @monitoring_ssd_bp.route('/get_queryChart', methods=['GET'])
# # def get_queryChart():
# #     get_ddl_count()
# # #     return jsonify(ddl_count_outer[-1])
# #     return jsonify(list(ddl_count_outer))

# # # 연결된 클라이언트 수 Get 요청
# # @monitoring_ssd_bp.route('/get_ConnectedClient', methods=['GET'])
# # def get_ConnectedClient():
# #     get_client_count()
# #     return jsonify(client_count_outer[-1])

# # # Disk R/W Get 요청
# # @monitoring_ssd_bp.route('/get_ReadWrite', methods=['GET'])
# # def get_ReadWrite():
# #     get_disk_rw()
# #     return jsonify(disk_ratio_outer[-1])

# # # Cache Usage Get 요청
# # @monitoring_ssd_bp.route('/get_CacheUsage', methods=['GET'])
# # def get_CacheUsage():
# #     get_cache_usage()
# #     return jsonify(cache_usage_outer[-1])

# # # Cache Ratio Get 요청
# # @monitoring_ssd_bp.route('/get_CacheHitRatio', methods=['GET'])
# # def get_CacheRatio():
# #     get_cache_ratio()
# #     return jsonify(cache_ratio_outer[-1])
# @monitoring_ssd_bp.route('/get_TotalMysqlMetric', methods=['GET'])
# def get_TotalMysqlMetric():
#     return jsonify(get_total_mysql_metric())

# # Host Server Metric 사용량
# @monitoring_ssd_bp.route('/get_HostMetric', methods=['GET'])
# def get_HostMetric():
#     return jsonify(get_instance_metric())

# @monitoring_ssd_bp.route('/get_TotalHostMetric', methods=['GET'])
# def get_TotalHostMetric():
#     return jsonify(get_total_instance_metric())
