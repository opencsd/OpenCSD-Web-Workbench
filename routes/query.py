# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template
from connectDB import mysql, influx, info
import requests

query_bp = Blueprint('query', __name__, url_prefix='/query')

@query_bp.route('/') # Query Pushdown 화면으로 전환
def query():
    return render_template('query-csd.html')

# tpc-h 드롭다운에서 선택한 쿼리 GET
@query_bp.route('/tpch', methods=['GET', 'POST'])
def tpch_hadler():
    if request.method == 'POST':
        data = request.json
        selected_tpch_num = data['selected_tpch_num']
        
        file_path = f'tpc-h/{selected_tpch_num}.sql'
        
        with open(file_path, 'r') as file:
            selected_tpch_query = file.read()
            
        json_data = {'selected_tpch_query': selected_tpch_query}
        
    return jsonify(json_data)

# opencsd 환경정보 획득
@query_bp.route('/environment', methods=['GET'])
def environment_hadler():
    # 나중에 db_instance_name 인자로 받기!!
    query = "select db_name, dbms_type, storage_type, csd_count, csd_type, db_size from db_instance_info where db_instance_name = 'opencsd'"
        
    management_db = mysql.execute_query_mysql_management(query)

    query = "select * from query_environment_info"
        
    instance_db = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                info.INSTANCE_MANAGEMENT_DB_NAME, query)

    management_db_dict = management_db[0]
    instance_db_dict = instance_db[0]

    management_db_dict.update(instance_db_dict)
        
    return jsonify(management_db_dict)

# # 쿼리 로그, 한 페이지 최대값은 10
# @query_bp.route('/log-all', methods=['GET', 'POST'])
# def log_all_hadler():
#     try:
#         data = request.json
#         user_id = data['user_id']
#         query_type = data['query_type'] #'all', 'select','update','insert','delete','dcl','ddl','other'
#         page = data['page']
#         index = page * 10 -10

#         if query_type == "all":
#             query = "select query_id, query_statement, query_type, execution_time, scanned_row_count, filtered_row_count \
#                 from query_log where user_id='{}' order by query_id limit {},10".format(user_id,index)
#         else:
#             query = "select query_id, query_statement, query_type, execution_time, scanned_row_count, filtered_row_count \
#                 from query_log where user_id='{}' and query_type='{}' order by query_id limit {},10".format(user_id,query_type,index)

#         result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
#                                                     info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
#                                                     info.INSTANCE_MANAGEMENT_DB_NAME, query)
#         return jsonify(result)
#     except:
#         return "" 

# 쿼리 로그, 10개 이상은 스크롤
@query_bp.route('/log-all', methods=['GET', 'POST'])
def log_all_hadler():
    try:
        data = request.json
        user_id = data['user_id']
        query_type = data['query_type'] #'all', 'select','update','insert','delete','dcl','ddl','other'

        if query_type == "all": #'all'
            query = "select query_id, query_statement, query_type, execution_time, scanned_row_count, filtered_row_count \
                from query_log where user_id='{}' order by query_id".format(user_id)
        else: #'select','update','insert','delete','dcl','ddl','other'
            query = "select query_id, query_statement, query_type, execution_time, scanned_row_count, filtered_row_count \
                from query_log where user_id='{}' and query_type='{}' order by query_id".format(user_id,query_type)

        result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                    info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                    info.INSTANCE_MANAGEMENT_DB_NAME, query)
    
        return jsonify(result)
    except:
        return "" 
    
# 특정 쿼리 클릭 시
@query_bp.route('/log', methods=['GET', 'POST'])
def log_handler():
    try:
        data = request.json
        user_id = data['query_id']

        query = "select query_id, query_statement, query_result, query_type, execution_time, start_time, end_time, \
                scanned_row_count, filtered_row_count, snippet_count from query_log where query_id='{}'".format(user_id)
        
        query_log = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                    info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                    info.INSTANCE_MANAGEMENT_DB_NAME, query)
        
        start_time = query_log[0]['start_time']
        end_time = query_log[0]['end_time']
        
        # 너무 많으면 어떻게 나타내지?
        query = "select node_cpu_usage from instace_monitoring \
                where time > '{}' and time < '{}'".format(start_time,end_time)
        
        query_metric = influx.execute_query_influxdb(info.PLATFORM_METRIC_DB_HOST, info.PLATFORM_METRIC_DB_PORT,
                                            info.PLATFORM_METRIC_DB_USER, info.PLATFORM_METRIC_DB_PASSWORD,
                                            info.PLATFORM_METRIC_DB_NAME, query) # DB 위치 체크 필요 -> 구현 전

        cpu_metric = [{"cpu":1},{"cpu":2},{"cpu":3}]
        power_metric = [{"power":1},{"power":2},{"power":3}]

        result = {"query_log":query_log, "cpu_metric":cpu_metric, "power_metric":power_metric}

        return jsonify(result)
    except:
        return ""                          
    
