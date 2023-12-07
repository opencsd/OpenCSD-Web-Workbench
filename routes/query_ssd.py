# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template
from connectDB import mysql, influx, info
import requests

query_ssd_bp = Blueprint('query_ssd', __name__, url_prefix='/query-ssd')

@query_ssd_bp.route('/') # Query Pushdown 화면으로 전환
def query_ssd():
    return render_template('query-ssd.html')

# tpc-h 토글에서 선택한 쿼리 GET
@query_ssd_bp.route('/tpch', methods=['GET', 'POST'])
def tpch_hadler():
    if request.method == 'POST':
        data = request.json
        selected_tpch_num = data['selected_tpch_num']
        
        file_path = f'tpc-h/{selected_tpch_num}.sql'
        
        with open(file_path, 'r') as file:
            selected_tpch_query = file.read()
            
        json_data = {'selected_tpch_query': selected_tpch_query}
        
    return jsonify(json_data)
   
# 쿼리 실행 버튼 ('RUN')
@query_ssd_bp.route('/run', methods=['GET', 'POST'])
def run_handler():
    if request.method == 'POST':
        try:
            data = request.json
            query = data['query']

            result = influx.execute_query_influxdb(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT,
                                                info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD,
                                                info.MYSQL_DB_NAME, query)
            return jsonify(result)
        except:
            return ""

# Metric 그래프 데이터 요청
@query_ssd_bp.route('/metric', methods=['GET', 'POST'])
def metric_handler():
    if request.method == 'GET':
        try:
            query = "select node_cpu_usage, node_power_usage from instace_monitoring order by time desc limit 10"
            result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                                info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                                info.INSTANCE_METRIC_DB_NAME, query)
            return jsonify(result)
        except:
            return ""
    
    elif request.method == 'POST':
        try:
            data = request.json
            start_time = data['start_time'] #yyyy-mm-ff hh:mm:ss
            end_time = data['end_time']

            # 너무 많으면 어떻게 나타내지?
            query = "select node_cpu_usage, node_power_usage from instace_monitoring \
                    where time > '{}' and time < '{}'".format(start_time,end_time)
            result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                                info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                                info.INSTANCE_METRIC_DB_NAME, query)
            return jsonify(result)
        except:
                return ""