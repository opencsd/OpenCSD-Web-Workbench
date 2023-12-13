# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_cors import CORS
import datetime, json

app = Flask(__name__,template_folder= 'templates')
app.secret_key = 'dbms09!'
CORS(app)

dashboard_summary = {
    'dbms_type': 'MySQL hohoho',
    'db_name': 'tpc-h',
    'data_store_type': 'Row Base',
    'db_user': 'root',
    'db_size': '196 (GB)',
    'storage_type': 'CSD',
    'block_size': '4096 (MB)',
    'workbench_user': 'User 1234',
    'csd_count': 8,
    'csd_kind': 'NGD',
    'scheduling_algorithm': 'Csd Metric Score',
    'db_host_ip': '10.0.4.80:40001'
}
####################################################################################
#                               DB Monitoring 화면                                 #
####################################################################################

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

connected_client = [
    {
        "timestamp": "14:50:00",
        "client": 1
    },
    {
        "timestamp": "14:50:10",
        "client": 1
    },
    {
        "timestamp": "14:50:20",
        "client": 14
    },
    {
        "timestamp": "14:50:30",
        "client": 2
    },
    {
        "timestamp": "14:50:40",
        "client": 7
    },
    {
        "timestamp": "14:50:50",
        "client": 1
    },
    {
        "timestamp": "14:51:00",
        "client": 14
    },
    {
        "timestamp": "14:51:10",
        "client": 12
    },
    {
        "timestamp": "14:51:20",
        "client": 3
    },
    {
        "timestamp": "14:51:30",
        "client": 2
    },
    {
        "timestamp": "14:51:40",
        "client": 1
    },
    {
        "timestamp": "14:51:50",
        "client": 12
    },
    {
        "timestamp": "14:52:00",
        "client": 11
    },
    {
        "timestamp": "14:52:10",
        "client": 8
    },
    {
        "timestamp": "14:52:20",
        "client": 10
    },
    {
        "timestamp": "14:52:30",
        "client": 15
    },
    {
        "timestamp": "14:52:40",
        "client": 10
    },
    {
        "timestamp": "14:52:50",
        "client": 1
    },
    {
        "timestamp": "14:53:00",
        "client": 6
    },
    {
        "timestamp": "14:53:10",
        "client": 1
    }
]

