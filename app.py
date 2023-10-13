# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_cors import CORS
import datetime, json

app = Flask(__name__,template_folder= 'templates')
app.secret_key = 'dbms09!'
CORS(app)

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
####################################################################################
#                               DB Monitoring 화면                                 #
####################################################################################

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
        'storage_cpu_usage': 30,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 40
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 55
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 43
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 34
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 39
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 50
            }
        ]
    },
    {
        'timestamp': '14:50:10',
        'storage_cpu_usage': 40,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 22
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 25
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 27
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 36
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 29
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 25
            }
        ]
    },
    {
        'timestamp': '14:50:20',
        'storage_cpu_usage': 38,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 45
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 41
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 46
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 49
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 51
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 39
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 42
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 45
            }
        ]
    },
    {
        'timestamp': '14:50:30',
        'storage_cpu_usage': 20,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 15
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 20
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 19
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 19
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 21
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 22
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 25
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 21
            }
        ]
    },
    {
        'timestamp': '14:50:40',
        'storage_cpu_usage': 36,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 34
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 36
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 29
            }
        ]
    },
    {
        'timestamp': '14:50:50',
        'storage_cpu_usage': 41,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 40
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 55
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 43
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 34
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 39
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 50
            }
        ]
    },
    {
        'timestamp': '14:51:00',
        'storage_cpu_usage': 22,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 22
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 25
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 27
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 36
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 29
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 25
            }
        ]
    },
    {
        'timestamp': '14:51:10',
        'storage_cpu_usage': 46,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 45
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 41
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 46
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 49
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 51
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 39
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 42
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 45
            }
        ]
    },
    {
        'timestamp': '14:51:20',
        'storage_cpu_usage': 25,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 15
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 20
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 19
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 19
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 21
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 22
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 25
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 21
            }
        ]
    },
    {
        'timestamp': '14:51:30',
        'storage_cpu_usage': 34,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 34
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 36
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 29
            }
        ]
    },
    {
        'timestamp': '14:51:40',
        'storage_cpu_usage': 37,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 40
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 55
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 43
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 34
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 39
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 50
            }
        ]
    },
    {
        'timestamp': '14:51:50',
        'storage_cpu_usage': 46,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 22
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 25
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 27
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 36
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 29
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 25
            }
        ]
    },
    {
        'timestamp': '14:52:00',
        'storage_cpu_usage': 38,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 45
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 41
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 46
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 49
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 51
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 39
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 42
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 45
            }
        ]
    },
    {
        'timestamp': '14:52:10',
        'storage_cpu_usage': 29,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 15
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 20
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 19
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 19
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 21
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 22
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 25
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 21
            }
        ]
    },
    {
        'timestamp': '14:52:20',
        'storage_cpu_usage': 20,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 34
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 36
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 29
            }
        ]
    },
    {
        'timestamp': '14:52:30',
        'storage_cpu_usage': 31,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 40
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 55
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 43
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 34
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 39
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 50
            }
        ]
    },
    {
        'timestamp': '14:52:40',
        'storage_cpu_usage': 45,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 22
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 25
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 27
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 36
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 29
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 25
            }
        ]
    },
    {
        'timestamp': '14:52:50',
        'storage_cpu_usage': 37,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 45
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 41
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 46
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 49
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 51
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 39
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 42
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 45
            }
        ]
    },
    {
        'timestamp': '14:53:00',
        'storage_cpu_usage': 25,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 15
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 20
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 19
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 19
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 21
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 22
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 25
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 21
            }
        ]
    },
    {
        'timestamp': '14:53:10',
        'storage_cpu_usage': 37,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd2',
                'csd_cpu_usage': 35
            },
            {
                'csd_name': 'csd3',
                'csd_cpu_usage': 34
            },
            {
                'csd_name': 'csd4',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd5',
                'csd_cpu_usage': 36
            },
            {
                'csd_name': 'csd6',
                'csd_cpu_usage': 37
            },
            {
                'csd_name': 'csd7',
                'csd_cpu_usage': 31
            },
            {
                'csd_name': 'csd8',
                'csd_cpu_usage': 29
            }
        ]
    }
]

