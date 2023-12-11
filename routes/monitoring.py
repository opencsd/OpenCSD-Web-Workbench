# -*- coding: utf-8 -*-

dashboard_summary = {
    'dbms_type': 'MySQL',
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


from flask import Blueprint, jsonify, request, render_template
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from connectDB import influx, mysql, info
from collections import deque 

monitoring_bp = Blueprint('monitoring', __name__, url_prefix='/monitoring')

ddl_count_outer = [] 
client_count_outer = [] 
disk_ratio_outer = []
cache_hit_ratio_outer = []
cache_usage_ratio_outer = []
scan_filter_ratio_outer = []
disk_capacity_outer = {}

def get_csd_metric():
  query = "select * from database_monitoring order by desc limit 20;"
  result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, 'keti_db', query)

  for i in range(len(result[0])):
    # ddl count
    ddl_count_inner = {} 
    ddl_count_inner["timestamp"] = 0
    ddl_count_inner["select_count"] = result[0][i].get('select_count')
    ddl_count_inner["insert_count"] = result[0][i].get('insert_count')
    ddl_count_inner["delete_count"] = result[0][i].get('delete_count')
    ddl_count_inner["update_count"] = result[0][i].get('update_count')
    ddl_count_outer.append(ddl_count_inner)
  
    # client count
    client_count_inner = {} 
    ddl_count_inner["timestamp"] = 0
    ddl_count_inner["select_count"] = result[0][i].get('client_count')
    client_count_outer.append(client_count_inner)
    
    # disk r/w ratio
    disk_ratio_inner = {} 
    disk_ratio_inner["timestamp"] = 0
    disk_ratio_inner["select_count"] = result[0][i].get('disk_read_rate')
    disk_ratio_inner["insert_count"] = result[0][i].get('disk_write_rate')
    disk_ratio_outer.append(disk_ratio_inner)
    
    # cache hit ratio
    cache_hit_ratio_inner = {} 
    cache_hit_ratio_inner["timestamp"] = 0
    cache_hit_ratio_inner["select_count"] = result[0][i].get('cache_hit_rate')
    cache_hit_ratio_outer.append(cache_hit_ratio_inner)
    
    # cache usage
    cache_usage_ratio_inner = {} 
    cache_usage_ratio_inner["timestamp"] = 0
    cache_usage_ratio_inner["select_count"] = result[0][i].get('cache_usage_rate')
    cache_usage_ratio_outer.append(cache_usage_ratio_inner)
    
    # scan/filter 
    scan_filter_ratio_inner = {} 
    scan_filter_ratio_inner["timestamp"] = 0
    scan_filter_ratio_inner["select_count"] = result[0][i].get('csd_scan_row_count')
    scan_filter_ratio_inner["insert_count"] = result[0][i].get('csd_filter_row_count')
    scan_filter_ratio_outer.append(scan_filter_ratio_inner)

    # csd_result = influx.execute_query_influxdb(info.PLATFORM_METRIC_DB_HOST, info.PLATFORM_METRIC_DB_PORT, info.PLATFORM_METRIC_DB_USER, info.PLATFORM_METRIC_DB_PASSWORD, info.PLATFORM_METRIC_DB_NAME, query_str)
    # print(csd_result)
    # csd 1~8 metric monitoring

    for i in range(1, 5):
      disk_capacity_inner = {}
      csd_num = str(i)
      csd_query_str = "select disk_usage from csd" + csd_num + "_metric order by desc limit 1"
      csd_result = influx.execute_query_influxdb(info.PLATFORM_METRIC_DB_HOST, info.PLATFORM_METRIC_DB_PORT, info.PLATFORM_METRIC_DB_USER, info.PLATFORM_METRIC_DB_PASSWORD, info.PLATFORM_METRIC_DB_NAME, csd_query_str)
      disk_capacity_inner['csd_storage_capacity'] = csd_result[0][0].get('disk_usage')

      csd_name = "csd" + csd_num
      disk_capacity_outer[csd_name] = disk_capacity_inner


cpu_usage_outer = deque(maxlen=20)
memory_usage_outer = deque(maxlen=20)
disk_usage_outer = deque(maxlen=20)
network_usage_outer = deque(maxlen=20)
power_usage_outer = deque(maxlen=20)

def get_instance_metric():
  query = "select * from instance_monitoring order by desc limit 20;"
  result = influx.execute_query_influxdb(info.INSTANCE_METRIC_DB_HOST, info.INSTANCE_METRIC_DB_PORT, info.INSTANCE_METRIC_DB_USER, info.INSTANCE_METRIC_DB_PASSWORD, "keti_db", query)
  for i in range(len(result[0])):
    cpu_usage_inner = {}
    cpu_usage_inner['timestamp'] = 0
    cpu_usage_inner['storage_cpu_usage'] = result[0][i].get('cpu_usage')

    memory_usage_inner = {}
    memory_usage_inner['timestamp'] = 0
    memory_usage_inner['storage_memory_usage'] = result[0][i].get('memory_usage')
    
    disk_usage_inner = {}
    disk_usage_inner['timestamp'] = 0
    disk_usage_inner['disk_usage'] = result[0][i].get('disk_usage')
    
    network_usage_inner = {}
    network_usage_inner['timestamp'] = 0
    network_rx_byte = result[0][i].get('network_rx_usage')
    network_tx_byte = result[0][i].get('network_tx_usage')
    if network_rx_byte is None or network_tx_byte is None:
      pass
    else:
      network_usage_inner['storage_network_usage'] = result[0][i].get('network_rx_usage') + result[0][i].get('network_tx_usage')

    # power_usage_inner = {}
    # power_usage_inner['timestamp'] = 0
    # power_usage_inner['storage_power_usage'] = result[0][i].get('power_usage')

    cpu_usage_outer.append(cpu_usage_inner)
    memory_usage_outer.append(memory_usage_inner)
    disk_usage_outer.append(disk_usage_inner)
    network_usage_outer.append(network_usage_inner)
    # power_usage_outer.append(power_usage_inner)

