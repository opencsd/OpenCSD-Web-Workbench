import random
import json
import datetime

def generate_dummy_data():
    data = []
    storage_min = 500
    storage_max = 1000
    
    csd_min = 100
    csd_max = 600

    # 현재 시간
    current_time = datetime.datetime.strptime("14:50:00", "%H:%M:%S")

    for i in range(20):
        timestamp = current_time.strftime("%H:%M:%S")

        # 랜덤 값 생성
        disk_read = random.randint(storage_min, storage_max)
        disk_write = random.randint(csd_min, csd_max)
        # memory_usage = random.randint(csd_min, csd_max)
        # network_usage = random.randint(csd_min, csd_max)
        # power_usage = random.randint(storage_min, storage_max)
        
        # csd1부터 csd8까지의 랜덤 값 생성
        # csd_power_usages = {f"csd{i+1}": {"csd_power_usage": random.randint(csd_min, csd_max)} for i in range(8)}

        # 데이터 구성
        entry = {
            "timestamp": timestamp,
            "disk_read": disk_read,
            "disk_write": disk_write
            # "memory_usage": memory_usage,
            # "network_usage": network_usage,
            # "power_usage": power_usage
        }
        # entry.update(csd_power_usages)  # csd1부터 csd8까지의 가변적인 키를 추가

        data.append(entry)

        # 타임스탬프 업데이트
        current_time += datetime.timedelta(seconds=10)

    return data

# JSON 데이터 생성
power_usage_info = generate_dummy_data()
print(json.dumps(power_usage_info, indent=2))
