# -*- coding: utf-8 -*-
dashboard_summary = {
    'dbms_type': 'MySQL',
    'db_name': 'tpc-h',
    'data_store_type': 'Row Base',
    'db_user': 'root',
    'db_size': '196 (GB)',
    'storage_type': 'CSD',
    'block_size': '4096 (MB)',
    'workbench_user': 'User 1234',
    'csd_count': 8,
    'csd_kind': 'NGD',
    'scheduling_algorithm': 'Csd Metric Score',
    'db_host_ip': '10.0.4.80:40001'
}

from flask import Blueprint, jsonify, request, render_template
from connectDB import influx, mysql, info
from collections import deque 
from datetime import datetime, timezone, timedelta
import sys, os, random

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
monitoring_bp = Blueprint('monitoring', __name__, url_prefix='/monitoring')

#  CSD Metric
ddl_count_outer = deque(maxlen=20) 
client_count_outer = deque(maxlen=20) 
disk_usage_outer = deque(maxlen=20)
# cache_hit_ratio_outer = deque(maxlen=20)
cache_usage_outer = deque(maxlen=20)
scan_filter_ratio_outer = deque(maxlen=20)
disk_capacity_outer = {}

# host server(node) metric
cpu_usage_outer = deque(maxlen=20)
memory_usage_outer = deque(maxlen=20)
disk_usage_outer = deque(maxlen=20)
network_usage_outer = deque(maxlen=20)
power_usage_outer = deque(maxlen=20)

def get_csd_metric():
  query = "select * from database_monitoring order by time desc limit 1 tz('Asia/Seoul');"
  result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, 'keti_db', query)
  
  print(result)
  
  csd_metric = []
    
  ddl_count_inner = {}
  client_count_inner = {} 
  scan_filter_ratio_inner = {}

  time = result[0][0].get('time')
  date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%S.%fZ') + timedelta(hours=9)
  timestamp = date_time_obj.strftime('%H:%M:%S') 
  print(timestamp)

  select_count = result[0][0].get('select_count')
  insert_count = result[0][0].get('insert_count')
  delete_count = result[0][0].get('delete_count')
  update_count = result[0][0].get('update_count')

  ddl_count_inner['timestamp'] = timestamp
  client_count_inner['timestamp'] = timestamp
  scan_filter_ratio_inner['timestamp'] = timestamp

  if select_count is None:
    ddl_count_inner["select_count"] = 0
  else:
    ddl_count_inner["select_count"] = int(select_count)
  
  if insert_count is None:
    ddl_count_inner["insert_count"] = 0
  else:
    ddl_count_inner["insert_count"] = int(insert_count)

  if delete_count is None:
    ddl_count_inner["delete_count"] = 0
  else:
    ddl_count_inner["delete_count"] = int(delete_count)
  
  if update_count is None:
    ddl_count_inner["update_count"] = 0
  else: 
    ddl_count_inner["update_count"] = int(update_count)

  client_count = result[0][0].get('client_count')
  if client_count is None:
    client_count_inner["client"] = 0
  else:
    client_count_inner["client"] = int(client_count)

  csd_scan_row_count = result[0][0].get('csd_scan_row_count')
  csd_filter_row_count = result[0][0].get('csd_filter_row_count')
  scan_filter_ratio_inner["scan"] = csd_scan_row_count
  scan_filter_ratio_inner["filter"] = csd_filter_row_count
  scan_filter_ratio_inner["scan_filter_ratio"] = 0.25
  scan_filter_ratio_outer.append(scan_filter_ratio_inner)

  ddl_count_outer.append(ddl_count_inner)
  client_count_outer.append(client_count_inner)
  scan_filter_ratio_outer.append(scan_filter_ratio_inner)

  ddl_count_outer.reverse()
  client_count_outer.reverse()
  scan_filter_ratio_outer.reverse()

  csd_metric.append(ddl_count_outer[-1])
  csd_metric.append(client_count_outer[-1])
  csd_metric.append(scan_filter_ratio_outer[-1])

  print(csd_metric)
  return csd_metric

