# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template

query_ssd_bp = Blueprint('query_ssd', __name__, url_prefix='/query_ssd')

@query_ssd_bp.route('/') # Query Pushdown 화면으로 전환
def query_ssd():
    return render_template('query-ssd.html')
