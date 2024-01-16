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
from connectDB import influx, info
import sys, os

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
monitoring_bp = Blueprint('monitoring', __name__, url_prefix='/monitoring')

@monitoring_bp.route('/') 
def monitoring():
    return render_template('monitoring-csd.html', dashboard_summary=dashboard_summary)

# Metric 그래프 데이터 요청
@monitoring_bp.route('/metric', methods=['GET', 'POST'])
def metric_handler():
    if request.method == 'GET':
        try:
            query = "select * from node_monitoring order by time desc limit 10 tz('Asia/Seoul')"
            host_metric = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                            info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                            info.INSTANCE_NODE_METRIC_DB_NAME, query)

            query = "select * from pod_monitoring order by time desc limit 10 tz('Asia/Seoul')"
            instance_metric = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                            info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                            info.INSTANCE_METRIC_DB_NAME, query)

            result = {"host_metric":host_metric[0], "instance_metric":instance_metric[0]}

            return jsonify(result)
            
        except:
            return ""
        
@monitoring_bp.route('/csd/<path:action>', methods=['GET', 'POST'])
def csd_handler(action):
    if action.startswith('capacity'):
        if request.method == 'GET':
            try:
                result = {}
                for csd_id in range(1, 9):
                  query = "select disk_total, disk_usage from csd{}_metric order by desc limit 1".format(csd_id)
                  metric = influx.execute_query_influxdb(info.PLATFORM_METRIC_DB_HOST, info.PLATFORM_METRIC_DB_PORT,
                                                              info.PLATFORM_METRIC_DB_USER, info.PLATFORM_METRIC_DB_PASSWORD,
                                                              info.INFLUX_CSD_DB, query)
                  result[csd_id] = metric[0][0]
                return jsonify(result)
            except:
                return ""
    elif action.startswith('metric'):
        if request.method == 'POST':
            try:
                data = request.json
                csd_id = data['csd_id']

                query = "select cpu_usage, memory_usage, network_rx_byte, network_tx_byte from csd{}_metric order by desc limit 10".format(csd_id)
                result = influx.execute_query_influxdb(info.PLATFORM_METRIC_DB_HOST, info.PLATFORM_METRIC_DB_PORT,
                                                              info.PLATFORM_METRIC_DB_USER, info.PLATFORM_METRIC_DB_PASSWORD,
                                                              info.INFLUX_CSD_DB, query)
                return jsonify(result[0])
            except:
                return ""
