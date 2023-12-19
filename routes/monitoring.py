# -*- coding: utf-8 -*-
dashboard_summary = {
    'dbms_type': 'MySQL',
    'db_name': 'tpc-h',
    'data_store_type': 'Row Base',
    'db_user': 'root',
    'db_size': '1089.8 (MB)',
    'storage_type': 'CSD',
    'block_size': '4096 (MB)',
    'workbench_user': 'keti-opencsd-admin',
    'csd_count': 8,
    'csd_kind': 'NGD',
    'scheduling_algorithm': 'CSD Metric Score',
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
  
  csd_metric = []
    
  ddl_count_inner = {}
  client_count_inner = {} 
  scan_filter_ratio_inner = {}

  time = result[0][0].get('time')
  date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%S.%fZ') + timedelta(hours=9)
  timestamp = date_time_obj.strftime('%H:%M:%S') 

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

  # print(csd_metric)
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


# host server metric 관리
timestamp_outer = deque(maxlen=20)
cpu_usage_outer = deque(maxlen=20)
memory_usage_outer = deque(maxlen=20)
disk_usage_outer = deque(maxlen=20)
# network_usage_outer = deque(maxlen=20)
power_usage_outer = deque(maxlen=20)

def get_total_instance_metric():
  query = "select * from instance_monitoring order by desc limit 20;"
  result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "keti_db", query)

  host_metric = {}

  for i in range(len(result[0])):
    host_metric_inner = {}

    time = result[0][i].get('time')
    date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
    timestamp = date_time_obj.strftime('%H:%M:%S') 
    cpu_usage = result[0][i].get('cpu_usage')
    memory_usage = result[0][i].get('memory_usage')
    disk_usage = result[0][i].get('disk_usage')

    host_metric_inner['timestamp' ] = timestamp
    host_metric_inner['cpu_usage'] = cpu_usage
    host_metric_inner['memory_usage'] = memory_usage
    host_metric_inner['disk_usage'] = disk_usage
   

    timestamp_outer.append(timestamp)
    cpu_usage_outer.append(cpu_usage)
    memory_usage_outer.append(memory_usage)
    disk_usage_outer.append(disk_usage)

  query_power = "select power_usage from instance_node_monitoring order by desc limit 20;"
  result_power = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "node_metric", query_power)    

  # print(result_power)
  for i in range(len(result_power[0])):
    power_metric_inner = {}

    power_usage = result_power[0][i].get('power_usage')

    power_metric_inner['power_usage'] = power_usage

    power_usage_outer.append(power_usage)

  print(power_usage_outer)

  reversed_timestamp_outer = list(deque(reversed(timestamp_outer)))
  reversed_cpu_usage_outer = list(deque(reversed(cpu_usage_outer)))
  reversed_memory_usage_outer = list(deque(reversed(memory_usage_outer)))
  reversed_disk_usage_outer = list(deque(reversed(disk_usage_outer)))
  reversed_power_usage_outer = list(deque(reversed(power_usage_outer)))

  host_metric['timestamp'] = reversed_timestamp_outer
  host_metric['cpu_usage'] = reversed_cpu_usage_outer
  host_metric['memory_usage'] = reversed_memory_usage_outer
  host_metric['disk_usage'] = reversed_disk_usage_outer
  host_metric['power_usage'] = reversed_power_usage_outer

  # print(host_metric)
  return host_metric

