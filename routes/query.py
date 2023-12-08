# snippet_info = [
#   {
#     "filter_count": 3,
#     "group_by_count": 0,
#     "limit_exist": 0,
#     "order_by_count": 0,
#     "projection_count": 2,
#     "query_id": 0,
#     "snippet_type": 0,
#     "work_id": 0
#   },
#   {
#     "filter_count": 0,
#     "group_by_count": 0,
#     "limit_exist": 0,
#     "order_by_count": 0,
#     "projection_count": 2,
#     "query_id": 0,
#     "snippet_type": 0,
#     "work_id": 1
#   },
#   {
#     "filter_count": 1,
#     "group_by_count": 0,
#     "limit_exist": 0,
#     "order_by_count": 0,
#     "projection_count": 2,
#     "query_id": 0,
#     "snippet_type": 3,
#     "work_id": 2
#   },
#   {
#     "filter_count": 0,
#     "group_by_count": 0,
#     "limit_exist": 0,
#     "order_by_count": 0,
#     "projection_count": 1,
#     "query_id": 0,
#     "snippet_type": 1,
#     "work_id": 3
#   }
# ]


# environment_Info = {
#   "block_count": 15,
#   "csd_count": 8,
#   "csd_type": "ngd",
#   "db_name": "tpc-h",
#   "db_size": 200.0,
#   "dbms_type": "mysql",
#   "scheduling_algorithm": "dcs",
#   "storage_type": "csd",
#   "using_index": 0
# }

# logall_info = [
#   {
#     "execution_time": 3.61174,
#     "filtered_row_count": 27715,
#     "query_id": 0,
#     "query_statement": "SELECT 100.00 * SUM(CASE\n                      WHEN p_type LIKE 'promo%' THEN l_extendedprice *\n                                                     ( 1 - l_discount )\n                      ELSE 0\n                    END) / SUM(l_extendedprice * ( 1 - l_discount )) AS\n       promo_revenue\nFROM   lineitem,\n       part\nWHERE  l_partkey = p_partkey\n       AND l_shipdate >= DATE '1996-12-01'\n       AND l_shipdate < DATE '1996-12-01' + interval '1' month;",
#     "query_type": "select",
#     "scanned_row_count": 620000
#   },
#   {
#     "execution_time": 21.2035,
#     "filtered_row_count": 587494,
#     "query_id": 1,
#     "query_statement": "SELECT l_returnflag,\n       l_linestatus,\n       SUM(l_quantity)                                           AS sum_qty,\n       SUM(l_extendedprice)                                      AS sum_base_price,\n       SUM(l_extendedprice * ( 1 - l_discount ))                 AS sum_disc_price,\n       SUM(l_extendedprice * ( 1 - l_discount ) * ( 1 + l_tax )) AS sum_charge,\n       Avg(l_quantity)                                           AS avg_qty,\n       Avg(l_extendedprice)                                      AS avg_price,\n       Avg(l_discount)                                           AS avg_disc,\n       Count(*)                                                  AS count_order\nFROM   lineitem\nWHERE  l_shipdate <= DATE ('1998-12-01') - interval '108' day\nGROUP  BY l_returnflag,\n          l_linestatus\nORDER  BY l_returnflag,\n          l_linestatus;",
#     "query_type": "select",
#     "scanned_row_count": 632577
#   },
#   {
#     "execution_time": 3.58831,
#     "filtered_row_count": 27715,
#     "query_id": 2,
#     "query_statement": "SELECT 100.00 * SUM(CASE\n                      WHEN p_type LIKE 'promo%' THEN l_extendedprice *\n                                                     ( 1 - l_discount )\n                      ELSE 0\n                    END) / SUM(l_extendedprice * ( 1 - l_discount )) AS\n       promo_revenue\nFROM   lineitem,\n       part\nWHERE  l_partkey = p_partkey\n       AND l_shipdate >= DATE '1996-12-01'\n       AND l_shipdate < DATE '1996-12-01' + interval '1' month;",
#     "query_type": "select",
#     "scanned_row_count": 652577
#   }
# ]

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
    try:
        # 나중에 db_instance_name 인자로 받기!!
        query = "select db_name, dbms_type, csd_count, csd_type, db_size from db_instance_info where db_instance_name = 'keti_db'"  
        management_db = mysql.execute_query_mysql_management(query)

        query = "select * from query_environment_info" 
        instance_db = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                    info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                    info.INSTANCE_MANAGEMENT_DB_NAME, query)

        management_db_dict = management_db[0]
        instance_db_dict = instance_db[0]

        management_db_dict.update(instance_db_dict)
            
        return jsonify(management_db_dict)
    except:
        return "" 
    
# DB 스키마 -> 구현 전
@query_bp.route('/schema', methods=['GET'])
def schema_handler():
    if request.method == 'GET':
        try:
            return jsonify()
        except:
            return ""
        