# 선택 쿼리 로그 삭제 -> 구현 전
@query_bp.route('/delete', methods=['GET', 'POST'])
def delete_handler():
    if request.method == 'POST':
        try:
            data = request.json
            delete_query_id = data['delete_query_id'] #[ids...]
            print(delete_query_id)
            
            # 나중에 log 삭제하는것도 추가

            query = "delete from query_snippet where query_id in {}".format(tuple(delete_query_id))
            print(query)

            result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                        info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                        info.INSTANCE_MANAGEMENT_DB_NAME, query)

            query = "delete from query_log where query_id in {}".format(tuple(delete_query_id))
            print(query)

            result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                        info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                        info.INSTANCE_MANAGEMENT_DB_NAME, query)
            return jsonify(result)
        except:
            return ""

# 쿼리 로그의 쿼리 스니펫 팝업
@query_bp.route('/snippet', methods=['GET', 'POST'])
def snippet_handler():
    try:
        data = request.json
        query_id = data['query_id']

        query = "select * from query_snippet where query_id={}".format(query_id)

        result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                    info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                    info.INSTANCE_MANAGEMENT_DB_NAME, query)
        return jsonify(result)
    except:
        return ""
    

# 쿼리 로그의 쿼리 수행 로그 팝업 -> 구현 전
@query_bp.route('/debugg', methods=['GET', 'POST'])
def debugg_handler():
    try:
        data = request.json
        query_id = data['query_id']

        query = "select * from storage_engine_log where query_id={}".format(query_id)

        storage_engnie_log = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                    info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                    info.INSTANCE_MANAGEMENT_DB_NAME, query)
        
        query = "select * from csd_log where query_id={}".format(query_id)

        csd_log = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                    info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                    info.INSTANCE_MANAGEMENT_DB_NAME, query)
        json1 = jsonify(storage_engnie_log)
        json2 = jsonify(csd_log)

        json1.update(json2)
        result = json1
        
        return jsonify(result)
    except:
        return ""

# 쿼리 실행 버튼 ('RUN')
@query_bp.route('/run', methods=['GET', 'POST'])
def run_handler():
    if request.method == 'POST':
        data = request.json
        execute_query = data['query']
        user_id = data['user_id']

        payload = dict(query=execute_query, user_id=user_id)
        response = requests.get('http://10.0.4.87:30100/query/run', json=payload)

        if response.status_code == 200:
            query_run_result = response.json()
            # start_time = query_run_result['start_time']
            # end_time = query_run_result['end_time']
            
            # 너무 많으면 어떻게 나타내지?
            # query = "select node_cpu_usage from instace_monitoring \
            #         where time > '{}' and time < '{}'".format(start_time,end_time)
            
            # print(query_run_result)
            # print(query)
            
            # query_metric = influx.execute_query_influxdb(info.PLATFORM_METRIC_DB_HOST, info.PLATFORM_METRIC_DB_PORT,
            #                                     info.PLATFORM_METRIC_DB_USER, info.PLATFORM_METRIC_DB_PASSWORD,
            #                                     info.PLATFORM_METRIC_DB_NAME, query) # DB 위치 체크 필요 -> 구현 전

            # cpu_metric = [{"cpu":1},{"cpu":2},{"cpu":3}]
            # power_metric = [{"power":1},{"power":2},{"power":3}]

            return jsonify(query_run_result)
        else:
            return 'Error: Unable to fetch data from the remote server'

# Metric 그래프 데이터 요청
@query_bp.route('/metric', methods=['GET', 'POST'])
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