memory_usg_info = [
    {
        'timestamp': '14:50:00',
        'storage_memory_usage': 450,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 520
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 550
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 490
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 510
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 560
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 520
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 530
            }
        ]
    },
    {
        'timestamp': '14:50:10',
        'storage_memory_usage': 380,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 460
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 450
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 510
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 480
            }
        ]
    },
    {
        'timestamp': '14:50:20',
        'storage_memory_usage': 420,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 380
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 350
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 310
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 380
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 350
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 330
            }
        ]
    },
    {
        'timestamp': '14:50:30',
        'storage_memory_usage': 350,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 450
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 450
            }
        ]
    },
    {
        'timestamp': '14:50:40',
        'storage_memory_usage': 520,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 460
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 340
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 300
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 270
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 200
            }
        ]
    },
    {
        'timestamp': '14:50:50',
        'storage_memory_usage': 200,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 520
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 550
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 490
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 510
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 560
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 520
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 530
            }
        ]
    },
    {
        'timestamp': '14:51:00',
        'storage_memory_usage': 310,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 460
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 450
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 510
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 480
            }
        ]
    },
    {
        'timestamp': '14:51:10',
        'storage_memory_usage': 480,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 380
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 350
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 310
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 380
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 350
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 330
            }
        ]
    },
    {
        'timestamp': '14:51:20',
        'storage_memory_usage': 400,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 450
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 450
            }
        ]
    },
    {
        'timestamp': '14:51:30',
        'storage_memory_usage': 460,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 460
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 340
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 300
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 270
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 200
            }
        ]
    },
    {
        'timestamp': '14:51:40',
        'storage_memory_usage': 570,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 520
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 550
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 490
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 510
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 560
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 520
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 530
            }
        ]
    },
    {
        'timestamp': '14:51:50',
        'storage_memory_usage': 500,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 460
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 450
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 510
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 480
            }
        ]
    },
    {
        'timestamp': '14:52:00',
        'storage_memory_usage': 370,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 380
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 350
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 310
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 380
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 350
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 330
            }
        ]
    },
    {
        'timestamp': '14:52:10',
        'storage_memory_usage': 480,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 450
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 450
            }
        ]
    },
    {
        'timestamp': '14:52:20',
        'storage_memory_usage': 420,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 460
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 340
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 300
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 270
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 200
            }
        ]
    },
    {
        'timestamp': '14:52:30',
        'storage_memory_usage': 510,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 520
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 550
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 490
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 510
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 560
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 520
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 530
            }
        ]
    },
    {
        'timestamp': '14:52:40',
        'storage_memory_usage': 550,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 460
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 450
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 510
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 480
            }
        ]
    },
    {
        'timestamp': '14:52:50',
        'storage_memory_usage': 170,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 380
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 350
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 310
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 380
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 350
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 330
            }
        ]
    },
    {
        'timestamp': '14:53:00',
        'storage_memory_usage': 280,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 450
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 420
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 450
            }
        ]
    },
    {
        'timestamp': '14:53:10',
        'storage_memory_usage': 450,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_memory_usage': 460
            },
            {
                'csd_name': 'csd2',
                'csd_memory_usage': 480
            },
            {
                'csd_name': 'csd3',
                'csd_memory_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_memory_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_memory_usage': 340
            },
            {
                'csd_name': 'csd6',
                'csd_memory_usage': 300
            },
            {
                'csd_name': 'csd7',
                'csd_memory_usage': 270
            },
            {
                'csd_name': 'csd8',
                'csd_memory_usage': 200
            }
        ]
    }
]
network_usage_info = [
    {
        'timestamp': '14:50:00',
        'storage_network_usage': 510,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 470
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 320
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 340
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 380
            }
        ]
    },
    {
        'timestamp': '14:50:10',
        'storage_network_usage': 450,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 250
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 570
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 460
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 570
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 520
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 440
            }
        ]
    },
    {
        'timestamp': '14:50:20',
        'storage_network_usage': 380,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 330
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 520
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 380
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 470
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 460
            }
        ]
    },
    {
        'timestamp': '14:50:30',
        'storage_network_usage': 340,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 360
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 420
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 410
            }
        ]
    },
    {
        'timestamp': '14:50:40',
        'storage_network_usage': 330,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 360
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 420
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 410
            }
        ]
    },
    {
        'timestamp': '14:50:50',
        'storage_network_usage': 370,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 470
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 320
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 340
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 380
            }
        ]
    },
    {
        'timestamp': '14:51:00',
        'storage_network_usage': 410,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 250
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 570
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 460
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 570
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 520
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 440
            }
        ]
    },
    {
        'timestamp': '14:51:10',
        'storage_network_usage': 450,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 330
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 520
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 380
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 470
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 460
            }
        ]
    },
    {
        'timestamp': '14:51:20',
        'storage_network_usage': 320,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 360
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 420
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 410
            }
        ]
    },
    {
        'timestamp': '14:51:30',
        'storage_network_usage': 280,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 360
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 420
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 410
            }
        ]
    },
    {
        'timestamp': '14:51:40',
        'storage_network_usage': 250,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 470
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 320
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 340
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 380
            }
        ]
    },
    {
        'timestamp': '14:51:50',
        'storage_network_usage': 300,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 250
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 570
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 460
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 570
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 520
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 440
            }
        ]
    },
    {
        'timestamp': '14:52:00',
        'storage_network_usage': 330,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 330
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 520
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 380
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 470
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 460
            }
        ]
    },
    {
        'timestamp': '14:52:10',
        'storage_network_usage': 310,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 360
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 420
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 410
            }
        ]
    },
    {
        'timestamp': '14:52:20',
        'storage_network_usage': 360,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 360
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 420
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 410
            }
        ]
    },
    {
        'timestamp': '14:52:30',
        'storage_network_usage': 340,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 470
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 370
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 320
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 340
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 380
            }
        ]
    },
    {
        'timestamp': '14:52:40',
        'storage_network_usage': 420,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 250
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 570
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 460
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 570
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 520
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 440
            }
        ]
    },
    {
        'timestamp': '14:52:50',
        'storage_network_usage': 390,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 330
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 520
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 380
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 450
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 470
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 460
            }
        ]
    },
    {
        'timestamp': '14:53:00',
        'storage_network_usage': 370,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 360
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 420
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 410
            }
        ]
    },
    {
        'timestamp': '14:53:10',
        'storage_network_usage': 380,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_network_usage': 360
            },
            {
                'csd_name': 'csd2',
                'csd_network_usage': 500
            },
            {
                'csd_name': 'csd3',
                'csd_network_usage': 430
            },
            {
                'csd_name': 'csd4',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd5',
                'csd_network_usage': 410
            },
            {
                'csd_name': 'csd6',
                'csd_network_usage': 420
            },
            {
                'csd_name': 'csd7',
                'csd_network_usage': 400
            },
            {
                'csd_name': 'csd8',
                'csd_network_usage': 410
            }
        ]
    }
]

