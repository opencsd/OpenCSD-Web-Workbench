INFLUX_SSD_IP = "10.0.4.85"

# instance platform
INSTANCE_METRIC_DB_HOST = "10.0.4.87"
INSTANCE_METRIC_DB_PORT = 30701 #구분 필요
INSTANCE_METRIC_DB_USER = 'keti' #구분 필요
INSTANCE_METRIC_DB_PASSWORD = 'ketilinux' #구분 필요
INSTANCE_METRIC_DB_NAME = "keti_opencsd" #구분 필요  keti_opencsd
INSTANCE_NODE_METRIC_DB_NAME = "node_metric" #구분 필요

INSTANCE_MANAGEMENT_DB_HOST = "10.0.4.80"
INSTANCE_MANAGEMENT_DB_PORT = 40806 #구분 필요
INSTANCE_MANAGEMENT_DB_USER = 'root' #구분 필요
INSTANCE_MANAGEMENT_DB_PASSWORD = 'ketilinux' #구분 필요
INSTANCE_MANAGEMENT_DB_NAME = 'keti_opencsd' #구분 필요

# management platform
PLATFORM_MANAGEMENT_DB_HOST = "10.0.4.87"
PLATFORM_MANAGEMENT_DB_PORT = 30704
PLATFORM_MANAGEMENT_DB_USER = 'keti'
PLATFORM_MANAGEMENT_DB_PASSWORD = 'ketilinux'
PLATFORM_MANAGEMENT_DB_NAME = 'platform_info'

PLATFORM_METRIC_DB_HOST = "10.0.4.87"
PLATFORM_METRIC_DB_PORT = 30703
PLATFORM_METRIC_DB_USER = 'keti'
PLATFORM_METRIC_DB_PASSWORD = 'ketilinux'
PLATFORM_STORAGE_METRIC_DB_NAME = 'storage_metric'
PLATFORM_STORAGE_NODE_METRIC_DB_NAME = 'storage_node_metric'
INFLUX_CSD_DB = "opencsd_management_platform" # storage_metric으로 이름 바꿔야함

# mysql for ssd demo
MYSQL_DB_HOST = "10.0.4.80"
MYSQL_DB_PORT = 3306
MYSQL_DB_USER = 'root'
MYSQL_DB_PASSWORD = ''
MYSQL_DB_NAME = 'tpch_10_index'
