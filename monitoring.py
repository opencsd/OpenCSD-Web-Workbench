from flask import Flask, Blueprint, render_template, request, redirect, url_for, session, jsonify
from flask_cors import CORS
import datetime, json

dashboard_summary = {
    'dbms_type': 'MySQL hohoho',
    'db_name': 'tpc-h',
    'data_store_type': 'Row Base',
    'db_user': 'root',
    'db_size': '196 (GB)',
    'storage_type': 'CSD',
    'block_size': '4096 (MB)',
    'workbench_user': 'User 1234',
    'csd_count': 8,
    'csd_kind': 'NGD',
    'scheduling_algorithm': 'Csd Metric Score',
    'db_host_ip': '10.0.4.80:40001'
}

monitoring_csd = Blueprint('monitoring_csd', __name__)

@monitoring_csd.route('/monitoring')  
def monitoring():
    return render_template('monitoring-csd.html', dashboard_summary=dashboard_summary)