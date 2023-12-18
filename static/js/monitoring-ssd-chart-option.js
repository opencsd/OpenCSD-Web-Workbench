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
      text: '(ddl count)'
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
    },
    categories: []
  },
  yAxis: {
    title: {
      text: '(Client)'
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
    },
    categories: []
},
yAxis: {
    title: {
        text: '(KB)'
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
    name: 'Disk Read',
    data: [],
    color: '#ACC777'
  },
  {
    name: 'Disk Write',
    data: [],
    color: '#FFD961'
  },
]
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
    },
    categories: []
},
yAxis: {
    title: {
      text: '(KB)'
    }
},
tooltip: {
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

// Cache Hit율
var DBCacheHitRatioOption = {
  chart: {
    type: 'area'
},
title: {
    text: 'DB Cache Hit Ratio'
},
subtitle: {
    text: null
},
xAxis: {
    allowDecimals: false,
    accessibility: {
        rangeDescription: 'Range: 1940 to 2017.'
    },
    categories: []
},
yAxis: {
    title: {
      text: '(%)'
    }
},
tooltip: {
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
          [0, '#E5BA65'],
          [1, '#E5CCAB']
      ]
    }
  }]
}

// // Slow Query 량 
// var SlowQueryOption = {
//   chart: {
//     type: 'area'
//   },
//   title: {
//       text: 'Slow Query'
//   },
//   subtitle: {
//       text: null
//   },
//   xAxis: {
//       allowDecimals: false,
//       accessibility: {
//           rangeDescription: null
//       }
//   },
//   yAxis: 
//   [
//     {
//       title: {
//           text: null
//       }
//     }
//   ],
//   tooltip: {
//       pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
//   },
//   plotOptions: {
//       area: {
//           marker: {
//               enabled: false,
//               symbol: 'circle',
//               radius: 2,
//               states: {
//                   hover: {
//                       enabled: true
//                   }
//               }
//           }
//       }
//   },
//   series: 
//   [
//     {
//       name: 'Slow Query',
//       data: [],
//       color: '#FFBDBD'
//     }
//   ]
// }

// Host Server의 CPU 사용량
var HostCpuUsageOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'CPU Usage'
  },
  subtitle: {
      text: null
  },
  xAxis: {
      allowDecimals: false,
      accessibility: {
          rangeDescription: null
      },
      categories: []
  },
  yAxis: 
  {
    title: {
        text: '(core)'
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
    },
  ]
}

// Host Server의 Memory 사용량
var HostMemoryOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Memory Usage'
  },
  subtitle: {
      text: null
  },
  xAxis: {
      allowDecimals: false,
      accessibility: {
          rangeDescription: null
      },
      categories: []
  },
  yAxis: 
  {
    title: {
        text: '(KB)'
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
      name: 'Memory',
      data: [],
      color: {
        linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
        },
        stops: [
          [0, '#F79646'],
          [1, '#FDDFC7']
        ]
      }
    },
  ]
}

// Host Server의 Network 사용량
var HostNetworkOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Network Usage'
  },
  subtitle: {
      text: null
  },
  xAxis: {
      allowDecimals: false,
      accessibility: {
          rangeDescription: null
      },
      categories: []
  },
  yAxis: 
  {
    title: {
        text: '(byte)'
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
      name: 'Network',
      data: [],
      color: {
        linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
        },
        stops: [
            [0, '#FFEE11'],
            [1, '#FFF78B']
        ]
      }
    },
  ]
}

// Host Server Power 사용량
var HostPowerOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Power Usage'
  },
  subtitle: {
      text: null
  },
  xAxis: {
      allowDecimals: false,
      accessibility: {
          rangeDescription: null
      },
      categories: []
  },
  yAxis: 
  {
    title: {
        text: '(W/s)'
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
      name: 'Power',
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
    },
  ]
}

// Host Server Disk IO 사용량
var hostDiskIOOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Disk Usage'
  },
  subtitle: {
      text: null
  },
  xAxis: {
      allowDecimals: false,
      accessibility: {
          rangeDescription: null
      },
      categories: []
  },
  yAxis: 
  {
    title: {
        text: '(KB)'
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
      name: 'Disk I/O',
      data: [],
      color: {
        linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
        },
        stops: [
          [0, '#FF8B96'],
          [1, '#FFC5CB']
        ]
      }
    },
  ]
}