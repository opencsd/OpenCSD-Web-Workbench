# -*- coding: utf-8 -*-

from flask import Flask
from routes import login, monitoring, monitoring_ssd, query, query_ssd, validator, validator_ssd
from flask_cors import CORS

app = Flask(__name__, template_folder='templates')
# app.secret_key = 'dbms09!'
CORS(app)

app.register_blueprint(login.login_bp)
app.register_blueprint(monitoring.monitoring_bp)
app.register_blueprint(query.query_bp)
app.register_blueprint(validator.validator_bp)
app.register_blueprint(monitoring_ssd.monitoring_ssd_bp)
app.register_blueprint(query_ssd.query_ssd_bp)
app.register_blueprint(validator_ssd.validator_ssd_bp)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=30803, debug=True)
    # app.run(host="0.0.0.0", port=40803, debug=True, ssl_context=('cert.pem', 'key.pem'))