power_usg_info = [
    {
        'timestamp': '14:50:00',
        'storage_power_usage': 750,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 180
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 150
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 160
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 170
            }
        ]
    },
    {
        'timestamp': '14:50:10',
        'storage_power_usage': 800,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 150
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 145
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 180
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 170
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 180
            }
        ]
    },
    {
        'timestamp': '14:50:20',
        'storage_power_usage': 780,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 170
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 200
            }
        ]
    },
    {
        'timestamp': '14:50:30',
        'storage_power_usage': 850,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 215
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 180
            }
        ]
    },
    {
        'timestamp': '14:50:40',
        'storage_power_usage': 810,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 170
            }
        ]
    },
    {
        'timestamp': '14:50:50',
        'storage_power_usage': 820,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 180
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 150
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 160
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 170
            }
        ]
    },
    {
        'timestamp': '14:51:00',
        'storage_power_usage': 880,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 150
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 145
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 180
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 170
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 180
            }
        ]
    },
    {
        'timestamp': '14:51:10',
        'storage_power_usage': 850,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 170
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 200
            }
        ]
    },
    {
        'timestamp': '14:51:20',
        'storage_power_usage': 800,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 215
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 180
            }
        ]
    },
    {
        'timestamp': '14:51:30',
        'storage_power_usage': 780,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 170
            }
        ]
    },
    {
        'timestamp': '14:51:40',
        'storage_power_usage': 790,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 180
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 150
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 160
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 170
            }
        ]
    },
    {
        'timestamp': '14:51:50',
        'storage_power_usage': 820,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 150
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 145
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 180
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 170
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 180
            }
        ]
    },
    {
        'timestamp': '14:52:00',
        'storage_power_usage': 750,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 170
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 200
            }
        ]
    },
    {
        'timestamp': '14:52:10',
        'storage_power_usage': 790,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 215
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 180
            }
        ]
    },
    {
        'timestamp': '14:52:20',
        'storage_power_usage': 810,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 170
            }
        ]
    },
    {
        'timestamp': '14:52:30',
        'storage_power_usage': 780,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 180
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 150
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 160
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 170
            }
        ]
    },
    {
        'timestamp': '14:52:40',
        'storage_power_usage': 800,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 150
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 145
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 180
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 170
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 180
            }
        ]
    },
    {
        'timestamp': '14:52:50',
        'storage_power_usage': 850,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 170
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 200
            }
        ]
    },
    {
        'timestamp': '14:53:00',
        'storage_power_usage': 860,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 210
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 215
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 180
            }
        ]
    },
    {
        'timestamp': '14:53:10',
        'storage_power_usage': 840,
        'csd_info': [
            {
                'csd_name': 'csd1',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd2',
                'csd_power_usage': 220
            },
            {
                'csd_name': 'csd3',
                'csd_power_usage': 185
            },
            {
                'csd_name': 'csd4',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd5',
                'csd_power_usage': 175
            },
            {
                'csd_name': 'csd6',
                'csd_power_usage': 200
            },
            {
                'csd_name': 'csd7',
                'csd_power_usage': 190
            },
            {
                'csd_name': 'csd8',
                'csd_power_usage': 170
            }
        ]
    }
]

