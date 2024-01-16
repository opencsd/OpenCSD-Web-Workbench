# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template
from connectDB import mysql, influx, info
from datetime import datetime
from prettytable import PrettyTable

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

# DB 환경정보 - 구현 전
@query_ssd_bp.route('/environment', methods=['GET'])
def environment_handler():
    if request.method == 'GET':
        try:
            result = {
                "db_name" : "TPC-H",
                "dbms_type" : "MySQL",
                "db_size" : "1089.8",
                "storage_type" : "SSD"
            }

            return jsonify(result)
        except:
            return ""

# DB 스키마
@query_ssd_bp.route('/schema', methods=['GET'])
def schema_handler():
    if request.method == 'GET':
        try:
            schema = {}

            query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = SCHEMA()"
            result = mysql.execute_query_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT,
                                                info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD,
                                                info.MYSQL_DB_NAME, query)
    
            for arg in result:
                table_name = arg['TABLE_NAME']
                query = "SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE \
                        FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = SCHEMA() \
                        AND TABLE_NAME = '{}'".format(table_name)

                result = mysql.execute_query_mysql(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT,
                                                    info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD,
                                                    info.MYSQL_DB_NAME, query)
                schema[table_name] = result

            return jsonify(schema)
        except:
            return ""
        
# 쿼리 실행 버튼 ('RUN')
@query_ssd_bp.route('/run', methods=['GET', 'POST'])
def run_handler():
    if request.method == 'POST':
        try:
            data = request.json
            
            start_time = datetime.now()

            query_result = mysql.execute_query_mysql_get_string_result(info.MYSQL_DB_HOST, info.MYSQL_DB_PORT,
                                                                    info.MYSQL_DB_USER, info.MYSQL_DB_PASSWORD,
                                                                    info.MYSQL_DB_NAME, data['query'])    
                        
            end_time = datetime.now()

            query = "select cpu_usage_tick, power_usage from node_monitoring \
                        where time > '{}' - 5s and time < '{}' + 5s order by time desc limit 10 tz('Asia/Seoul')".format(start_time,end_time)
            
            query_metric = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                            info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                            info.INSTANCE_NODE_METRIC_DB_NAME, query)
                        
            execution_time = (end_time - start_time)
        
            result = {"result":query_result.get_string(), "query_metric":query_metric[0], "execution_time":str(execution_time)}
            
            return jsonify(result)
        except:
            return ""

# Metric 그래프 데이터 요청
@query_ssd_bp.route('/metric', methods=['GET', 'POST'])
def metric_handler():
    if request.method == 'GET':
        try:
            # memory -> power로 바꾸기!!
            query = "select cpu_usage_tick, power_usage from node_monitoring order by time desc limit 10 tz('Asia/Seoul')"
            metric = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                            info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                            info.INSTANCE_NODE_METRIC_DB_NAME, query)
            return jsonify(metric[0])
        except:
            return ""