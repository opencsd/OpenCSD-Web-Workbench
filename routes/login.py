# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template

login_bp = Blueprint('login', __name__)

@login_bp.route('/')
def index():
    return render_template('index.html')

@login_bp.route('/connect', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.json
        workbench_user_id = data['workbench_user_id']
        db_instance_name = data['db_instance_name']
        print(data)
        if workbench_user_id == "keti_opencsd":
            print("Login to CSD")
            return jsonify({'loginto': 'csd'})
        elif workbench_user_id == "keti_mysql":
            print("Login to SSD")
            return jsonify({'loginto': 'ssd'})
    return render_template('index.html') 