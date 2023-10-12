//Database info
var i;

//Database Monitoring
var DB_timestamp_total = ['14:50', '15:20', '15:50', '16:20', '16:50', '17:20', '17:50', '18:20', '18:50', '19:20', '19:50', '20:20', '20:50', '21:20', '21:50', '22:20', '22:50', '23:20', '23:50', '24:20', '24:50']
var select_count_total = [20, 19, 8, 18, 12, 12, 13, 5, 22, 16, 12, 16, 11, 25, 16, 17, 16, 20, 26, 15]
var insert_count_total = [15, 10, 15, 12, 15, 17, 16, 15, 17, 10, 8, 22, 22, 10, 12, 5, 19, 13, 15, 19]
var delete_count_total = [17, 11, 12, 13, 10, 19, 2, 9, 11, 12, 2, 5, 16, 12, 13, 16, 12, 18, 17, 4]
var update_count_total = [10, 8, 2, 9, 5, 22, 9, 19, 13, 7, 5, 16, 19, 13, 19, 6, 16, 4, 9, 8]

//Host Monitoring
var Host_timestamp_total = ['13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00', '15:10', '15:20', '15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30', '16:40', '16:50', '17:00', '17:10']

document.addEventListener("DOMContentLoaded", function () {
  for (i = 0; i < 12; i++) {
    new ApexCharts(document.getElementById("chart-summary" + i), {
      chart: {
        type: "bar",
        fontFamily: "inherit",
        height: 200,
        parentHeightOffset: 0,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 2,
        lineCap: "round",
        curve: "smooth",
      },
      series: [
        {
          name: "SELECT  *  FROM  Sessions  WHERE  User_id  =  ? ",
          data: [
            13281, 8521, 15038, 9983, 15417, 8888, 7052, 14270, 5214, 9587,
            5950, 16852, 17836, 12217, 17406, 12262, 9147, 14961, 18292, 15230,
            13435, 10649, 5140, 13680, 4508, 13271, 13413, 5543, 18727, 18238,
            18175, 6246, 5864, 17847, 9170, 6445, 12945, 8142, 8980, 10422,
            15535, 11569, 10114, 17621, 16138, 13046, 6652, 9906, 14100, 16495,
            6749,
          ],
        },
        {
          name: "SELECT  *  FROM  Sessions  WHERE  Token  =  ?",
          data: [
            3680, 1862, 3070, 2252, 5348, 3091, 3000, 3984, 5176, 5325, 2420,
            5474, 3098, 1893, 3748, 2879, 4197, 5186, 4213, 4334, 2807, 1594,
            4863, 2030, 3752, 4856, 5341, 3954, 3461, 3097, 3404, 4949, 2283,
            3227, 3630, 2360, 3477, 4675, 1901, 2252, 3347, 2954, 5029, 2079,
            2830, 3292, 4578, 3401, 4104, 3749, 4457, 3734,
          ],
        },
        {
          name: "SELECT  *  FROM  Sessions  WHERE  Expires_at  <  ?  AND  User_id  =  ? ",
          data: [
            722, 1866, 961, 1108, 1110, 561, 1753, 1815, 1985, 776, 859, 547,
            1488, 766, 702, 621, 1599, 1372, 1620, 963, 759, 764, 739, 789,
            1696, 1454, 1842, 734, 551, 1689, 1924, 1875, 908, 1675, 1541, 1953,
            534, 502, 1524, 1867, 719, 1472, 1608, 1025, 889, 1150, 654, 1695,
            1662, 1285, 1787,
          ],
        },
      ],
      tooltip: {
        theme: "dark",
      },
      grid: {
        padding: {
          top: -20,
          right: 0,
          left: -4,
          bottom: -4,
        },
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        labels: {
          padding: 0,
        },
        tooltip: {
          enabled: false,
        },
        type: "datetime",
      },
      yaxis: {
        labels: {
          padding: 4,
        },
      },
      labels: [
        "2020-06-20",
        "2020-06-21",
        "2020-06-22",
        "2020-06-23",
        "2020-06-24",
        "2020-06-25",
        "2020-06-26",
        "2020-06-27",
        "2020-06-28",
        "2020-06-29",
        "2020-06-30",
        "2020-07-01",
        "2020-07-02",
        "2020-07-03",
        "2020-07-04",
        "2020-07-05",
        "2020-07-06",
        "2020-07-07",
        "2020-07-08",
        "2020-07-09",
        "2020-07-10",
        "2020-07-11",
        "2020-07-12",
        "2020-07-13",
        "2020-07-14",
        "2020-07-15",
        "2020-07-16",
        "2020-07-17",
        "2020-07-18",
        "2020-07-19",
        "2020-07-20",
        "2020-07-21",
        "2020-07-22",
        "2020-07-23",
        "2020-07-24",
        "2020-07-25",
        "2020-07-26",
        "2020-07-27",
        "2020-07-28",
        "2020-07-29",
        "2020-07-30",
        "2020-07-31",
        "2020-08-01",
        "2020-08-02",
        "2020-08-03",
        "2020-08-04",
        "2020-08-05",
        "2020-08-06",
        "2020-08-07",
        "2020-08-08",
        "2020-08-09",
      ],
      colors: [
        tabler.getColor("facebook"),
        tabler.getColor("twitter"),
        tabler.getColor("dribbble"),
      ],
      legend: {
        show: false,
        position: "bottom",
        offsetY: 12,
        markers: {
          width: 10,
          height: 10,
          radius: 100,
        },
        itemMargin: {
          horizontal: 8,
          vertical: 8,
        },
      },
    }).render();
  }
});

