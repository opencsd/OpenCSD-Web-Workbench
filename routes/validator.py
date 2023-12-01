# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template

validator_bp = Blueprint('validator', __name__, url_prefix='/validator')

@validator_bp.route('/') # Validator 화면으로 전환
def validate():
    return render_template('validator.html')

# tpc-h 토글에서 선택한 쿼리 전송
@validator_bp.route('/get_tpchQuery', methods=['GET', 'POST'])
def get_tpchQuery():
    if request.method == 'POST':
        data = request.json
        selected_tpch_num = data['selected_tpch_num']
        
        file_path = f'tpc-h/{selected_tpch_num}.sql'
        
        with open(file_path, 'r') as file:
            selected_tpch_query = file.read()
            
        json_data = {'selected_tpch_query': selected_tpch_query}
        
    return jsonify(json_data)

# 시뮬레이터 실행
@validator_bp.route('/validation')
def validation():
    return 
