var cpuChartOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Host CPU Usage'
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
  yAxis: {
    title: {
        text: 'Millicore'
    },
    labels : {
      format: '{value:,.0f}',
    }
  },
  tooltip: {
    shared: true,
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
      name: "Host CPU",
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
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
      },
      lineWidth: 1
    }
  ]
}

var powerChartOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Host Power Usage'
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
  yAxis: {
    title: {
        text: 'Watt/s'
    },
    labels : {
      format: '{value:,.0f}',
    }
  },
  tooltip: {
    shared: true,
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
      name: 'Host Power',
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
      lineWidth: 1
    },
  ]
}

var memoryChartOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Host Memory Usage'
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
  yAxis: {
    title: {
        text: 'MB'
    },
    labels : {
      format: '{value:,.0f}',
    }
  },
  tooltip: {
    shared: true,
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
      name: "Host Memory",
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
      lineWidth: 1
    }
  ]
}

var networkChartOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Host Network Usage'
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
  yAxis: {
    title: {
        text: 'MB'
    },
    labels : {
      format: '{value:,.0f}',
    }
  },
  tooltip: {
    shared: true,
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
      name: "Host RX Net",
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
      lineWidth: 1
    }, 
    {
      name: "Host TX Net",
      data: [],
      fillColor: "rgba(100, 149, 237, 0.7)", 
      lineWidth: 1
    }
  ]
}

var diskChartOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'Host Disk Usage'
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
  yAxis: {
    title: {
        text: 'MB'
    },
    labels : {
      format: '{value:,.0f}',
    }
  },
  tooltip: {
    shared: true,
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
      name: "Host Disk",
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
      lineWidth: 1
    }
  ]
}