disk_rw_info = [
    {
        "timestamp": "14:50:00",
        "rw_byte": 56
    },
    {
        "timestamp": "14:50:10",
        "rw_byte": 67
    },
    {
        "timestamp": "14:50:20",
        "rw_byte": 70
    },
    {
        "timestamp": "14:50:30",
        "rw_byte": 65
    },
    {
        "timestamp": "14:50:40",
        "rw_byte": 75
    },
    {
        "timestamp": "14:50:50",
        "rw_byte": 85
    },
    {
        "timestamp": "14:51:00",
        "rw_byte": 77
    },
    {
        "timestamp": "14:51:10",
        "rw_byte": 93
    },
    {
        "timestamp": "14:51:20",
        "rw_byte": 97
    },
    {
        "timestamp": "14:51:30",
        "rw_byte": 90
    },
    {
        "timestamp": "14:51:40",
        "rw_byte": 82
    },
    {
        "timestamp": "14:51:50",
        "rw_byte": 74
    },
    {
        "timestamp": "14:52:00",
        "rw_byte": 70
    },
    {
        "timestamp": "14:52:10",
        "rw_byte": 61
    },
    {
        "timestamp": "14:52:20",
        "rw_byte": 65
    },
    {
        "timestamp": "14:52:30",
        "rw_byte": 70
    },
    {
        "timestamp": "14:52:40",
        "rw_byte": 66
    },
    {
        "timestamp": "14:52:50",
        "rw_byte": 59
    },
    {
        "timestamp": "14:53:00",
        "rw_byte": 86
    },
    {
        "timestamp": "14:53:10",
        "rw_byte": 80
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
        'cache_hit_rate': 51
    },
    {
        'timestamp': '14:50:30',
        'cache_hit_rate': 49
    },
    {
        'timestamp': '14:50:40',
        'cache_hit_rate': 45
    },
    {
        'timestamp': '14:50:50',
        'cache_hit_rate': 56
    },
    {
        'timestamp': '14:51:00',
        'cache_hit_rate': 55
    },
    {
        'timestamp': '14:51:10',
        'cache_hit_rate': 59
    },
    {
        'timestamp': '14:51:20',
        'cache_hit_rate': 60
    },
    {
        'timestamp': '14:51:30',
        'cache_hit_rate': 58
    },
    {
        'timestamp': '14:51:40',
        'cache_hit_rate': 56
    },
    {
        'timestamp': '14:51:50',
        'cache_hit_rate': 80
    },
    {
        'timestamp': '14:52:00',
        'cache_hit_rate': 65
    },
    {
        'timestamp': '14:52:10',
        'cache_hit_rate': 70
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
        'cache_hit_rate': 51
    },
    {
        'timestamp': '14:50:30',
        'cache_hit_rate': 49
    },
    {
        'timestamp': '14:50:40',
        'cache_hit_rate': 45
    },
    {
        'timestamp': '14:50:50',
        'cache_hit_rate': 56
    },
    {
        'timestamp': '14:51:00',
        'cache_hit_rate': 55
    },
    {
        'timestamp': '14:51:10',
        'cache_hit_rate': 59
    },
    {
        'timestamp': '14:51:20',
        'cache_hit_rate': 60
    },
    {
        'timestamp': '14:51:30',
        'cache_hit_rate': 58
    },
    {
        'timestamp': '14:51:40',
        'cache_hit_rate': 56
    },
    {
        'timestamp': '14:51:50',
        'cache_hit_rate': 80
    },
    {
        'timestamp': '14:52:00',
        'cache_hit_rate': 65
    },
    {
        'timestamp': '14:52:10',
        'cache_hit_rate': 70
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
        "timestamp": "14:50:00",
        "scan": 45763,
        "filter": 2685
    },
    {
        "timestamp": "14:50:10",
        "scan": 57699,
        "filter": 45608
    },
    {
        "timestamp": "14:50:20",
        "scan": 45921,
        "filter": 39978
    },
    {
        "timestamp": "14:50:30",
        "scan": 54971,
        "filter": 11155
    },
    {
        "timestamp": "14:50:40",
        "scan": 58596,
        "filter": 41892
    },
    {
        "timestamp": "14:50:50",
        "scan": 51806,
        "filter": 10015
    },
    {
        "timestamp": "14:51:00",
        "scan": 42643,
        "filter": 18021
    },
    {
        "timestamp": "14:51:10",
        "scan": 50566,
        "filter": 34555
    },
    {
        "timestamp": "14:51:20",
        "scan": 44777,
        "filter": 1051
    },
    {
        "timestamp": "14:51:30",
        "scan": 51534,
        "filter": 15640
    },
    {
        "timestamp": "14:51:40",
        "scan": 54591,
        "filter": 13004
    },
    {
        "timestamp": "14:51:50",
        "scan": 50360,
        "filter": 47174
    },
    {
        "timestamp": "14:52:00",
        "scan": 45898,
        "filter": 32605
    },
    {
        "timestamp": "14:52:10",
        "scan": 59467,
        "filter": 19035
    },
    {
        "timestamp": "14:52:20",
        "scan": 49706,
        "filter": 16255
    },
    {
        "timestamp": "14:52:30",
        "scan": 44177,
        "filter": 21902
    },
    {
        "timestamp": "14:52:40",
        "scan": 59194,
        "filter": 29573
    },
    {
        "timestamp": "14:52:50",
        "scan": 41888,
        "filter": 30210
    },
    {
        "timestamp": "14:53:00",
        "scan": 57244,
        "filter": 46160
    },
    {
        "timestamp": "14:53:10",
        "scan": 54538,
        "filter": 16401
    }
]