def get_instance_metric():
  query = "select * from instance_monitoring order by time desc limit 1;"
  result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "keti_db", query)
  global timestamp_outer, cpu_usage_outer, memory_usage_outer, disk_usage_outer, network_usage_outer, power_usage_outer
  host_metric = {} #그냥 패키징 용도라서 함수 내부에 선언 => 매 요청마다 초기화 되어야 함
  

  time = result[0][0].get('time')
  date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
  timestamp = date_time_obj.strftime('%H:%M:%S') 
  cpu_usage = result[0][0].get('cpu_usage')
  memory_usage = result[0][0].get('memory_usage')
  disk_usage = result[0][0].get('disk_usage')
  # network_rx_byte = result[0][0].get('network_rx_byte')
  # network_tx_byte = result[0][0].get('network_tx_byte')
  # network_usage = network_rx_byte  + network_tx_byte
  # power_usage = result[0][0].get('power_usage')

  query_power = "select power_usage from instance_node_monitoring order by time desc limit 1;"
  result_power = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "node_metric", query_power)    
  power_usage = result_power[0][0].get('power_usage')

  # host_metric_inner['power_usage'] = power_usage

  host_metric['timestamp'] = timestamp
  host_metric['cpu_usage'] = cpu_usage
  host_metric['memory_usage'] = memory_usage
  host_metric['disk_usage'] = disk_usage
  host_metric['power_usage'] = power_usage

  timestamp_outer.append(timestamp)
  cpu_usage_outer.append(cpu_usage)
  memory_usage_outer.append(memory_usage)
  disk_usage_outer.append(disk_usage)
  power_usage_outer.append(power_usage)    
  # print(result)
  
  # time = result[0][0].get('time')
  # date_time_obj = datetime.strptime(time, '%Y-%m-%dT%H:%M:%SZ') + timedelta(hours=9)
  # timestamp = date_time_obj.strftime('%H:%M:%S') 
  # cpu_usage = result[0][0].get('cpu_usage')
  # memory_usage = result[0][0].get('memory_usage')
  # disk_usage = result[0][0].get('disk_usage')

  # query_power = "select power_usage from instance_node_monitoring order by desc limit 1 tz('Asia/Seoul');"
  # result_power = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "node_metric", query_power)    
  # power_usage = result_power[0][i].get('power_usage')

  # host_metric['timestamp'] = timestamp
  # host_metric['cpu_usage'] = cpu_usage
  # host_metric['memory_usage'] = memory_usage
  # host_metric['disk_usage'] = disk_usage
  # host_metric['power_usage'] = power_usage

  # timestamp_outer.append(timestamp)
  # cpu_usage_outer.append(cpu_usage)
  # memory_usage_outer.append(memory_usage)
  # disk_usage_outer.append(disk_usage)
  # power_usage_outer.append(power_usage)    

  # print(host_metric)
  return host_metric  


def get_csd_capacity():
  disk_capacity_outer = {}
  
  for i in range(1, 9): # 이미지 pull 제한으로 일단 5개만
    disk_capacity_inner = {}
    csd_num = str(i)
    query = "select disk_usage from csd" + csd_num + "_metric order by desc limit 1"
    result = influx.execute_query_influxdb(info.INFLUX_CSD_IP, info.INFLUX_CSD_PORT, info.INFLUX_CSD_USERNAME, info.PLATFORM_METRIC_DB_PASSWORD, "opencsd_management_platform", query)
    disk_capacity_inner['csd_storage_capacity'] = result[0][0].get('disk_usage')

    csd_name = "csd" + csd_num
    disk_capacity_outer[csd_name] = disk_capacity_inner

  return disk_capacity_outer

@monitoring_bp.route('/')  
def monitoring():
  # get_total_instance_metric()
  # get_instance_metric()
  return render_template('monitoring-csd.html', dashboard_summary=dashboard_summary)

# @monitoring_bp.route('/get_CSDMetric', methods=['GET'])
# def get_CSDMetric():
#   test = get_csd_metric()
#   # print(test)
#   return jsonify(test)


@monitoring_bp.route('/get_TotalHostMetric', methods=['GET'])
def get_TotalHostMetric():
    return jsonify(get_total_instance_metric())


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
  csd_metric_inner["timestamp"] = timestamp
  csd_metric_inner["cpu_usage"] = result[0][0].get('cpu_usage')
  csd_metric_inner["memory_usage"] = result[0][0].get('memory_usage')
  csd_metric_inner["network_usage"] = result[0][0].get('network_bandwidth')
  csd_metric_inner["power_usage"] = result[0][0].get('network_bandwidth')

  return csd_metric_inner