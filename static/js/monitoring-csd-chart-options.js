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
      lineWidth: 1,
    }, 
    {
      name: "Instance CPU",
      data: [],
      fillColor: "rgba(100, 149, 237, 0.7)", 
      lineWidth: 1
    }, 
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
    }, 
    {
      name: "Instance Memory",
      data: [],
      fillColor: "rgba(100, 149, 237, 0.7)", 
      lineWidth: 1
    }, 
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
    }, 
    {
      name: "Instance RX Net",
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
      lineWidth: 1
    }, 
    {
      name: "Instance TX Net",
      data: [],
      fillColor: "rgba(100, 149, 237, 0.7)", 
      lineWidth: 1
    }, 
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
    }, 
    {
      name: "Instance Disk",
      data: [],
      fillColor: "rgba(100, 149, 237, 0.7)", 
      lineWidth: 1
    }, 
  ]
}

const csdMetricArea = document.getElementById("csdMetricArea");
const selectedCSDIDArea = document.getElementById("selectedCSDID");

function handleCSDBarClick(event) {
  let category = event.point.name;
  let selected_id = category.slice(3);
  selected_id = category.slice(3);

  if(selected_id == selectedCSDID){
    selectedCSDID = -1;
    clearInterval(csdIntervalID);
    csdMetricArea.style.display = "none";
  }else{
    if(selectedCSDID != -1){
      clearInterval(csdIntervalID);
    }
    selectedCSDID = selected_id;
    getLatestCSDMetricChartData();
    csdIntervalID = setInterval(getLatestCSDMetricChartData, fiveSeconds);
    selectedCSDIDArea.innerHTML = "Selected CSD ID : " + selectedCSDID;
    csdMetricArea.style.display = "block";
  }
}

var csdCpuChartOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'CSD CPU Usage'
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
      name: "",
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
      lineWidth: 1
    }
  ]
}

var csdMemoryChartOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'CSD Memory Usage'
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
      name: "",
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
      lineWidth: 1
    }
  ]
}

var csdNetworkChartOption = {
  chart: {
    type: 'area'
  },
  title: {
      text: 'CSD Network Usage'
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
      name: "",
      data: [],
      fillColor: 'rgba(135,206,250,0.7)', 
      lineWidth: 1
    }, 
    {
      name: "",
      data: [],
      fillColor: "rgba(100, 149, 237, 0.7)", 
      lineWidth: 1
    }, 
  ]
}

var csdCapacityChartOption = {
  chart: {
      type: 'column'
  },
  title: {
    text: 'CSD Disk Capacity'
  },
  plotOptions: {
      series: {
        // allowPointSelect: true,
        grouping: false,
        // borderWidth: 1,
        point: {
          events: {
            click: handleCSDBarClick,
          }
        },
        // states: {
        //   select: {
        //       color: null,
        //       borderWidth:5,
        //       borderColor:'Blue'
        //   }
        // },
      },      
  },
  legend: {
      enabled: false
  },
  tooltip: {
      shared: true,
      headerFormat: '<span style="font-size: 13px">' +
          '{point.x}' +
          '</span><br/>',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
          '{series.name}: <b>{point.y:.1f} GB</b><br/>'
  },
  xAxis: {
      type: 'category',
      accessibility: {
          description: 'CSD ID'
      },
      labels: {
          useHTML: true,
          animate: true,
          style: {
              textAlign: 'center'
          },
          format: '<span style="font-size:13px"><b>{value}</b>'
      }
  },
  yAxis: [{
      title: {
          text: 'GB'
      },
      showFirstLabel: false
  }],
  series: [{
      color: 'rgba(158, 159, 163, 0.5)',
      pointWidth: 80,
      pointPlacement: 0,
      dataLabels: [{
        enabled: true,
        // inside: true,
        style: {
            fontSize: '16px'
        },
        color: '#FFFFFF',
        format: '<span style="font-size:18px"><b>{point.y:.1f}</b><span style="font-size:12px"><br> GB</br>'
    }],
    linkedTo: 'usage',
    data: [],
    name: 'Disk Total',
    lineWidth: 1
  }, 
  {
      name: 'Disk Usage',
      id: 'usage',
      pointWidth: 80,
      color: 'rgba(135,206,250,0.7)',
      dataLabels: [{
          enabled: true,
          inside: true,
          style: {
              fontSize: '16px'
          },
          color: '#FFFFFF',
          format: '<span style="font-size:18px"><b>{point.y:.1f}</b><span style="font-size:12px"><br> GB</br>'
      }],
      data: [],
      lineWidth: 1
  }],
  exporting: {
      allowHTML: true
  }
}

