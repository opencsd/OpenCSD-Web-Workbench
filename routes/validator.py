# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template
from connectDB import mysql, influx, info
import requests
import re

validator_bp = Blueprint('validator', __name__, url_prefix='/validator')

@validator_bp.route('/') # Validator 화면으로 전환
def validate():
    return render_template('validator.html')

# tpc-h 드롭다운에서 선택한 쿼리 GET
@validator_bp.route('/tpch', methods=['GET', 'POST'])
def tpch_hadler():
    if request.method == 'POST':
        data = request.json
        selected_tpch_num = data['selected_tpch_num']
        
        file_path = f'tpc-h/{selected_tpch_num}.sql'
        
        with open(file_path, 'r') as file:
            selected_tpch_query = file.read()
            
        json_data = {'selected_tpch_query': selected_tpch_query}
        
    return jsonify(json_data)

# 벨리데이션 실행
@validator_bp.route('/run', methods=['GET', 'POST'])
def run_handler():
    if request.method == 'POST':
        try:
            data = request.json # data 형식 체크
            user_id = data['User_ID']
            response = requests.post('http://10.0.4.87:30000/validator/run', json=data)
            print(response)

            if response.status_code == 200:
                result = response.content
                result = str(result)
                validation_num = re.sub(r'[^0-9]','',result)

                query = "select * from validation_log where user_id = \"{}\" and validation_id = {}".format(user_id, validation_num)
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)

                return jsonify(result)
            else:
                return 'Error: Unable to fetch data from the remote server'
        except:
            return ""
        
@validator_bp.route('/option/<path:action>', methods=['GET', 'POST'])
def option_handler(action):
    if action.startswith('get-all'):
        if request.method == 'POST':
            try:
                data = request.json
                user_id = data['user_id']
                query = "select * from validation_option where user_id={}".format(user_id)
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                return jsonify(result)
            except:
                return "get error\n"
    elif action.startswith('get-one'):

        if request.method == 'POST':
            try:
                data = request.json
                option_id = data['option_id']

                query = "select * from validation_option where option_id={}".format(option_id)
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)

                return jsonify(result)
            except:
                return "get-one error\n"
    elif action.startswith('insert'):
        if request.method == 'POST':
            try:
                data = request.json #옵션 내용 전부

                query = "select MAX(option_id) as id from validation_option"
                option_id = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                print(option_id[0]['id'] + 1)
                query = "insert validation_option values ({},\"{}\",\"{}\",\"{}\",\"{}\",{},\"{}\",{},\"{}\",{})" \
                    .format(option_id[0]['id'] + 1,data['option_name'],data['user_id'],data['dbms_type'],data['storage_type'] \
                            ,data['csd_count'],data['csd_type'],data['block_count'],data['scheduling_algorithm'],data['using_index'],)
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                return str(option_id[0]['id'] + 1) + "\n"
            except:
                return "insert error"
    elif action.startswith('update'):
        if request.method == 'POST':
            try:
                data = request.json #옵션 내용 전부

                query = "update validation_option set option_name=\"{}\", user_id=\"{}\", dbms_type=\"{}\",storage_type=\"{}\",\
                        csd_count={}, csd_type=\"{}\", block_count={}, scheduling_algorithm=\"{}\", using_index={} \
                        where option_id={}".format(data['option_name'],data['user_id'],data['dbms_type'],data['storage_type'],
                                                    data['csd_count'],data['csd_type'],data['block_count'],
                                                    data['scheduling_algorithm'],data['using_index'],data['option_id'])
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                return "SUCCESS\n"
            except:
                return "update error"
    elif action.startswith('delete'):
        if request.method == 'POST':
            try:
                # 옵션을 삭제하면 옵션으로 돌린 로그도 전부 삭제해야함 -> 그렇게해...?
                data = request.json #옵션 id
                
                query = "delete from validation_snippet where option_id in {}".format(tuple(data['option_id']))
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                
                query = "delete from validation_csd_metric where option_id in {}".format(tuple(data['option_id']))
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)

                query = "delete from validation_log where option_id in {}".format(tuple(data['option_id']))
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                
                query = "delete from validation_option where option_id in {}".format(tuple(data['option_id']))
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                
                return "SUCCESS\n"
            except:
                return "delete error"
    else:
        return "path error"
    
