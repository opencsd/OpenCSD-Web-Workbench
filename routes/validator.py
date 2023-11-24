# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request, render_template

validator_bp = Blueprint('validator', __name__, url_prefix='/validator')

@validator_bp.route('/') # Validator 화면으로 전환
def validate():
    return render_template('validator.html')
