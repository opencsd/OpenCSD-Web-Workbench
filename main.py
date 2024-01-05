# -*- coding: utf-8 -*-

from flask import Flask, session
from routes import login, monitoring, monitoring_ssd, query, query_ssd, validator, validator_ssd
from influxdb import InfluxDBClient
app = Flask(__name__, template_folder='templates')
app.secret_key = 'dbms09!'

app.register_blueprint(login.login_bp)
app.register_blueprint(monitoring.monitoring_bp)
app.register_blueprint(query.query_bp)
app.register_blueprint(validator.validator_bp)
app.register_blueprint(monitoring_ssd.monitoring_ssd_bp)
app.register_blueprint(query_ssd.query_ssd_bp)
app.register_blueprint(validator_ssd.validator_ssd_bp)

if __name__ == '__main__':
    app.run(host="10.0.4.87", port=7777, debug=True)

