# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_cors import CORS
import datetime, json

app = Flask(__name__,template_folder= 'templates')
app.secret_key = 'dbms09!'
CORS(app)

dashboard_summary = {
    'db_name': 'tpc-h',
    'dbms_type': 'mysql',
    'data_storage_type': 'row',
    'storage_type': 'csd',
    'csd_count': 8,
    'csd_kind': 'ngd',
    'dbms_size': '64',
    'block_size': '4096',
    'scheduling_algorithm': 'csd metric score',
    'db_account_name': 'keti',
    'user_id': 'keti',
    'db_host_ip': '10.0.4.80:40001'
}

@app.route('/')
def index():
    return render_template('index.html')

# 접속 페이지
@app.route('/connect', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # return redirect(url_for('monitoring')) #why?
        data = request.json
        workbench_user_id = data['workbench_user_id']
        if workbench_user_id == "keti_opencsd":
            return render_template('db_monitoring.html')
        elif workbench_user_id == "keti_mysql":
            return render_template('db_monitoring_ssd.html')
    return render_template('index.html') 

@app.route('/monitoring_ssd')  
def monitoring_ssd():
    return render_template('db_monitoring_ssd.html', dashboard_summary=dashboard_summary)

@app.route('/monitoring')  
def monitoring():
    return render_template('db_monitoring.html', dashboard_summary=dashboard_summary)

# DB Monitoring
@app.route('/monitoring/environment', methods=['GET'])
def db_info():
    # DB로부터 DB 환경정보 가져옴
    return render_template('db_monitoring.html', dashboard_summary=dashboard_summary)

# DB Monitoring Graph 정보
@app.route('/monitoring/ddl', methods=['GET'])
def ddl():
    return

@app.route('/monitoring/disk_rw', methods=['GET'])
def disk_rw():
    return

@app.route('/monitoring/chache_hit', methods=['GET'])
def chache_hit():
    return

@app.route('/monitoring/chache_usg', methods=['GET'])
def chache_usg():
    return

@app.route('/monitoring/scan_filter', methods=['GET'])
def scan_filter():
    return

@app.route('/monitoring/cpu', methods=['GET'])
def cpu_usg():
    return

@app.route('/monitoring/memory', methods=['GET'])
def memory_usg():
    return

@app.route('/monitoring/power', methods=['GET'])
def power_usg():
    return

@app.route('/monitoring/disk', methods=['GET'])
def disk_usg():
    return

@app.route('/query') # Query Pushdown 화면으로 전환
def query():
    return render_template('query.html')

@app.route('/query_ssd') # Query Pushdown 화면으로 전환
def query_ssd():
    return render_template('query_ssd.html')

@app.route('/simulate') # Query Pushdown 화면으로 전환
def simulate():
    return render_template('simulate.html')

# Query Pyshdown
@app.route('/query/environment')
def query_info():
    # DB로부터 쿼리 수행 DB 환경정보 가져옴
    return


if __name__ == '__main__':
    app.run(host="127.0.0.1", port="9091", debug=True)