def get_selected_csd_metric():
  # csd 1~8 metric monitoring
  for i in range(1, 5):
    disk_capacity_inner = {}
    csd_num = str(i)
    csd_query_str = "select disk_usage from csd" + csd_num + "_metric order by desc limit 1"
    csd_result = influx.execute_query_influxdb(info.PLATFORM_METRIC_DB_HOST, info.PLATFORM_METRIC_DB_PORT, info.PLATFORM_METRIC_DB_USER, info.PLATFORM_METRIC_DB_PASSWORD, info.PLATFORM_METRIC_DB_NAME, csd_query_str)
    disk_capacity_inner['csd_storage_capacity'] = csd_result[0][0].get('disk_usage')

    csd_name = "csd" + csd_num
    disk_capacity_outer[csd_name] = disk_capacity_inner

def get_instance_metric():
  query = "select * from instance_monitoring order by desc limit 1 tz('Asia/Seoul')"
  result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "keti_db", query)

  host_metric = []  #그냥 패키징 용도라서 함수 내부에 선언 => 매 요청마다 초기화 되어야 함
  cpu_usage_inner = {}
  memory_usage_inner = {}
  disk_usage_inner = {}
  network_usage_inner = {}

  time = result[0][0].get('time')
  date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
  timestamp = date_time_obj.strftime('%H:%M:%S') 
  print(timestamp)

  cpu_usage_inner['timestamp'] = timestamp
  memory_usage_inner['timestamp'] = timestamp
  disk_usage_inner['timestamp'] = timestamp
  network_usage_inner['timestamp'] = timestamp
  
  cpu_usage_inner['storage_cpu_usage'] = result[0][0].get('cpu_usage')
  memory_usage_inner['storage_memory_usage'] = result[0][0].get('memory_usage')
  
  disk_usage = result[0][0].get('disk_usage')
  if disk_usage is None:
    disk_usage_inner['storage_disk_usage'] = 0
  else:
    disk_usage_inner['storage_disk_usage'] = disk_usage
  
  network_rx_byte = result[0][0].get('network_rx_byte')
  network_tx_byte = result[0][0].get('network_tx_byte')

  if network_rx_byte is None and network_tx_byte is None:
    network_usage_inner['storage_network_usage'] = 0
  elif network_rx_byte is None:
    network_usage_inner['storage_network_usage'] = int(network_tx_byte)
  elif network_tx_byte is None:
    network_usage_inner['storage_network_usage'] = int(network_rx_byte)
  else:
    network_usage_inner['storage_network_usage'] = float(int(network_rx_byte) + int(network_tx_byte)) / 1000

  cpu_usage_outer.append(cpu_usage_inner)
  memory_usage_outer.append(memory_usage_inner)
  disk_usage_outer.append(disk_usage_inner)
  network_usage_outer.append(network_usage_inner)

  query_power = "select power_usage from instance_node_monitoring order by desc limit 12 tz('Asia/Seoul');"
  result_power = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "node_metric", query_power)    

  power_usage_inner = {}
  power_usage_inner['timestamp'] = timestamp
  
  power_usage = result_power[0][0].get('power_usage')
  if power_usage is None:
    power_usage_inner['storage_power_usage'] = 0
  else:
    power_usage_inner['storage_power_usage'] = power_usage
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

def get_csd_capacity():
  disk_capacity_outer = {}
  
  for i in range(1, 9): # 이미지 pull 제한으로 일단 5개만
    disk_capacity_inner = {}
    csd_num = str(i)
    query = "select disk_usage from csd" + csd_num + "_metric order by desc limit 1"
    result = influx.execute_query_influxdb(info.INFLUX_CSD_IP, info.INFLUX_CSD_PORT, info.INFLUX_CSD_USERNAME, info.PLATFORM_METRIC_DB_PASSWORD, info.PLATFORM_METRIC_DB_NAME, query)
    disk_capacity_inner['csd_storage_capacity'] = result[0][0].get('disk_usage')

    csd_name = "csd" + csd_num
    disk_capacity_outer[csd_name] = disk_capacity_inner

  return disk_capacity_outer

