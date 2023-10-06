from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import datetime, json

app = Flask(__name__)
app.secret_key = 'dbms09!'

users = {
    'user_id': 'user',
    'host_ip': '10.0.4.87',
    'host_port': '8080',
    'db_id': 'root',
    'db_pw': 'dbms09!'
}


# DB Monitoring 화면 데이터
dashboard_summary = {
    'db_name': 'tpc-h',
    'dbms_type': 'mysql',
    'data_storage_type': 'row',
    'storage_type': 'csd',
    'csd_count': 8,
    'csd_kind': 'ngd',
    'dbms_size': '64',
    'block_size': '4096',
    'scheduling_algorithm': 'csd metric score',
    'db_account_name': 'keti',
    'user_id': 'keti',
    'db_host_ip': '10.0.4.80:40001'
}

time1 = "14:50:00"
time2 = "14:50:10"
time3 = "14:50:20"
time4 = "14:50:30"
time5 = "14:50:40"
time6 = "14:50:50"
time7 = "14:51:00"
time8 = "14:51:10"
time9 = "14:51:20"
time10 = "14:51:30"
time11 = "14:51:40"
time12 = "14:51:50"
time13 = "14:52:00"
time14 = "14:52:10"
time15 = "14:52:20"
time16 = "14:52:30"
time17 = "14:52:40"
time18 = "14:52:50"
time19 = "14:53:00"
time20 = "14:53:10"
time21 = "14:53:20"
time22 = "14:53:30"
time23 = "14:53:40"
time24 = "14:53:50"
time25 = "14:54:00"
time26 = "14:54:10"
time27 = "14:54:20"
time28 = "14:54:30"
time29 = "14:54:40"
time30 = "14:54:50"

ddl_info = [
    {
        'timestamp': '14:50:00',
        'select_count': 20,
        'insert_count': 15,
        'delete_count': 17,
        'update_count': 10
    },
    {
        'timestamp': '14:50:10',
        'select_count': 19,
        'insert_count': 10,
        'delete_count': 11,
        'update_count': 8
    },
    {
        'timestamp': '14:50:20',
        'select_count': 8,
        'insert_count': 15,
        'delete_count': 12,
        'update_count': 2
    },
    {
        'timestamp': '14:50:30',
        'select_count': 18,
        'insert_count': 12,
        'delete_count': 13,
        'update_count': 9
    },
    {
        'timestamp': '14:50:40',
        'select_count': 12,
        'insert_count': 15,
        'delete_count': 10,
        'update_count': 5
    },
    {
        'timestamp': '14:50:50',
        'select_count': 12,
        'insert_count': 17,
        'delete_count': 19,
        'update_count': 22
    },
    {
        'timestamp': '14:51:00',
        'select_count': 13,
        'insert_count': 16,
        'delete_count': 2,
        'update_count': 9
    },
    {
        'timestamp': '14:51:10',
        'select_count': 5,
        'insert_count': 15,
        'delete_count': 9,
        'update_count': 19
    },
    {
        'timestamp': '14:51:20',
        'select_count': 22,
        'insert_count': 17,
        'delete_count': 11,
        'update_count': 13
    },
    {
        'timestamp': '14:51:30',
        'select_count': 16,
        'insert_count': 10,
        'delete_count': 12,
        'update_count': 7
    },
    {
        'timestamp': '14:51:40',
        'select_count': 12,
        'insert_count': 8,
        'delete_count': 2,
        'update_count': 5
    },
    {
        'timestamp': '14:51:50',
        'select_count': 16,
        'insert_count': 22,
        'delete_count': 5,
        'update_count': 16
    },
    {
        'timestamp': '14:52:00',
        'select_count': 11,
        'insert_count': 22,
        'delete_count': 16,
        'update_count': 19
    },
    {
        'timestamp': '14:52:10',
        'select_count': 25,
        'insert_count': 10,
        'delete_count': 12,
        'update_count': 13
    },
    {
        'timestamp': '14:52:20',
        'select_count': 16,
        'insert_count': 12,
        'delete_count': 13,
        'update_count': 19
    },
    {
        'timestamp': '14:52:30',
        'select_count': 17,
        'insert_count': 5,
        'delete_count': 16,
        'update_count': 6
    },
    {
        'timestamp': '14:52:40',
        'select_count': 16,
        'insert_count': 19,
        'delete_count': 12,
        'update_count': 16
    },
    {
        'timestamp': '14:52:50',
        'select_count': 20,
        'insert_count': 13,
        'delete_count': 18,
        'update_count': 4
    },
    {
        'timestamp': '14:53:00',
        'select_count': 26,
        'insert_count': 15,
        'delete_count': 17,
        'update_count': 9
    },
    {
        'timestamp': '14:53:10',
        'select_count': 15,
        'insert_count': 19,
        'delete_count': 4,
        'update_count': 8
    }
]