get_instance_metric()
# print(cpu_usage_outer)
# print(disk_usage_outer)
# print(network_usage_outer)
# print(power_usage_outer)

@monitoring_bp.route('/')  
def monitoring():
  return render_template('monitoring-csd.html', dashboard_summary=dashboard_summary)

# DDL Data Get 요청
@monitoring_bp.route('/get_queryChart', methods=['GET'])
def get_queryChart():
  return jsonify(ddl_count_outer)

# 연결된 클라이언트 수 Get 요청
@monitoring_bp.route('/get_ConnectedClient', methods=['GET'])
def get_ConnectedClient():
    return jsonify(client_count_outer)

# Disk R/W Get 요청
@monitoring_bp.route('/get_ReadWrite', methods=['GET'])
def get_ReadWrite():
    # print("get R/W")
    # return jsonify(disk_rw_info)
    return jsonify(disk_ratio_outer)

# Cache Hit Get 요청
@monitoring_bp.route('/get_CacheHit', methods=['GET'])
def get_CacheHit():
    # print("get Cache Hit")
    # return jsonify(chache_hit_info)
    return jsonify(cache_hit_ratio_outer)

# Cache Usage Get 요청
@monitoring_bp.route('/get_CacheUsage', methods=['GET'])
def get_CacheUsage():
    # print("get Cache Usage")
    # return jsonify(chache_usage_info)
    return jsonify(cache_usage_ratio_outer)

# DB Scan/Filter Get 요청
@monitoring_bp.route('/get_ScanFilter', methods=['GET'])
def get_ScanFilter():
    # print("get Scan Filter")
    return jsonify(scan_filter_ratio_outer)

# Host Server Interface 사용 값 Get 요청
@monitoring_bp.route('/get_hostServerCPU', methods=['GET'])
def get_hostServerCPU():
    # print("get host server cpu")
    return jsonify(interface_cpu)

# Host Server CPU 사용량
@monitoring_bp.route('/get_HostCSDcpu', methods=['GET'])
def get_HostCSDcpu():
    # print("get Host CSD CPU")
    # return jsonify(cpu_usg_info)
    return jsonify(list(cpu_usage_outer))

# Host Server Memory 사용량
@monitoring_bp.route('/get_HostCSDMemory', methods=['GET'])
def get_HostCSDMemory():
    # print("get Host CSD Memory")
    # return jsonify(memory_usg_info)
    return jsonify(list(memory_usage_outer))

# Host Server Network 사용량
@monitoring_bp.route('/get_HostCSDNetwork', methods=['GET'])
def get_HostCSDNetwork():
    # print("get Host CSD Network")
    # return jsonify(network_usage_info)
    return jsonify(list(network_usage_outer))

# Host Server Power 사용량
@monitoring_bp.route('/get_HostCSDPower', methods=['GET'])
def get_HostCSDPower():
    # print("get Host CSD Power")
    return jsonify(power_usg_info)
  

# CSD 사용중인 저장 용량
@monitoring_bp.route('/get_CSDCapacity', methods=['GET'])
def get_CSDCapacity():
  # disk_capacity_outer = {}
  
  # for i in range(1, 5):
  #   disk_capacity_inner = {}
  #   csd_num = str(i)
  #   query_str = "select disk_usage from csd" + csd_num + "_metric order by time desc limit 1"
  #   result = influx.execute_query_influxdb(info.INFLUX_CSD_IP, info.INFLUX_CSD_PORT, info.INFLUX_CSD_USERNAME, info.INFLUX_CSD_PORT, info.INFLUX_CSD_DB, query_str)
  #   disk_capacity_inner['csd_storage_capacity'] = result[0][0].get('disk_usage')

  #   csd_name = "csd" + csd_num
  #   disk_capacity_outer[csd_name] = disk_capacity_inner
  print(disk_capacity_outer)
  return jsonify(disk_capacity_outer)

  
# 선택한 CSD의 메트릭 정보
@monitoring_bp.route('/get_SelectedCSDMetric', methods=['GET', 'POST'])
def get_SelectedCSDMetric():
  if request.method == 'POST': # 클릭 이벤트 발생 시, 해당 csd에 대한 메트릭 자세하게 출력 
      data = request.json
      csd_id = data['seletesCSD']
  
  csd_metric_outer = []
  query_str = "select current_time, cpu_usage, memory_usage, network_bandwidth from " + csd_id + "_metric order by desc limit 20"
  result = influx.execute_query_influxdb(info.INFLUX_CSD_IP, info.INFLUX_CSD_PORT, info.INFLUX_CSD_USERNAME, info.INFLUX_CSD_PORT, info.INFLUX_CSD_DB, query_str)

  for i in range(len(result[0])):
    csd_metric_inner = {} 
    csd_metric_inner["timestamp"] = result[0][i].get('current_time')
    csd_metric_inner["cpu_usage"] = result[0][i].get('cpu_usage')
    csd_metric_inner["memory_usage"] = result[0][i].get('memory_usage')
    csd_metric_inner["network_usage"] = result[0][i].get('network_bandwidth')
    csd_metric_inner["power_usage"] = result[0][i].get('network_bandwidth')
    csd_metric_outer.append(csd_metric_inner)

  return jsonify(csd_metric_outer)
  # return jsonify(selected_csd_info)
