# -*- coding: utf-8 -*-

snippet_info = [
    {
        "work_id": 0,
        "type": "CSD_Scan",
        "projection": 2,
        "filter": 2,
        "order_by": 0,
        "group_by": 0,
        "limit": 0
    },
    {
        "work_id": 1,
        "type": "CSD_Scan",
        "projection": 0,
        "filter": 2,
        "order_by": 0,
        "group_by": 0,
        "limit": 0
    },
    {
        "work_id": 2,
        "type": "Inner_Join",
        "projection": 2,
        "filter": 1,
        "order_by": 0,
        "group_by": 0,
        "limit": 0
    },
    {
        "work_id": 3,
        "type": "Aggregation",
        "projection": 1,
        "filter": 0,
        "order_by": 0,
        "group_by": 0,
        "limit": 0
    }
]

from flask import Blueprint, jsonify, request, render_template

query_bp = Blueprint('query', __name__, url_prefix='/query')

@query_bp.route('/') # Query Pushdown 화면으로 전환
def query():
    return render_template('query-csd.html')

@query_bp.route('/queryLog_detail')
def queryLog_detail():
    return 

# tpc-h 토글에서 선택한 쿼리 GET
@query_bp.route('/get_tpchQuery', methods=['GET', 'POST'])
def get_tpchQuery():
    if request.method == 'POST':
        data = request.json
        selected_tpch_num = data['selected_tpch_num']
        
        file_path = f'tpc-h/{selected_tpch_num}.sql'
        
        with open(file_path, 'r') as file:
            selected_tpch_query = file.read()
            
        json_data = {'selected_tpch_query': selected_tpch_query}
        
    return jsonify(json_data)

@query_bp.route('/get_querySnippetInfo', methods=['GET'])
def get_querySnippetInfo():
    # db와 연결해서 스니펫 정보 불러오기
    return jsonify(snippet_info)