import json
import random
from datetime import datetime, timedelta

def generate_dummy_data():
    scan_filter_info = []
    base_timestamp = datetime.strptime('14:50:00', '%H:%M:%S')

    for i in range(20):
        timestamp = (base_timestamp + timedelta(seconds=i * 10)).strftime('%H:%M:%S')
        # scan = random.randint(40000, 60000)
        # filter_val = random.randint(1000, min(scan - 1, 50000))  # filter 값은 scan 값보다 작아야 함
        interface = random.randint(100, 300)
        monitoring = random.randint(100, 300)
        offloading = random.randint(100, 300)
        merging = random.randint(500, 1000)

        data_point = {
            'timestamp': timestamp,
            'interface': interface,
            'monitoring': monitoring,
            'offloading': offloading,
            'merging': merging
        }

        scan_filter_info.append(data_point)

    return scan_filter_info

# 더미 데이터 생성
dummy_data = generate_dummy_data()

# 생성된 데이터 출력
print(json.dumps(dummy_data, indent=2))
