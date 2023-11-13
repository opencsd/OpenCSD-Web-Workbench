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
    title : {
      text : null
    },
    categories: []
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
      data: [],
      // fillColor: 'rgba(244, 223, 182,0.5)',
      // fillColor: '#87CEFA',
      fillColor: 'rgba(135,206,250,0.7)',
      lineWidth: 0
    }
  ],
}