interface_cpu = [
    {
        "timestamp": "14:50:00",
        "interface": 200,
        "monitoring": 246,
        "offloading": 239,
        "merging": 812
    },
    {
        "timestamp": "14:50:10",
        "interface": 272,
        "monitoring": 116,
        "offloading": 268,
        "merging": 849
    },
    {
        "timestamp": "14:50:20",
        "interface": 156,
        "monitoring": 262,
        "offloading": 255,
        "merging": 798
    },
    {
        "timestamp": "14:50:30",
        "interface": 162,
        "monitoring": 138,
        "offloading": 277,
        "merging": 726
    },
    {
        "timestamp": "14:50:40",
        "interface": 132,
        "monitoring": 114,
        "offloading": 202,
        "merging": 587
    },
    {
        "timestamp": "14:50:50",
        "interface": 223,
        "monitoring": 101,
        "offloading": 118,
        "merging": 606
    },
    {
        "timestamp": "14:51:00",
        "interface": 230,
        "monitoring": 247,
        "offloading": 185,
        "merging": 707
    },
    {
        "timestamp": "14:51:10",
        "interface": 288,
        "monitoring": 263,
        "offloading": 288,
        "merging": 795
    },
    {
        "timestamp": "14:51:20",
        "interface": 170,
        "monitoring": 208,
        "offloading": 214,
        "merging": 954
    },
    {
        "timestamp": "14:51:30",
        "interface": 231,
        "monitoring": 109,
        "offloading": 192,
        "merging": 576
    },
    {
        "timestamp": "14:51:40",
        "interface": 115,
        "monitoring": 275,
        "offloading": 261,
        "merging": 746
    },
    {
        "timestamp": "14:51:50",
        "interface": 124,
        "monitoring": 198,
        "offloading": 231,
        "merging": 530
    },
    {
        "timestamp": "14:52:00",
        "interface": 228,
        "monitoring": 180,
        "offloading": 277,
        "merging": 613
    },
    {
        "timestamp": "14:52:10",
        "interface": 227,
        "monitoring": 105,
        "offloading": 150,
        "merging": 904
    },
    {
        "timestamp": "14:52:20",
        "interface": 287,
        "monitoring": 104,
        "offloading": 111,
        "merging": 954
    },
    {
        "timestamp": "14:52:30",
        "interface": 284,
        "monitoring": 246,
        "offloading": 275,
        "merging": 691
    },
    {
        "timestamp": "14:52:40",
        "interface": 174,
        "monitoring": 123,
        "offloading": 169,
        "merging": 527
    },
    {
        "timestamp": "14:52:50",
        "interface": 275,
        "monitoring": 264,
        "offloading": 294,
        "merging": 642
    },
    {
        "timestamp": "14:53:00",
        "interface": 171,
        "monitoring": 166,
        "offloading": 242,
        "merging": 798
    },
    {
        "timestamp": "14:53:10",
        "interface": 193,
        "monitoring": 280,
        "offloading": 213,
        "merging": 793
    }
]

cpu_usg_info = [
  {
    "timestamp": "14:50:00",
    "storage_cpu_usage": 268,
  },
  {
    "timestamp": "14:50:10",
    "storage_cpu_usage": 141,
  },
  {
    "timestamp": "14:50:20",
    "storage_cpu_usage": 322,
  },
  {
    "timestamp": "14:50:30",
    "storage_cpu_usage": 148,
  },
  {
    "timestamp": "14:50:40",
    "storage_cpu_usage": 469,
  },
  {
    "timestamp": "14:50:50",
    "storage_cpu_usage": 235,
  },
  {
    "timestamp": "14:51:00",
    "storage_cpu_usage": 461,
  },
  {
    "timestamp": "14:51:10",
    "storage_cpu_usage": 466,
  },
  {
    "timestamp": "14:51:20",
    "storage_cpu_usage": 437,
  },
  {
    "timestamp": "14:51:30",
    "storage_cpu_usage": 289,
  },
  {
    "timestamp": "14:51:40",
    "storage_cpu_usage": 448,
  },
  {
    "timestamp": "14:51:50",
    "storage_cpu_usage": 129,
  },
  {
    "timestamp": "14:52:00",
    "storage_cpu_usage": 244,
  },
  {
    "timestamp": "14:52:10",
    "storage_cpu_usage": 376,
  },
  {
    "timestamp": "14:52:20",
    "storage_cpu_usage": 475,
  },
  {
    "timestamp": "14:52:30",
    "storage_cpu_usage": 194,
  },
  {
    "timestamp": "14:52:40",
    "storage_cpu_usage": 140,
  },
  {
    "timestamp": "14:53:00",
    "storage_cpu_usage": 302,
  },
  {
    "timestamp": "14:53:10",
    "storage_cpu_usage": 379,
  }
]

