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