# 쿼리 로그 관련 라우터
@query_bp.route('/log/<path:action>', methods=['GET', 'POST'])
def log_handler(action):
    if action.startswith('get-all'):
        if request.method == 'POST':
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
    elif action.startswith('get-one'):
        if request.method == 'POST':
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
                
                # 너무 많으면 어떻게 나타내지? -> 차트 옵션 수정해야할듯?
                # memory -> power로 바꾸기!!
                query = "select cpu_usage, memory_usage from instance_node_monitoring \
                        where time > '{}' - 5s and time < '{}' + 5s tz('Asia/Seoul')".format(start_time,end_time)
                query_metric = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                                info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                                info.INSTANCE_NODE_METRIC_DB_NAME, query)

                result = {"query_log":query_log, "query_metric":query_metric}

                return jsonify(result)
            except:
                return ""  
    elif action.startswith('delete'):
        if request.method == 'POST':
            try:
                data = request.json
                
                # 나중에 log 삭제하는것도 추가 (외래키로 잡힌 테이블 먼저 삭제해야함)

                query = "delete from query_snippet where query_id in {}".format(tuple(data['delete_query_id']))
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)

                query = "delete from query_log where query_id in {}".format(tuple(data['delete_query_id']))
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                return ""
            except:
                return "delete error"
    else:
        return "path error"

# 쿼리 로그 관련 라우터
@query_bp.route('/desc/<path:action>', methods=['GET', 'POST'])
def desc_handler(action):
    if action.startswith('snippet'):
        if request.method == 'POST':
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
    elif action.startswith('debug'):
        if request.method == 'POST':
            try:
                data = request.json
                query_id = data['query_id']

                query = "select * from instance_debug_log where query_id={}".format(query_id)
                instance_log = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                
                query = "select * from csd_debug_log where query_id={}".format(query_id)
                csd_log = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                json1 = {
                        "query_engine_log": "query_engine_log test",
                        "storage_engine_interface_log": "storage_engine_interface_log test",
                        "storage_engine_offloading_log": "storage_engine_offloading_log test",
                        "storage_engine_merging_log": "storage_engine_merging_log test",
                        "storage_engine_monitoring_log": "storage_engine_monitoring_log test",
                    }
                json2 = [{
                        "storage_id": 1,
                        "csd_log": "csd_log1 test",
                    },{
                        "storage_id": 2,
                        "csd_log": "csd_log2 test",
                    },{
                        "storage_id": 3,
                        "csd_log": "csd_log3 test",
                    },{
                        "storage_id": 4,
                        "csd_log": "csd_log4 test",
                    },{
                        "storage_id": 5,
                        "csd_log": "csd_log5 test",
                    },{
                        "storage_id": 6,
                        "csd_log": "csd_log6 test",
                    },{
                        "storage_id": 7,
                        "csd_log": "csd_log7 test",
                    },{
                        "storage_id": 8,
                        "csd_log": "csd_log8 test",
                    }]

                result = {"instance_debug_log":json1, "csd_debug_log":json2}
                
                return jsonify(result)
            except:
                return ""  
    else:
        return "path error"

# 쿼리 실행 버튼 ('RUN')
@query_bp.route('/run', methods=['GET', 'POST'])
def run_handler():
    if request.method == 'POST':
        try:
            data = request.json
            response = requests.get('http://10.0.4.87:30100/query/run', json=data) #data로 넣어도 될듯? 내일확인

            if response.status_code == 200:
                query_result = response.json()
                start_time = query_result['start_time']
                end_time = query_result['end_time']
                
                # 너무 많으면 어떻게 나타내지? -> 차트 옵션 수정해야할듯?
                # memory -> power로 바꾸기!!
                query = "select cpu_usage, memory_usage from instance_node_monitoring \
                        where time > '{}' - 5s and time < '{}' + 5s tz('Asia/Seoul')".format(start_time,end_time)
                query_metric = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                                info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                                info.INSTANCE_NODE_METRIC_DB_NAME, query)

                result = {"query_result":query_result, "query_metric":query_metric[0]}

                return jsonify(result)
            else:
                return 'Error: Unable to fetch data from the remote server'
        except:
            return ""
        

# Metric 그래프 데이터 요청
@query_bp.route('/metric', methods=['GET', 'POST'])
def metric_handler():
    if request.method == 'GET':
        try:
            # memory -> power로 바꾸기!!
            query = "select cpu_usage, memory_usage from instance_node_monitoring order by time desc limit 10 tz('Asia/Seoul')"
            metric = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                            info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                            info.INSTANCE_NODE_METRIC_DB_NAME, query)
            return jsonify(metric[0])
        except:
            return ""
    
    elif request.method == 'POST':
        try:
            data = request.json
            start_time = data['start_time'] #yyyy-mm-ff hh:mm:ss
            end_time = data['end_time']

            # 너무 많으면 어떻게 나타내지? -> 차트 옵션 수정해야할듯?
            # memory -> power로 바꾸기!!
            query = "select cpu_usage, memory_usage from instance_node_monitoring \
                    where time > '{}' - 5s and time < '{}' + 5s tz('Asia/Seoul')".format(start_time,end_time)
            query_metric = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT,
                                            info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD,
                                            info.INSTANCE_NODE_METRIC_DB_NAME, query)

            return jsonify(query_metric)
        except:
                return ""