memory_usg_info = [
  {
    "timestamp": "14:50:00",
    "storage_memory_usage": 337,
  },
  {
    "timestamp": "14:50:20",
    "storage_memory_usage": 348,
  },
  {
    "timestamp": "14:50:30",
    "storage_memory_usage": 365,
  },
  {
    "timestamp": "14:50:40",
    "storage_memory_usage": 442,
  },
  {
    "timestamp": "14:50:50",
    "storage_memory_usage": 406,
  },
  {
    "timestamp": "14:51:00",
    "storage_memory_usage": 452,
  },
  {
    "timestamp": "14:51:10",
    "storage_memory_usage": 477,
  },
  {
    "timestamp": "14:51:20",
    "storage_memory_usage": 495,
  },
  {
    "timestamp": "14:51:30",
    "storage_memory_usage": 359,
  },
  {
    "timestamp": "14:51:40",
    "storage_memory_usage": 358,
  },
  {
    "timestamp": "14:51:50",
    "storage_memory_usage": 404,
  },
  {
    "timestamp": "14:52:00",
    "storage_memory_usage": 327,
  },
  {
    "timestamp": "14:52:10",
    "storage_memory_usage": 384,
  },
  {
    "timestamp": "14:52:20",
    "storage_memory_usage": 420,
  },
  {
    "timestamp": "14:52:30",
    "storage_memory_usage": 382,
  },
  {
    "timestamp": "14:52:40",
    "storage_memory_usage": 416,
  },
  {
    "timestamp": "14:52:50",
    "storage_memory_usage": 325,
  },
  {
    "timestamp": "14:53:00",
    "storage_memory_usage": 489,
  },
  {
    "timestamp": "14:53:10",
    "storage_memory_usage": 397,
  }
]

network_usage_info = [
  {
    "timestamp": "14:50:00",
    "storage_network_usage": 169,
  },
  {
    "timestamp": "14:50:10",
    "storage_network_usage": 182,
  },
  {
    "timestamp": "14:50:20",
    "storage_network_usage": 153,
  },
  {
    "timestamp": "14:50:30",
    "storage_network_usage": 111,
  },
  {
    "timestamp": "14:50:40",
    "storage_network_usage": 195,
  },
  {
    "timestamp": "14:50:50",
    "storage_network_usage": 201
  },
  {
    "timestamp": "14:51:00",
    "storage_network_usage": 161
  },
  {
    "timestamp": "14:51:10",
    "storage_network_usage": 295
  },
  {
    "timestamp": "14:51:20",
    "storage_network_usage": 124
  },
  {
    "timestamp": "14:51:30",
    "storage_network_usage": 228
  },
  {
    "timestamp": "14:51:40",
    "storage_network_usage": 112
  },
  {
    "timestamp": "14:51:50",
    "storage_network_usage": 299
  },
  {
    "timestamp": "14:52:00",
    "storage_network_usage": 267
  },
  {
    "timestamp": "14:52:10",
    "storage_network_usage": 250
  },
  {
    "timestamp": "14:52:20",
    "storage_network_usage": 294
  },
  {
    "timestamp": "14:52:30",
    "storage_network_usage": 187
  },
  {
    "timestamp": "14:52:40",
    "storage_network_usage": 280
  },
  {
    "timestamp": "14:52:50",
    "storage_network_usage": 260
  },
  {
    "timestamp": "14:53:00",
    "storage_network_usage": 269
  },
  {
    "timestamp": "14:53:10",
    "storage_network_usage": 142
  }
]

power_usg_info = [
  {
    "timestamp": "14:50:00",
    "storage_power_usage": 641
  },
  {
    "timestamp": "14:50:10",
    "storage_power_usage": 524
  },
  {
    "timestamp": "14:50:20",
    "storage_power_usage": 856
  },
  {
    "timestamp": "14:50:30",
    "storage_power_usage": 797
  },
  {
    "timestamp": "14:50:40",
    "storage_power_usage": 671
  },
  {
    "timestamp": "14:50:50",
    "storage_power_usage": 774
  },
  {
    "timestamp": "14:51:00",
    "storage_power_usage": 920
  },
  {
    "timestamp": "14:51:10",
    "storage_power_usage": 841
  },
  {
    "timestamp": "14:51:20",
    "storage_power_usage": 509
  },
  {
    "timestamp": "14:51:30",
    "storage_power_usage": 912
  },
  {
    "timestamp": "14:51:40",
    "storage_power_usage": 818
  },
  {
    "timestamp": "14:51:50",
    "storage_power_usage": 534
  },
  {
    "timestamp": "14:52:00",
    "storage_power_usage": 772
  },
  {
    "timestamp": "14:52:10",
    "storage_power_usage": 842
  },
  {
    "timestamp": "14:52:20",
    "storage_power_usage": 856
  },
  {
    "timestamp": "14:52:30",
    "storage_power_usage": 559
  },
  {
    "timestamp": "14:52:40",
    "storage_power_usage": 709
  },
  {
    "timestamp": "14:52:50",
    "storage_power_usage": 746
  },
  {
    "timestamp": "14:53:00",
    "storage_power_usage": 912
  },
  {
    "timestamp": "14:53:10",
    "storage_power_usage": 815
  }
]

