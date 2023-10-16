//Database info
var i;

//Database Monitoring
var DB_timestamp_total = ['16:58:00', '16:58:30', '16:59:00', '16:58:30', '17:00:00', '17:00:30', '17:01:00', '17:01:30', '17:02:00', '17:02:30', '17:03:00', '17:03:30', '17:04:00', '17:04:30', '17:05:00', '17:05:30', '17:06:00', '17:06:30', '17:07:00', '17:07:30', '17:08:00']
var select_count_total = [20, 19, 8, 18, 12, 12, 13, 5, 22, 16, 12, 16, 11, 25, 16, 17, 16, 20, 26, 15]
var insert_count_total = [1, 1, 0, 0, 1, 0, 0, 1, 1, 3, 3, 0, 0, 0, 3, 3, 0, 0, 0, 0]
var delete_count_total = [1, 1, 0, 0, 1, 0, 0, 1, 1, 3, 3, 0, 3, 3, 0, 0, 0, 0, 0, 0]
var update_count_total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 3, 1, 0]

//Host Monitoring
var Host_timestamp_total = ['16:58:00', '16:58:10', '16:58:20', '16:58:30', '16:58:40', '16:58:50', '16:59:00', '16:59:10', '16:59:20', '16:59:30', '16:59:40', '16:59:50', '17:00:00', '17:00:10', '17:00:20', '17:00:30', '17:00:40', '17:00:50', '17:01:00', '17:01:20', '17:01:30']

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
document.addEventListener('DOMContentLoaded', function() {
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
      title: {
        text: null
      },
      categories: Host_timestamp_total
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
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        fillColor: 'rgba(135,206,250,0.7)', 
        lineWidth: 0
      }, 
      {
        name: "Monitoring Container CPU Usage",
        data: [80, 90, 80, 80, 40, 70, 80, 100, 120, 80, 80, 80, 40, 90, 90, 80, 90, 100, 70, 70],
        fillColor: "rgba(70, 130, 180, 0.7)", 
        lineWidth: 0
      }, 
      {
        name: "Offloading Container CPU Usage",
        data: [80, 90, 80, 80, 40, 70, 80, 100, 120, 80, 80, 80, 40, 90, 90, 80, 90, 100, 70, 70],
        fillColor:  "rgba(100, 149, 237, 0.7)", 
        lineWidth: 0
      }, 
      {
        name: "Merging Container CPU Usage",
        data: [500, 400, 450, 430, 430, 1000, 1200, 800, 700, 550, 500, 500, 435, 700, 800, 920, 700, 500, 520, 450],
        fillColor: "rgba(173, 216, 230, 0.7)", 
        lineWidth: 0
      }]
});

})