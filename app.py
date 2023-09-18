from flask import Flask, render_template, request, redirect, url_for, session, jsonify

app = Flask(__name__)
app.secret_key = 'dbms09!'

users = {
    'user_id': 'user'
    'host_ip': '10.0.4.87'
    'host_port': '8080'
    'db_id': 'root'
    'db_pw': 'dbms09!'
}
dashboard_summary = {
    'DBMS': 'MySQL',
    'DB Size': '196 (GB)',
    'CSD Count': '8',
    'DB Name': 'tpc-h',
    'Storage': 'Using CSD',
    'CSD Kind': 'NGD'
}
query_list = {
    1: 'select l_returnflag, l_linestatus, sum(l_quantity) as sum_qty, sum(l_extendedprice) as sum_base_price, sum(l_extendedprice * (1 - l_discount)) as sum_disc_price;',
    2: 'select s_acctbal, s_name, n_name, p_partkey, p_mfgr, s_address, s_phone, s_comment from PART, SUPPLIER, PARTSUPP, NATION, REGION where p_partkey = ps_partkey;',
    3: 'select l_orderkey, sum(l_extendedprice * (1 - l_discount)) as revenue, o_orderdate, o_shippriority from CUSTOMER, ORDERS, LINEITEM where c_custkey = o_custkey;',
    4: 'select n_name, sum(l_extendedprice * (1 - l_discount)) as revenue from CUSTOMER, ORDERS, LINEITEM, SUPPLIER, NATION, REGION where c_custkey = o_custkey;'
}
query_result = {
    'DBMS': 'Mysql',
    'Algorithm': 'CSD Metric Score',
    'Index': 'Use',
    'Block Size': '4096',
    'Query Result': 'promo_revenue | 16.6781923715',
    'CPU': '30 (%)',
    'Power': '330 (W)',
    'Network': '80 (MB)',
    'Query Time': '20 (sec)',
    'Filter/Scan': '0.83 (%)'
}

@app.route('/')
def index():
    return render_template('index.html')

# Connect, Demo 버튼 눌렀을 때 동작
@app.route('/login', methods=['POST'])  
def login():
    request_data = request.get_json()

    # 연결 시 사용자 정보 및 DB 정보 받아옴
    user_id = request_data.get('user_id')
    host_ip = request_data.get('host_ip')
    host_port = request_data.get('host_port')
    db_id = request_data.get('db_id')
    db_pw = request_data.get('db_pw')

    # 받아온 정보 DB 저장
    # conn = sqlite3.connect('user_db.sqlite')
    # cursor = conn.cursor()
    # cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
    # conn.commit()
    # conn.close()

    return redirect(url_for('/monitoring/environment')) # DB Summary 정보 가져오는 함수 호출

# DB Monitoring
@app.route('/monitoring/environment', methods=['GET'])
def db_info():
    # DB로부터 DB 환경정보 가져옴

    return render_template('DB_Monitoring.html', dashboard_summary=dashboard_summary)

# DB Monitoring Graph 정보


@app.route('/query') # Query Pushdown 화면으로 전환
def query():
    return redirect(url_for('/query/environment'))

# Query Pyshdown
@app.route('/query/environment')
def query_info():
    # DB로부터 쿼리 수행 DB 환경정보 가져옴


if __name__ == '__main__':
    app.run(debug=True)