####################################################################################
#                                 Query 수행 화면                                  #
####################################################################################

query_list = {
    'querys': [
        'select l_returnflag, l_linestatus, sum(l_quantity) as sum_qty, sum(l_extendedprice) as sum_base_price, sum(l_extendedprice * (1 - l_discount)) as sum_disc_price;',
        'select s_acctbal, s_name, n_name, p_partkey, p_mfgr, s_address, s_phone, s_comment from PART, SUPPLIER, PARTSUPP, NATION, REGION where p_partkey = ps_partkey;',
        'select l_orderkey, sum(l_extendedprice * (1 - l_discount)) as revenue, o_orderdate, o_shippriority from CUSTOMER, ORDERS, LINEITEM where c_custkey = o_custkey;',
        'select o_orderpriority, count(*) as order_count from ORDERS where o_orderdate >= date and exists (select * from LINEITEM where l_orderkey = o_orderkey and l_commitdate < l_receiptdate) group by o_orderpriority order by o_orderpriority;',
        'select n_name, sum(l_extendedprice * (1 - l_discount)) as revenue from CUSTOMER, ORDERS, LINEITEM, SUPPLIER, NATION, REGION where c_custkey = o_custkey;',
        'select supp_nation, cust_nation, l_year, sum(volume) as revenue from ( select n1.n_name as supp_nation, n2.n_name as cust_nation, extract(year from l_shipdate) as l_year, l_extendedprice * (1 - l_discount) as volume from SUPPLIER, LINEITEM, ORDERS where s_suppkey = l_suppkey group by supp_nation, l_year order by l_year;',
        'select o_year, sum(case when nation = INDIA then volume else 0 end) / sum(volume) as mkt_share from (select extract(year from o_orderdate) as o_year,	l_extendedprice * (1 - l_discount) as volume, n2.n_name as nation from PART, SUPPLIER, LINEITEM, ORDERS, CUSTOME;',
        'select nation, o_year, sum(amount) as sum_profit from (select n_name as nation, extract(year from o_orderdate) as o_year, l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount from PART, SUPPLIER, LINEITEM, PARTSUPP, ORDERS, NATION where s_suppkey = l_suppkey and ps_suppkey = l_suppkey and ps_partkey = l_partkey and p_partkey = l_partkey and o_orderkey = l_orderkey and s_nationkey = n_nationkey) as profit group by nation, o_year order by nation, o_year desc;',
        'select p_brand, p_type, p_size, count(distinct ps_suppkey) as supplier_cnt from PARTSUPP, PART where p_partkey = ps_partkey and p_size in (48, 19, 12, 4, 41, 7, 21, 39) and ps_suppkey not in (select s_suppkey from SUPPLIER where s_comment like %Customer%Complaints%) group by p_brand, p_type, p_size order by supplier_cnt desc, p_brand, p_type, p_size;',
        'select sum(l_extendedprice) / 7.0 as avg_yearly from LINEITEM, PART where p_partkey = l_partkey and p_brand = Brand44 and p_container = WRAP PKG and l_quantity < (select 0.2 * avg(l_quantity) from LINEITEM where l_partkey = p_partkey);'
    ]
}
query_result = {
    'Query Result': 'promo_revenue | 16.6781923715',
    'CPU': '30 (%)',
    'Power': '330 (W)',
    'Network': '80 (MB)',
    'Query Time': '20 (sec)',
    'Scanned_row': 600000,
    'Filtered_row': 300000,
    'Filter/Scan': '50 (%)',
    'Snippet_count': 4
}
environment_info = {
    'db_name': 'TPC-H',
    'dbms': 'MySQL',
    'storage_type': 'CSD',
    'csd_count': 8,
    'csd_type': 'NGD',
    'dbms_size': 5,
    'block_count': 15,
    'algorithm': 'CSD Metric Score'
}
query_metric_csd = {
    'cpu': 30,
    'power': 330,
    'network': 80,
    'time': 20
}
query_metric_ssd = {
    'cpu': 55,
    'power': 750,
    'network': 450,
    'time': 20
}
db_schema = {
    'schema': [
        'lineitem',
        'o_orderkey  int(11) not_null',
        'o_custkey int(11) not_null',
        'o_orderstatus char(1) not_null',
        'o_totalprice  decimal(15,2) not_null',
        'customer',
        'nation'
    ]
}


