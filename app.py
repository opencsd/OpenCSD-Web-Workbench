#!/usr/bin/env python
# -*- coding: utf-8 -*-

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
@app.route('/monitoring/ddl', methods=['GET'])
def ddl():
    return render_template('DB_Monitoring.html', ddl_info=ddl_info)

@app.route('/monitoring/disk_rw', methods=['GET'])
def disk_rw():
    return render_template('DB_Monitoring.html', disk_rw_info=disk_rw_info)

@app.route('/monitoring/chache_hit', methods=['GET'])
def chache_hit():
    return render_template('DB_Monitoring.html', chache_hit_info=chache_hit_info)

@app.route('/monitoring/chache_usg', methods=['GET'])
def chache_usg():
    return render_template('DB_Monitoring.html', chache_usage_info=chache_usage_info)

@app.route('/monitoring/scan_filter', methods=['GET'])
def scan_filter():
    return render_template('DB_Monitoring.html', scan_filter_info=scan_filter_info)

@app.route('/monitoring/cpu', methods=['GET'])
def cpu_usg():
    return render_template('DB_Monitoring.html', cpu_usg_info=cpu_usg_info)

@app.route('/monitoring/memory', methods=['GET'])
def memory_usg():
    return render_template('DB_Monitoring.html', memory_usg_info=memory_usg_info)

@app.route('/monitoring/network', methods=['GET'])
def network_usg():
    return render_template('DB_Monitoring.html', network_usage_info=network_usage_info)

@app.route('/monitoring/power', methods=['GET'])
def power_usg():
    return

@app.route('/monitoring/disk', methods=['GET'])
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