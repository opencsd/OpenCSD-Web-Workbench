var queryChartOption = {
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
    categories: []
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
    // headerFormat: '<b>{point.x}</b><br/>',
    // pointFormat: '{series.name}: {point.y}<br/>DDL Total: {point.stackTotal}',
  },
  plotOptions: {
    line : {
      linewidth: 0
    },
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: false
      }
    }
  },
  series: [{
    name: 'Select',
    data: [],
    dataLabels: {
      enabled: false
    },
    color: 'rgba(135,206,250,1)'
  }, {
    name: 'Insert',
    data: [],
    dataLabels: {
      enabled: false
    },
    color: 'rgba(255, 165, 0, 0.5)'
  }, {
    name: 'Update',
    data: [],
    dataLabels: {
      enabled: false
    },
    color: 'rgba(0, 128, 0, 0.5)'
  }, {
    name: 'Delete',
    data: [],
    dataLabels: {
      enabled: false
    },
    color:'rgba(255, 0, 0, 0.6)'
  }]
}

var hostServerCPUChartOption = {
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
    title: {
      text: null
    },
    categories: []
  },
  yAxis: {
      title: {
          useHTML: true,
          text: null
      }
  },
  tooltip: {
      shared: true,
      headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
  },
  plotOptions: {
      line: {
        lineWidth: 0
      },
      area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
              enabled: false,
              lineWidth: 1,
              lineColor: '#666666'
          }
      }
  },
  series: [
    {
      name: "Interface Container CPU Usage",
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
      lineWidth: 0
    }, 
    {
      name: "Monitoring Container CPU Usage",
      data: [],
      fillColor: "rgba(70, 130, 180, 0.7)", 
      lineWidth: 0
    }, 
    {
      name: "Offloading Container CPU Usage",
      data: [],
      fillColor:  "rgba(100, 149, 237, 0.7)", 
      lineWidth: 0
    }, 
    {
      name: "Merging Container CPU Usage",
      data: [],
      fillColor: "rgba(173, 216, 230, 0.7)", 
      lineWidth: 0
    }
  ]
}

// 연결된 클라이언트 수 그래프
var ConnectedClientOption = {
  chart: {
    type: 'area'
  },
  accessibility: {
    description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
  },
  title: {
    text: 'Connected Client'
  },
  // subtitle: {
  //   text: 'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
  //       'target="_blank">FAS</a>'
  // },
  xAxis: {
    allowDecimals: false,
    accessibility: {
        rangeDescription: null
    }
  },
  yAxis: {
    title: {
        text: null
    }
  },
  tooltip: 
  {
    pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
  },
  plotOptions: 
  {
    area: 
    {
      pointStart: 1940,
      marker: 
      {
        enabled: false,
        symbol: 'circle',
        radius: 2,
        states: 
        {
          hover: 
          {
            enabled: true
          }
        }
      }
    }
  },
  series: [
    {
      name: 'Connected Client',
      data: [
          1, 5, 25, 50, 120, 150, 200, 426, 660, 863, 1048, 1627, 2492,
          3346, 4259, 5242, 6144, 7091, 8400, 9490, 10671, 11736, 13279,
          14600, 15878, 17286, 19235, 22165, 24281, 26169, 28258, 30665,
          32146, 33486, 35130, 36825, 38582, 40159, 38107, 36538, 35078,
          32980, 29154, 26734, 24403, 21339, 18179, 15942, 15442, 14368,
          13188, 12188, 11152, 10114, 9076, 8038, 7000, 6643, 6286, 5929,
          5527, 5215, 4858, 4750, 4650, 4600, 4500, 4490, 4300, 4350, 4330,
          4310, 4495, 4477
      ],
      color: {
        linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
        },
        stops: [
            [0, '#B9C5F1'], //진한색
            [1, '#A8D3EE']  //연한색
        ]
      }
    }
  ]
}

// Disk Read/Write 비율 그래프
var DBRWRateOption = {
  chart: {
    type: 'area'
},
title: {
    text: 'Disk Read/Write Rate'
},
subtitle: {
    text: null
},
xAxis: {
    allowDecimals: false,
    accessibility: {
        rangeDescription: 'Range: 1940 to 2017.'
    }
},
yAxis: {
    title: {
        text: null
    }
},
tooltip: {
    pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
},
plotOptions: {
    area: {
        pointStart: 1940,
        marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
                hover: {
                    enabled: true
                }
            }
        }
    }
},
series: [{
    name: 'R/W Rate',
    data: [
        null, null, null, null, null, 2, 9, 13, 50, 170, 299, 438, 841,
        1169, 1703, 2422, 3692, 5543, 7345, 12298, 18638, 22229, 25540,
        28133, 29463, 31139, 31175, 31255, 29561, 27552, 26008, 25830,
        26516, 27835, 28537, 27519, 25914, 25542, 24418, 24138, 24104,
        23208, 22886, 23305, 23459, 23368, 23317, 23575, 23205, 22217,
        21392, 19008, 13708, 11511, 10979, 10904, 11011, 10903, 10732,
        10685, 10577, 10526, 10457, 10027, 8570, 8360, 7853, 5709, 5273,
        5113, 5066, 4897, 4881, 4804, 4717, 4571, 4018, 3822, 3785, 3805,
        3750, 3708, 3708
    ],
    color: {
      linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
      },
      stops: [
          [0, '#ACC777'],
          [1, '#E0EACC']
      ]
    }
  }]
}