####################################################################################
#                                   Simulator 화면                                 #
####################################################################################
option_info = {
    "dbms": "MySQL",
    "storage_type": "CSD",
    "csd_count": 8,
    "csd_kind": "NGD",
    "block_count": 15,
    "algorithm": "CSD Metric Score",
    "using_index": "No"
}
option_info_ssd = {
    "dbms": "MySQL",
    "storage_type": "SSD"
}

# simulator log는 query 수행 데이터와 동일

simulation_result = {
    "cpu": {
        "ssd": 55,
        "csd": 30
    },
    "power": {
        "ssd": 750,
        "csd": 330
    },
    "network": {
        "ssd": 450,
        "csd": 80
    },
    "filter_scan": {
        "ssd": 0,
        "csd": 50
    },
    "time": {
        "ssd": 20,
        "csd": 20
    }
}

###################################
#               함수              #

@app.route('/')
def index():
    return render_template('index.html')

# Connect, Demo 버튼 눌렀을 때 동작
@app.route('/connect', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # return redirect(url_for('monitoring')) #why?
        data = request.json
        workbench_user_id = data['workbench_user_id']
        if workbench_user_id == "keti_opencsd":
            return render_template('db_monitoring.html')
        elif workbench_user_id == "keti_mysql":
            return render_template('db_monitoring_ssd.html')
    return render_template('index.html') 

@app.route('/monitoring_ssd')  
def monitoring_ssd():
    return render_template('db_monitoring_ssd.html', dashboard_summary=dashboard_summary)

@app.route('/monitoring')  
def monitoring():
    return render_template('db_monitoring.html', dashboard_summary=dashboard_summary)

# DB Monitoring
@app.route('/monitoring/environment', methods=['GET'])
def db_info():
    # DB로부터 DB 환경정보 가져옴
    return render_template('db_monitoring.html', dashboard_summary=dashboard_summary)

# @app.route('/monitoring')
# def monitoring():
#     return render_template('DB_Monitoring.html',dashboard_summary=dashboard_summary, ddl_info=ddl_info, cpu_usg_info=cpu_usg_info)

# @app.route('/monitoring/environment', methods=['GET'])
# def db_info():
#     # DB로부터 DB 환경정보 가져옴

#     return render_template('DB_Monitoring.html', dashboard_summary=dashboard_summary)

# # DB Monitoring Graph 정보
# @app.route('/monitoring/ddl', methods=['GET'])
# def ddl():
#     return render_template('DB_Monitoring.html', ddl_info=ddl_info)

# @app.route('/monitoring/disk_rw', methods=['GET'])
# def disk_rw():
#     return render_template('DB_Monitoring.html', disk_rw_info=disk_rw_info)

# @app.route('/monitoring/chache_hit', methods=['GET'])
# def chache_hit():
#     return render_template('DB_Monitoring.html', chache_hit_info=chache_hit_info)

# @app.route('/monitoring/chache_usg', methods=['GET'])
# def chache_usg():
#     return render_template('DB_Monitoring.html', chache_usage_info=chache_usage_info)

# @app.route('/monitoring/scan_filter', methods=['GET'])
# def scan_filter():
#     return render_template('DB_Monitoring.html', scan_filter_info=scan_filter_info)

# @app.route('/monitoring/cpu', methods=['GET'])
# def cpu_usg():
#     return render_template('DB_Monitoring.html', cpu_usg_info=cpu_usg_info)

# @app.route('/monitoring/memory', methods=['GET'])
# def memory_usg():
#     return render_template('DB_Monitoring.html', memory_usg_info=memory_usg_info)

# @app.route('/monitoring/network', methods=['GET'])
# def network_usg():
#     return render_template('DB_Monitoring.html', network_usage_info=network_usage_info)

# @app.route('/monitoring/power', methods=['GET'])
# def power_usg():
#     return render_template('DB_Monitoring.html', power_usg_info=power_usg_info)


###############################################
#                Query 수행 화면              #
@app.route('/query') # Query Pushdown 화면으로 전환
def query():
    return render_template('query.html')

@app.route('/query_ssd') # Query Pushdown 화면으로 전환
def query_ssd():
    return render_template('query_ssd.html')

@app.route('/simulate') # Query Pushdown 화면으로 전환
def simulate():
    return render_template('simulate.html')

# @app.route('/query') # Query Pushdown 화면으로 전환
# def query():
#     return redirect(url_for('/query/environment'))

# @app.route('/query/environment')
# def query_info():
#     # DB로부터 쿼리 수행 DB 환경정보 가져옴
#     return render_template('Query.html', environment_info=environment_info, query_list=query_list, db_schema=db_schema)

# @app.route('/query/run')
# def query_run():
#     # 쿼리 수행 후 결과값 및 메트릭 값
#     return render_template('Query.html', query_result=query_result, query_metric_csd=query_metric_csd, query_metric_ssd=query_metric_ssd)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=400005)