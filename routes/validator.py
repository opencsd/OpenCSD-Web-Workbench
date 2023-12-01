# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template

validator_bp = Blueprint('validator', __name__, url_prefix='/validator')

@validator_bp.route('/') # Validator 화면으로 전환
def validate():
    return render_template('validator.html')

# tpc-h 토글에서 선택한 쿼리 전송
@validator_bp.route('/get_tpchQuery')
def get_tpchQuery():
    return jsonify()

# 시뮬레이터 실행
@validator_bp.route('/validation')
def validation():
    return 