csd_capacity_info = {
  "csd1": {
    "csd_storage_capacity": 37.3
  },
  "csd2": {
    "csd_storage_capacity": 82.9
  },
  "csd3": {
    "csd_storage_capacity": 92.7
  },
  "csd4": {
    "csd_storage_capacity": 73.2
  },
  "csd5": {
    "csd_storage_capacity": 52.9
  },
  "csd6": {
    "csd_storage_capacity": 33.7
  },
  "csd7": {
    "csd_storage_capacity": 47.3
  },
  "csd8": {
    "csd_storage_capacity": 84.8
  }
}

selected_csd_info = [
  {
    "timestamp": "14:50:00",
    "cpu_usage": 107,
    "memory_usage": 270,
    "network_usage": 395,
    "power_usage": 746
  },
  {
    "timestamp": "14:50:10",
    "cpu_usage": 152,
    "memory_usage": 199,
    "network_usage": 283,
    "power_usage": 542
  },
  {
    "timestamp": "14:50:20",
    "cpu_usage": 381,
    "memory_usage": 289,
    "network_usage": 379,
    "power_usage": 554
  },
  {
    "timestamp": "14:50:30",
    "cpu_usage": 368,
    "memory_usage": 338,
    "network_usage": 340,
    "power_usage": 633
  },
  {
    "timestamp": "14:50:40",
    "cpu_usage": 110,
    "memory_usage": 238,
    "network_usage": 350,
    "power_usage": 825
  },
  {
    "timestamp": "14:50:50",
    "cpu_usage": 351,
    "memory_usage": 156,
    "network_usage": 184,
    "power_usage": 528
  },
  {
    "timestamp": "14:51:00",
    "cpu_usage": 330,
    "memory_usage": 204,
    "network_usage": 328,
    "power_usage": 585
  },
  {
    "timestamp": "14:51:10",
    "cpu_usage": 386,
    "memory_usage": 125,
    "network_usage": 286,
    "power_usage": 769
  },
  {
    "timestamp": "14:51:20",
    "cpu_usage": 122,
    "memory_usage": 373,
    "network_usage": 253,
    "power_usage": 763
  },
  {
    "timestamp": "14:51:30",
    "cpu_usage": 174,
    "memory_usage": 288,
    "network_usage": 337,
    "power_usage": 611
  },
  {
    "timestamp": "14:51:40",
    "cpu_usage": 341,
    "memory_usage": 300,
    "network_usage": 210,
    "power_usage": 824
  },
  {
    "timestamp": "14:51:50",
    "cpu_usage": 243,
    "memory_usage": 235,
    "network_usage": 175,
    "power_usage": 943
  },
  {
    "timestamp": "14:52:00",
    "cpu_usage": 215,
    "memory_usage": 261,
    "network_usage": 242,
    "power_usage": 913
  },
  {
    "timestamp": "14:52:10",
    "cpu_usage": 158,
    "memory_usage": 375,
    "network_usage": 173,
    "power_usage": 832
  },
  {
    "timestamp": "14:52:20",
    "cpu_usage": 333,
    "memory_usage": 331,
    "network_usage": 152,
    "power_usage": 504
  },
  {
    "timestamp": "14:52:30",
    "cpu_usage": 172,
    "memory_usage": 309,
    "network_usage": 180,
    "power_usage": 888
  },
  {
    "timestamp": "14:52:40",
    "cpu_usage": 303,
    "memory_usage": 110,
    "network_usage": 258,
    "power_usage": 897
  },
  {
    "timestamp": "14:52:50",
    "cpu_usage": 263,
    "memory_usage": 150,
    "network_usage": 186,
    "power_usage": 851
  },
  {
    "timestamp": "14:53:00",
    "cpu_usage": 338,
    "memory_usage": 368,
    "network_usage": 335,
    "power_usage": 795
  },
  {
    "timestamp": "14:53:10",
    "cpu_usage": 130,
    "memory_usage": 255,
    "network_usage": 266,
    "power_usage": 774
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
#                                   Validator 화면                                 #
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

# validator log는 query 수행 데이터와 동일

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
        data = request.json
        workbench_user_id = data['workbench_user_id']
        if workbench_user_id == "keti_opencsd":
            print("Login to CSD")
            return jsonify({'loginto': 'csd'})
        elif workbench_user_id == "keti_mysql":
            print("Login to SSD")
            return jsonify({'loginto': 'ssd'})
    return render_template('index.html') 


# DB Monitoring - CSD
@app.route('/monitoring')  
def monitoring():
    return render_template('monitoring-csd.html', dashboard_summary=dashboard_summary)

# DDL Data Get 요청
@app.route('/get_queryChart', methods=['GET'])
def get_queryChart():
    # print("get chart")
    return jsonify(ddl_info)

# 연결된 클라이언트 수 Get 요청
@app.route('/get_ConnectedClient', methods=['GET'])
def get_ConnectedClient():
    # print("get client")
    return jsonify(connected_client)

# Disk R/W Get 요청
@app.route('/get_ReadWrite', methods=['GET'])
def get_ReadWrite():
    # print("get R/W")
    return jsonify(disk_rw_info)

# Cache Hit Get 요청
@app.route('/get_CacheHit', methods=['GET'])
def get_CacheHit():
    # print("get Cache Hit")
    return jsonify(chache_hit_info)

# Cache Usage Get 요청
@app.route('/get_CacheUsage', methods=['GET'])
def get_CacheUsage():
    # print("get Cache Usage")
    return jsonify(chache_usage_info)

# DB Scna/Filter Get 요청
@app.route('/get_ScanFilter', methods=['GET'])
def get_ScanFilter():
    # print("get Scan Filter")
    return jsonify(scan_filter_info)

# Host Server Interface CPU 사용 값 Get 요청
@app.route('/get_hostServerCPU', methods=['GET'])
def get_hostServerCPU():
    # print("get host server cpu")
    return jsonify(interface_cpu)

# Host Server CPU 사용량
@app.route('/get_HostCSDcpu', methods=['GET'])
def get_HostCSDcpu():
    # print("get Host CSD CPU")
    return jsonify(cpu_usg_info)

# Host Server Memory 사용량
@app.route('/get_HostCSDMemory', methods=['GET'])
def get_HostCSDMemory():
    # print("get Host CSD Memory")
    return jsonify(memory_usg_info)

# Host Server Network 사용량
@app.route('/get_HostCSDNetwork', methods=['GET'])
def get_HostCSDNetwork():
    # print("get Host CSD Network")
    return jsonify(network_usage_info)

# Host Server Power 사용량
@app.route('/get_HostCSDPower', methods=['GET'])
def get_HostCSDPower():
    # print("get Host CSD Power")
    return jsonify(power_usg_info)
  
# CSD 사용중인 저장 용량
@app.route('/get_CSDCapacity', methods=['GET'])
def get_CSDCapacity():
  # print("get CSD Capacity")
  return jsonify(csd_capacity_info)
  
# 선택한 CSD의 메트릭 정보
@app.route('/get_SelectedCSDMetric', methods=['GET', 'POST'])
def get_SelectedCSDMetric():
  return jsonify(selected_csd_info)

# DB Monitoring - SSD
@app.route('/monitoring_ssd')  
def monitoring_ssd():
    return render_template('monitoring-ssd.html', dashboard_summary=dashboard_summary)

###############################################
#                Query 수행 화면              #
@app.route('/query') # Query Pushdown 화면으로 전환
def query():
    return render_template('query-csd.html')

@app.route('/query-ssd') # Query Pushdown 화면으로 전환
def query_ssd():
    return render_template('query-ssd.html')

@app.route('/validator') # Validator 화면으로 전환
def validate():
    return render_template('validator.html')

if __name__ == '__main__':
    app.run(host="10.0.4.87", port=7777, debug=True)
