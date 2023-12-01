# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template

query_ssd_bp = Blueprint('query_ssd', __name__, url_prefix='/query_ssd')

@query_ssd_bp.route('/') # Query Pushdown 화면으로 전환
def query_ssd():
    return render_template('query-ssd.html')

# tpc-h 토글에서 선택한 쿼리 GET
@query_ssd_bp.route('/get_tpchQuery', methods=['GET', 'POST'])
def get_tpchQuery():
    if request.method == 'POST':
        data = request.json
        selected_tpch_num = data['selected_tpch_num']
        
        file_path = f'tpc-h/{selected_tpch_num}.sql'
        
        with open(file_path, 'r') as file:
            selected_tpch_query = file.read()
            
        json_data = {'selected_tpch_query': selected_tpch_query}
        
    return jsonify(json_data)