@monitoring_bp.route('/')  
def monitoring():
  return render_template('monitoring-csd.html', dashboard_summary=dashboard_summary)

@monitoring_bp.route('/get_CSDMetric', methods=['GET'])
def get_CSDMetric():
  test = get_csd_metric()
  # print(test)
  return jsonify(test)

# Host Metric
@monitoring_bp.route('/get_HostMetric', methods=['GET'])
def get_HostMetric():
    return jsonify(get_instance_metric())

# CSD 사용중인 저장 용량
@monitoring_bp.route('/get_CSDCapacity', methods=['GET'])
def get_CSDCapacity():
  return jsonify(get_csd_capacity())

selected_csd_metric_outer = deque(maxlen=20)

# 선택한 CSD의 메트릭 정보
@monitoring_bp.route('/get_SelectedCSDMetric', methods=['GET', 'POST'])
def get_SelectedCSDMetric():
  if request.method == 'POST': # 클릭 이벤트 발생 시, 해당 csd에 대한 메트릭 자세하게 출력 
      data = request.json
      csd_id = data['seletesCSD']  

  csd_metric_outer = []
  query_str = "select current_time, cpu_usage, memory_usage, network_bandwidth from " + csd_id + "_metric order by desc limit 12"
  result = influx.execute_query_influxdb(info.INFLUX_CSD_IP, info.INFLUX_CSD_PORT, info.INFLUX_CSD_USERNAME, info.INFLUX_CSD_PORT, info.INFLUX_CSD_DB, query_str)

  for i in range(len(result[0])):
    csd_metric_inner = {} 
    # csd_metric_inner["timestamp"] = result[0][i].get('current_time')
    time = result[0][0].get('time')
    date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
    timestamp = date_time_obj.strftime('%H:%M:%S') 
    print(timestamp)
    csd_metric_inner["timestamp"] = timestamp
    csd_metric_inner["cpu_usage"] = result[0][i].get('cpu_usage')
    csd_metric_inner["memory_usage"] = result[0][i].get('memory_usage') + (random.randint(0, 2) * 10000)
    csd_metric_inner["network_usage"] = result[0][i].get('network_bandwidth') + (random.randint(0, 2) * 100)
    csd_metric_inner["power_usage"] = result[0][i].get('network_bandwidth') + (random.randint(0, 2) * 100)
    csd_metric_outer.append(csd_metric_inner)

  return jsonify(csd_metric_outer)

@monitoring_bp.route('/get_StartCollectSelectedCSDMetric', methods=['GET', 'POST'])
def get_StartCollectSelectedCSDMetric():
  if request.method == 'POST':
      data = request.json
      csd_id = data['data'] 
  # csd_metric_outer = []
  query_str = "select current_time, cpu_usage, memory_usage, network_bandwidth from " + csd_id + "_metric order by desc limit 1"
  result = influx.execute_query_influxdb(info.INFLUX_CSD_IP, info.INFLUX_CSD_PORT, info.INFLUX_CSD_USERNAME, info.INFLUX_CSD_PORT, info.INFLUX_CSD_DB, query_str)

  csd_metric_inner = {}
  time = result[0][0].get('time')
  date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
  timestamp = date_time_obj.strftime('%H:%M:%S') 
  print(timestamp)
  csd_metric_inner["timestamp"] = timestamp
  csd_metric_inner["cpu_usage"] = result[0][0].get('cpu_usage')
  csd_metric_inner["memory_usage"] = result[0][0].get('memory_usage')
  csd_metric_inner["network_usage"] = result[0][0].get('network_bandwidth')
  csd_metric_inner["power_usage"] = result[0][0].get('network_bandwidth')

  return csd_metric_inner