# 벨리데이션 로그 관련 라우터
@validator_bp.route('/log/<path:action>', methods=['GET', 'POST'])
def log_handler(action):
    if action.startswith('get-all'):
        if request.method == 'POST':
            try:
                data = request.json
                query = "select * from validation_log where user_id='{}'".format(data['user_id'])
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                return jsonify(result)
            except:
                return "get-all error"
    elif action.startswith('get-one'):
        if request.method == 'POST':
            try:
                data = request.json
                query = "select * from validation_log where validation_id={} and user_id = \"{}\"".format(data['validation_id'],data['user_id'])

                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                            info.INSTANCE_MANAGEMENT_DB_NAME, query)
                return jsonify(result)
            except:
                return "get-one error"
    elif action.startswith('delete'):
        if request.method == 'POST':
            try:
                data = request.json #벨리데이션 id

                if(len(data['validation_id']) == 1):
                    query = "delete from validation_snippet where validation_id={}".format(tuple(data['validation_id'])[0])

                    result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                                info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                                info.INSTANCE_MANAGEMENT_DB_NAME, query)
                                        
                    query = "delete from validation_csd_metric where validation_id={}".format(tuple(data['validation_id'])[0])
                    result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                                info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                                info.INSTANCE_MANAGEMENT_DB_NAME, query)
                    
                    query = "delete from validation_debug_log where validation_id={}".format(tuple(data['validation_id'])[0])
                    result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                                info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                                info.INSTANCE_MANAGEMENT_DB_NAME, query)

                    query = "delete from validation_log where validation_id={}".format(tuple(data['validation_id'])[0])
                    result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                                info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                                info.INSTANCE_MANAGEMENT_DB_NAME, query)
                    
                else:
                    query = "delete from validation_snippet where validation_id in {}".format(tuple(data['validation_id']))

                    result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                                info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                                info.INSTANCE_MANAGEMENT_DB_NAME, query)
                    
                    query = "delete from validation_csd_metric where validation_id in {}".format(tuple(data['validation_id']))
                    result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                                info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                                info.INSTANCE_MANAGEMENT_DB_NAME, query)
                    
                    query = "delete from validation_debug_log where validation_id in {}".format(tuple(data['validation_id'])[0])
                    result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                                info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                                info.INSTANCE_MANAGEMENT_DB_NAME, query)

                    query = "delete from validation_log where validation_id in {}".format(tuple(data['validation_id']))
                    result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                                info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                                info.INSTANCE_MANAGEMENT_DB_NAME, query)
                    
                return {}
            except:
                return "delete error"
    else:
        return "path error"
    
# 벨리데이션 로그의 스니펫 상세 팝업
@validator_bp.route('/snippet', methods=['GET', 'POST'])
def snippet_handler():
    if request.method == 'POST':
        try:
            data = request.json

            query = "select * from validation_snippet where validation_id={}".format(data['validation_id'])
            result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                        info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                        info.INSTANCE_MANAGEMENT_DB_NAME, query)
            #리턴 형식 확인하고 맞춰주기
            return jsonify(result)
        except:
            return ""
        

# 벨리데이션 로그의 메트릭 상세 팝업
@validator_bp.route('/metric/<path:action>', methods=['GET', 'POST'])
def metric_handler(action):
    if action.startswith('csd'):
        if request.method == 'POST':
            try:
                data = request.json

                query = "select * from validation_csd_metric where validation_id={}".format(data['validation_id'])
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                         info.INSTANCE_MANAGEMENT_DB_NAME, query)

                #리턴 형식 확인하고 맞춰주기
                return jsonify(result)
            except:
                return ""
    elif action.startswith('log'):
        if request.method == 'POST':
            try:
                data = request.json

                query = "select * from validation_log where validation_id={}".format(data['validation_id'])
                result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                           info.INSTANCE_MANAGEMENT_DB_NAME, query)
                return jsonify(result)
            except:
                return ""
    # 벨리데이션 로그 메트릭 상세 팝업
    elif action.startswith('getAll'):
        if request.method == 'POST':
            try: 
                data = request.json
                print(data)
                query1 = "select execution_time_predict, storage_cpu_usage_predict, storage_power_usage_predict, network_usage_predict from validation_log where validation_id={}".format(data['validation_id'])
                result1 = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                           info.INSTANCE_MANAGEMENT_DB_NAME, query1)
                query2 = "select * from validation_csd_metric where validation_id={}".format(data['validation_id'])
                result2 = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                            info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                           info.INSTANCE_MANAGEMENT_DB_NAME, query2)
                combined_result = {'result1' : result1, 'result2' : result2}

                return jsonify(combined_result)
            except:
                return ""
        
# 벨리데이션 로그의 쿼리 수행 로그 팝업 -> 구현...필요...,db도 만들고
@validator_bp.route('/debugg', methods=['GET', 'POST'])
def debugg_handler():
    try:
        data = request.json #벨리데이션 id

        query = "select * from validation_debug_log where validation_id={}".format(data['validation_id'])
        result = mysql.execute_query_mysql(info.INSTANCE_MANAGEMENT_DB_HOST, info.INSTANCE_MANAGEMENT_DB_PORT,
                                                    info.INSTANCE_MANAGEMENT_DB_USER, info.INSTANCE_MANAGEMENT_DB_PASSWORD,
                                                    info.INSTANCE_MANAGEMENT_DB_NAME, query)
        
        temp = {
            "validation_log": "validation_log test",
        }
        
        return jsonify(temp)
    except:
        return ""