// Cache Hit 비율
var DBCacheHitRateOption = {
  chart: {
    type: 'area'
},
title: {
    text: 'DB Cache Hit Rate'
},
subtitle: {
    text: null
},
xAxis: {
    allowDecimals: false,
    accessibility: {
        rangeDescription: 'Range: 1940 to 2017.'
    }
},
yAxis: {
    title: {
        text: null
    }
},
tooltip: {
    pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
},
plotOptions: {
    area: {
        pointStart: 1940,
        marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
                hover: {
                    enabled: true
                }
            }
        }
    }
},
series: [{
    name: 'Cache Hit Rate',
    data: [
        null, null, null, null, null, 2, 9, 13, 50, 170, 299, 438, 841,
        1169, 1703, 2422, 3692, 5543, 7345, 12298, 18638, 22229, 25540,
        28133, 29463, 31139, 31175, 31255, 29561, 27552, 26008, 25830,
        26516, 27835, 28537, 27519, 25914, 25542, 24418, 24138, 24104,
        23208, 22886, 23305, 23459, 23368, 23317, 23575, 23205, 22217,
        21392, 19008, 13708, 11511, 10979, 10904, 11011, 10903, 10732,
        10685, 10577, 10526, 10457, 10027, 8570, 8360, 7853, 5709, 5273,
        5113, 5066, 4897, 4881, 4804, 4717, 4571, 4018, 3822, 3785, 3805,
        3750, 3708, 3708
    ],
    color: {
      linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
      },
      stops: [
          [0, '#D47C79'],
          [1, '#FFFFA7']
      ]
    }
  }]
}

// Cache 사용 용량 비율
var DBCacheUsageOption = {
  chart: {
    type: 'area'
},
title: {
    text: 'DB Cache Usage'
},
subtitle: {
    text: null
},
xAxis: {
    allowDecimals: false,
    accessibility: {
        rangeDescription: 'Range: 1940 to 2017.'
    }
},
yAxis: {
    title: {
        text: null
    }
},
tooltip: {
    pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
},
plotOptions: {
    area: {
        pointStart: 1940,
        marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
                hover: {
                    enabled: true
                }
            }
        }
    }
},
series: [{
    name: 'DB Cache Usage',
    step: 'center',
    data: [
        null, null, null, null, null, 2, 9, 13, 50, 170, 299, 438, 841,
        1169, 1703, 2422, 3692, 5543, 7345, 12298, 18638, 22229, 25540,
        28133, 29463, 31139, 31175, 31255, 29561, 27552, 26008, 25830,
        26516, 27835, 28537, 27519, 25914, 25542, 24418, 24138, 24104,
        23208, 22886, 23305, 23459, 23368, 23317, 23575, 23205, 22217,
        21392, 19008, 13708, 11511, 10979, 10904, 11011, 10903, 10732,
        10685, 10577, 10526, 10457, 10027, 8570, 8360, 7853, 5709, 5273,
        5113, 5066, 4897, 4881, 4804, 4717, 4571, 4018, 3822, 3785, 3805,
        3750, 3708, 3708
    ],
    color: {
      linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
      },
      stops: [
          [0, '#B3A2C7'],
          [1, '#DFD8E8']
      ]
    }
  }]
}

// DB의 CSD 내 Scan/Filter 비율
var DBCSDScanFilterOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'DB Scan/Filter Rate'
  },
  subtitle: {
      text: null
  },
  xAxis: {
      allowDecimals: false,
      accessibility: {
          rangeDescription: null
      }
  },
  yAxis: 
  [
    {
      title: {
          text: 'Rows'
      }
    },
    {
      title: {
        text: 'Scan/Filter Ratio'
    },
    opposite: true
    }
  ],
  tooltip: {
      pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
  },
  plotOptions: {
      area: {
          marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                  hover: {
                      enabled: true
                  }
              }
          }
      }
  },
  series: 
  [
    {
      name: 'Scan Rows',
      data: [
          32980, 29154, 26734, 24403, 21339, 18179, 15942, 15442, 14368,
          13188, 12188, 11152, 10114, 9076, 8038, 7000, 6643, 6286, 5929,
          5527
      ],
      color: '#D9E5C1'
    },
    {
      name: 'Filtered Rows',
      data: [
          23208, 22886, 23305, 23459, 23368, 23317, 23575, 23205, 22217,
          21392, 19008, 13708, 11511, 10979, 10904, 11011, 10903, 10732,
          10685, 10577
      ],
      color: '#FFF7A7'
    },
    {
      type: 'line',
      name: 'Cache Hit Rate',
      yAxis: 1,
      data: 
      [
        50, 80, 70, 60, 42, 51, 65, 65, 12, 54, 
        87, 22, 54, 12, 45, 23, 87, 31, 25, 19
      ],
      color: '#4F81BD'
    }
  ]
}
