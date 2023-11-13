import json
import random
from datetime import datetime, timedelta

def generate_dummy_data():
    connected_client = []
    base_timestamp = datetime.strptime('14:50:00', '%H:%M:%S')

    for i in range(20):
        timestamp = (base_timestamp + timedelta(seconds=i * 10)).strftime('%H:%M:%S')
        client = random.randint(20, 99)

        data_point = {
            'timestamp': timestamp,
            'rw_byte': client
        }

        connected_client.append(data_point)

    return connected_client

# 더미 데이터 생성
dummy_data = generate_dummy_data()

# 생성된 데이터 출력
print(json.dumps(dummy_data, indent=2))
