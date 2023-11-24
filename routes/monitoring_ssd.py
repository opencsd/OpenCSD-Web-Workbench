# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template

monitoring_ssd_bp = Blueprint('monitoring_ssd', __name__, url_prefix='/monitoring_ssd')

# DB Monitoring - SSD
@monitoring_ssd_bp.route('/')  
def monitoring_ssd():
    return render_template('monitoring-ssd.html')