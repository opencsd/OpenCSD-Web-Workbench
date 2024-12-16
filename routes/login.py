# # -*- coding: utf-8 -*-

# from flask import Blueprint, jsonify, request, render_template, redirect

# login_bp = Blueprint('login', __name__)

# @login_bp.route('/')
# def index():
#     return render_template('index.html')

# @login_bp.route('/connect', methods=['POST'])
# def login():
#     if request.method == 'POST':
#         data = request.json
#         workbench_user_id = data['workbench_user_id']
#         # db_instance_name = data['db_instance_name']
#         # print(data)
#         # 입력한 DB 연결해서 유저 아이디와 패스워드 일치하는지 확인
#         if workbench_user_id == "keti-opencsd-admin":
#             print("Login to CSD")
#             return jsonify({'redirect_url': '/monitoring'}), 200
#         elif workbench_user_id == "keti-mysql-admin":
#             print("Login to SSD")
#             return jsonify({'redirect_url': '/monitoring-ssd'}), 200
#     return render_template('index.html')


# -*- coding: utf-8 -*-
from flask import Blueprint, jsonify, request, render_template, make_response

login_bp = Blueprint('login', __name__)

@login_bp.route('/')
def index():
    return render_template('index.html')
