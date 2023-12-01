# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template

query_bp = Blueprint('query', __name__, url_prefix='/query')

@query_bp.route('/') # Query Pushdown 화면으로 전환
def query():
    return render_template('query-csd.html')

@query_bp.route('/queryLog_detail')
def queryLog_detail():
    return 