# -*- coding: utf-8 -*-

from flask import Flask, send_file
from routes import login, monitoring, monitoring_ssd, query, query_ssd, validator, validator_ssd
from flask_cors import CORS
import logging
import os
from logging.handlers import RotatingFileHandler

app = Flask(__name__, template_folder='templates')

app.secret_key = 'ketidbms!'
CORS(app)

app.register_blueprint(login.login_bp)
app.register_blueprint(monitoring.monitoring_bp)
app.register_blueprint(query.query_bp)
app.register_blueprint(validator.validator_bp)
app.register_blueprint(monitoring_ssd.monitoring_ssd_bp)
app.register_blueprint(query_ssd.query_ssd_bp)
app.register_blueprint(validator_ssd.validator_ssd_bp)
@app.route('/favicon.ico')
def favicon():
    favicon_path = os.path.join(app.root_path, 'favicon.ico')
    if os.path.exists(favicon_path):
        return send_file(favicon_path, mimetype='image/vnd.microsoft.icon')
    return '', 204  # 파일이 없을 경우 204 응답 (No Content)

if __name__ == '__main__':
    handler = RotatingFileHandler('app.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.DEBUG)
    app.logger.addHandler(handler)
    app.run(host="0.0.0.0", port=40805, debug=True)
