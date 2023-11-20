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
    // description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
  },
  title: {
    text: 'Connected Client',
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
    // pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
  },
  plotOptions: 
  {
    area: 
    {
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
      data: [],
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
    text: 'Disk Read/Write Byte'
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
        text: '(B/s)'
    }
},
tooltip: {
    // pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
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
series: [{
    name: 'R/W Byte',
    data: [],
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
    // pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
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
series: [{
    name: 'Cache Hit Rate',
    data: [],
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
    // pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
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
series: [{
    name: 'DB Cache Usage',
    step: 'center',
    data: [],
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
      // pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
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
      data: [],
      color: '#FFBDBD'
    },
    {
      name: 'Filtered Rows',
      data: [],
      color: '#9BDEFF'
    },
    {
      type: 'line',
      name: 'Filtered Ratio',
      yAxis: 1,
      data: [],
      color: '#000000'
    }
  ]
}

// Host Server/CSD의 CPU 사용량
var HostCSDCpuUsageOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Host Server/CSD CPU Usage'
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
  {
    title: {
        text: '(%)'
    }
  },
  tooltip: {
    shared: true,
      // pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
  },
  plotOptions: {
      area: {
        stacking: 'normal',
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
      name: 'Host Server',
      data: [],
      color: '#A0D565'
    },
  ]
}

// Host Server/CSD의 Memory 사용량
var HostCSDMemoryOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Host Server/CSD Memory Usage'
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
  {
    title: {
        text: '(MB)'
    }
  },
  tooltip: {
    shared: true,
      // pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
  },
  plotOptions: {
      area: {
        stacking: 'normal',
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
      name: 'Host Server',
      data: [],
      color: '#A0D565'
    },
  ]
}

// Host Server/CSD의 Network 사용량
var HostCSDNetworkOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Host Server/CSD Network Usage'
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
  {
    title: {
        text: '(MB)'
    }
  },
  tooltip: {
    shared: true,
      // pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
  },
  plotOptions: {
      area: {
        stacking: 'normal',
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
      name: 'Host Server',
      data: [],
      color: '#A0D565'
    },
  ]
}

// Host Server의 Power 사용량
var HostCSDPowerOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Host Server Power Usage'
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
  {
    title: {
        text: '(W)'
    }
  },
  tooltip: {
      // pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
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
  [{
    name: 'Host Server',
    data: [],
    color: {
      linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
      },
      stops: [
          [0, '#A0D565'],
          [1, '#D8EEC0']
      ]
    }
  }]
}

var CSDCapacityOption = {
  chart: {
    type: 'column'
},
title: {
    text: 'CSD Capacity'
},
xAxis: {
    type: 'category',
    labels: {
        autoRotation: [-45, -90],
        style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
        }
    }
},
yAxis: {
    min: 0,
    title: {
        text: '(GB)'
    }
},
plotOptions: {
  column: {
      // dataLabels: {
      //     enabled: true,
      //     textAnchor: 'start',
      //     crop: false,
      //     overflow: 'none',
      //     rotation: 0,
      //     // formatter: function() {
      //     //     return this.y; // 데이터 값을 반환
      //     format: '{point.y:.1f} (GB)'
      // }
      
  }
},
legend: {
    enabled: false
},
tooltip: {
    pointFormat: 'Using Capacity: <b>{point.y:.1f} (GB)</b>'
},
series: [{
    name: 'CSD Capacity',
    colors: ['#C167FF', '#BC9DFF', '#B6B5FF','#ADCAFF', '#A3DAFF', '#9BD2FF', '#85C8FF', '#61B8FF'],
    // colors: ['#D8EEC0', '#FFAFAF', '#FFAFAF','#FEDBB0', '#D8EEC0', '#D8EEC0', '#D8EEC0', '#FFAFAF'], //초록빨강
    colorByPoint: true,
    groupPadding: 0,
    data: [
        ['CSD1', 37.3],
        ['CSD2', 82.9],
        ['CSD3', 92.7],
        ['CSD4', 73.2],
        ['CSD5', 52.9],
        ['CSD6', 33.7],
        ['CSD7', 47.3],
        ['CSD8', 84.8]
    ],
    dataLabels: {
        enabled: true,
        color: '#FFFFFF',
        // align: 'right',
        format: '{point.y:.1f} (GB)', // one decimal
        y: 30, // 10 pixels down from the top
        style: {
            fontSize: '18px',
            fontFamily: 'Verdana, sans-serif'
        }
    }
  }]
}