//Database Monitoring(Stack Bar)
document.addEventListener('DOMContentLoaded', function () {
  const chart = Highcharts.chart('main_db_monitoring', {
    chart: {
      type: 'column'
    },
    title: {
      text: null,
      align: 'left'
    },
    xAxis: {
      title: {
        text: null
      },
      categories: DB_timestamp_total
    },
    yAxis: {
      min: 0,
      title: {
        text: null
      },
      stackLabels: {
        enabled: true
      }
    },
    legend: {
      // align: 'left',
      // x: 70,
      // verticalAlign: 'top',
      // y: 70,
      // floating: true,
      // backgroundColor:
      //   Highcharts.defaultOptions.legend.backgroundColor || 'white',
      // borderColor: '#CCC',
      // borderWidth: 1,
      // shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>DDL Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Select',
      data: select_count_total,
      dataLabels: {
        enabled: false
      },
      color: 'rgba(135,206,250,1)'
    }, {
      name: 'Insert',
      data: insert_count_total,
      dataLabels: {
        enabled: false
      },
      color: 'rgba(255, 165, 0, 0.5)'
    }, {
      name: 'Update',
      data: update_count_total,
      dataLabels: {
        enabled: false
      },
      color: 'rgba(0, 128, 0, 0.5)'
    }, {
      name: 'Delete',
      data: delete_count_total,
      dataLabels: {
        enabled: false
      },
      color:'rgba(255, 0, 0, 0.6)'
    }]
  });

});

//Host Metric Monitoring(area)
document.addEventListener('DOMContentLoaded', function () {
  const chart = Highcharts.chart('main_host_monitoring', {
    chart: {
      type: 'area'
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      title : {
        text : null
      },
      categories: Host_timestamp_total
    },
    yAxis: {
      title: {
        text: null
      }
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
          // symbol: 'circle',
          // radius: 2,
          // states: {
          //   hover: {
          //     enabled: true
          //   }
          // }
        },
      }
    },
    series: [
      {
        name: "MySQL CPU Usage",
        data: [38, 41, 43, 33, 56, 51, 39, 34, 31, 42, 54, 47, 36, 45, 57, 52, 30, 46, 44, 58],
        // fillColor: 'rgba(244, 223, 182,0.5)',
        // fillColor: '#87CEFA',
        fillColor: 'rgba(135,206,250,0.7)',
        lineWidth: 0
      }
    ],
  });
});