disk_rw_info = [
    {
        'timestamp': '14:50:00',
        'disk_rw': 1.1
    },
    {
        'timestamp': '14:50:10',
        'disk_rw': 2.0
    },
    {
        'timestamp': '14:50:20',
        'disk_rw': 0.8
    },
    {
        'timestamp': '14:50:30',
        'disk_rw': 1.5
    },
    {
        'timestamp': '14:50:40',
        'disk_rw': 1.1
    },
    {
        'timestamp': '14:50:50',
        'disk_rw': 1.9
    },
    {
        'timestamp': '14:51:00',
        'disk_rw': 1.7
    },
    {
        'timestamp': '14:51:10',
        'disk_rw': 1.8
    },
    {
        'timestamp': '14:51:20',
        'disk_rw': 2.1
    },
    {
        'timestamp': '14:51:30',
        'disk_rw': 2.5
    },
    {
        'timestamp': '14:51:40',
        'disk_rw': 1.8
    },
    {
        'timestamp': '14:51:50',
        'disk_rw': 1.5
    },
    {
        'timestamp': '14:52:00',
        'disk_rw': 1.4
    },
    {
        'timestamp': '14:52:10',
        'disk_rw': 1.1
    },
    {
        'timestamp': '14:52:20',
        'disk_rw': 0.8
    },
    {
        'timestamp': '14:52:30',
        'disk_rw': 1.2
    },
    {
        'timestamp': '14:52:40',
        'disk_rw': 1.7
    },
    {
        'timestamp': '14:52:50',
        'disk_rw': 1.6
    },
    {
        'timestamp': '14:53:00',
        'disk_rw': 1.1
    },
    {
        'timestamp': '14:53:10',
        'disk_rw': 0.7
    }
]

chache_hit_info = [
    {
        'timestamp': '14:50:00',
        'cache_hit_rate': 50
    },
    {
        'timestamp': '14:50:10',
        'cache_hit_rate': 53
    },
    {
        'timestamp': '14:50:20',
        'cache_hit_rate': 15
    },
    {
        'timestamp': '14:50:30',
        'cache_hit_rate': 25
    },
    {
        'timestamp': '14:50:40',
        'cache_hit_rate': 22
    },
    {
        'timestamp': '14:50:50',
        'cache_hit_rate': 70
    },
    {
        'timestamp': '14:51:00',
        'cache_hit_rate': 21
    },
    {
        'timestamp': '14:51:10',
        'cache_hit_rate': 26
    },
    {
        'timestamp': '14:51:20',
        'cache_hit_rate': 16
    },
    {
        'timestamp': '14:51:30',
        'cache_hit_rate': 19
    },
    {
        'timestamp': '14:51:40',
        'cache_hit_rate': 56
    },
    {
        'timestamp': '14:51:50',
        'cache_hit_rate': 100
    },
    {
        'timestamp': '14:52:00',
        'cache_hit_rate': 65
    },
    {
        'timestamp': '14:52:10',
        'cache_hit_rate': 0
    },
    {
        'timestamp': '14:52:20',
        'cache_hit_rate': 52
    },
    {
        'timestamp': '14:52:30',
        'cache_hit_rate': 2
    },
    {
        'timestamp': '14:52:40',
        'cache_hit_rate': 19
    },
    {
        'timestamp': '14:52:50',
        'cache_hit_rate': 22
    },
    {
        'timestamp': '14:53:00',
        'cache_hit_rate': 0
    },
    {
        'timestamp': '14:53:10',
        'cache_hit_rate': 10
    }
]

chache_usage_info = [
    {
        'timestamp': '14:50:00',
        'cache_hit_rate': 50
    },
    {
        'timestamp': '14:50:10',
        'cache_hit_rate': 53
    },
    {
        'timestamp': '14:50:20',
        'cache_hit_rate': 15
    },
    {
        'timestamp': '14:50:30',
        'cache_hit_rate': 25
    },
    {
        'timestamp': '14:50:40',
        'cache_hit_rate': 22
    },
    {
        'timestamp': '14:50:50',
        'cache_hit_rate': 70
    },
    {
        'timestamp': '14:51:00',
        'cache_hit_rate': 21
    },
    {
        'timestamp': '14:51:10',
        'cache_hit_rate': 26
    },
    {
        'timestamp': '14:51:20',
        'cache_hit_rate': 16
    },
    {
        'timestamp': '14:51:30',
        'cache_hit_rate': 19
    },
    {
        'timestamp': '14:51:40',
        'cache_hit_rate': 56
    },
    {
        'timestamp': '14:51:50',
        'cache_hit_rate': 100
    },
    {
        'timestamp': '14:52:00',
        'cache_hit_rate': 65
    },
    {
        'timestamp': '14:52:10',
        'cache_hit_rate': 0
    },
    {
        'timestamp': '14:52:20',
        'cache_hit_rate': 52
    },
    {
        'timestamp': '14:52:30',
        'cache_hit_rate': 2
    },
    {
        'timestamp': '14:52:40',
        'cache_hit_rate': 19
    },
    {
        'timestamp': '14:52:50',
        'cache_hit_rate': 22
    },
    {
        'timestamp': '14:53:00',
        'cache_hit_rate': 0
    },
    {
        'timestamp': '14:53:10',
        'cache_hit_rate': 10
    }
]

scan_filter_info = [
    {
        'timestamp': '14:50:00',
        'scan_filter_rate': 70
    },
    {
        'timestamp': '14:50:10',
        'scan_filter_rate': 55
    },
    {
        'timestamp': '14:50:20',
        'scan_filter_rate': 61
    },
    {
        'timestamp': '14:50:30',
        'scan_filter_rate': 25
    },
    {
        'timestamp': '14:50:40',
        'scan_filter_rate': 32
    },
    {
        'timestamp': '14:50:50',
        'scan_filter_rate': 45
    },
    {
        'timestamp': '14:51:00',
        'scan_filter_rate': 36
    },
    {
        'timestamp': '14:51:10',
        'scan_filter_rate': 12
    },
    {
        'timestamp': '14:51:20',
        'scan_filter_rate': 80
    },
    {
        'timestamp': '14:51:30',
        'scan_filter_rate': 46
    },
    {
        'timestamp': '14:51:40',
        'scan_filter_rate': 62
    },
    {
        'timestamp': '14:51:50',
        'scan_filter_rate': 87
    },
    {
        'timestamp': '14:52:00',
        'scan_filter_rate': 35
    },
    {
        'timestamp': '14:52:10',
        'scan_filter_rate': 26
    },
    {
        'timestamp': '14:52:20',
        'scan_filter_rate': 45
    },
    {
        'timestamp': '14:52:30',
        'scan_filter_rate': 56
    },
    {
        'timestamp': '14:52:40',
        'scan_filter_rate': 26
    },
    {
        'timestamp': '14:52:50',
        'scan_filter_rate': 10
    },
    {
        'timestamp': '14:53:00',
        'scan_filter_rate': 22
    },
    {
        'timestamp': '14:53:10',
        'scan_filter_rate': 51
    }
]

cpu_usg_info = [
    {
        'timestamp': '14:50:00',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:50:10',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:50:20',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:50:30',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:50:40',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:50:50',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:51:00',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:51:10',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:51:20',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:51:30',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:51:40',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:51:50',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:52:00',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:52:10',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:52:20',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:52:30',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:52:40',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:52:50',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:53:00',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    },
    {
        'timestamp': '14:53:10',
        'storage_cpu_usage': ,
        'csd_info': [
            {
                'csd_name': 'csd1'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd2'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd3'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd4'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd5'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd6'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd7'
                'csd_cpu_usage': 
            },
            {
                'csd_name': 'csd8'
                'csd_cpu_usage': 
            },
        ]
    }
]
[
    {
        'timestamp': '14:50:00',
    },
    {
        'timestamp': '14:50:10',
    },
    {
        'timestamp': '14:50:20',
    },
    {
        'timestamp': '14:50:30',
    },
    {
        'timestamp': '14:50:40',
    },
    {
        'timestamp': '14:50:50',
    },
    {
        'timestamp': '14:51:00',
    },
    {
        'timestamp': '14:51:10',
    },
    {
        'timestamp': '14:51:20',
    },
    {
        'timestamp': '14:51:30',
    },
    {
        'timestamp': '14:51:40',
    },
    {
        'timestamp': '14:51:50',
    },
    {
        'timestamp': '14:52:00',
    },
    {
        'timestamp': '14:52:10',
    },
    {
        'timestamp': '14:52:20',
    },
    {
        'timestamp': '14:52:30',
    },
    {
        'timestamp': '14:52:40',
    },
    {
        'timestamp': '14:52:50',
    },
    {
        'timestamp': '14:53:00',
    },
    {
        'timestamp': '14:53:10',
    }
]

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
@app.route('monitoring/ddl', methods=['GET'])
def ddl():
    return

@app.route('monitoring/disk_rw', methods=['GET'])
def disk_rw():
    return

@app.route('monitoring/chache_hit', methods=['GET'])
def chache_hit():
    return

@app.route('monitoring/chache_usg', methods=['GET'])
def chache_usg():
    return

@app.route('monitoring/scan_filter', methods=['GET'])
def scan_filter():
    return

@app.route('monitoring/cpu', methods=['GET'])
def cpu_usg():
    return

@app.route('monitoring/memory', methods=['GET'])
def memory_usg():
    return

@app.route('monitoring/power', methods=['GET'])
def power_usg():
    return

@app.route('monitoring/disk', methods=['GET'])
def disk_usg():
    return









@app.route('/query') # Query Pushdown 화면으로 전환
def query():
    return redirect(url_for('/query/environment'))

# Query Pyshdown
@app.route('/query/environment')
def query_info():
    # DB로부터 쿼리 수행 DB 환경정보 가져옴
    return


if __name__ == '__main__':
    app.run(debug=True)