let intervalID = 1;

// var queryChart, ConnectedClientChart, DBRWRateChart, DBCacheHitRateChart, DBCacheUsageChart, DBCSDScanFilterChart
var CSDCapacityChart, SelectedCSDcpuChart, SelectedCSDmemoryChart, SelectedCSDnetworkChart, SelectedCSDpowerChart
var HostCpuChart, HostMemoryChart, HostDiskChart, HostPowerChart

// HostPowerChart= Highcharts.chart(document.getElementById("HostPowerChart"), HostCSDPowerOption);

// var CSD1 = [];
// var CSD2 = [];
// var CSD3 = [];
// var CSD4 = [];
// var CSD5 = [];
// var CSD6 = [];
// var CSD7 = [];
// var CSD8 = [];


document.addEventListener("DOMContentLoaded", function(){
  viewUserID();

  // Host Metric Monitoring 차트 정의
  // hostServerCPUChart = Highcharts.chart(document.getElementById("mainHostMonitoring"), hostServerCPUChartOption);
  // HostCSDCPUChart = Highcharts.chart(document.getElementById("HostCSDCpuUsageChart"), HostCSDCpuUsageOption);
  // HostCSDMemoryChart = Highcharts.chart(document.getElementById("HostCSDMemoryChart"), HostCSDMemoryOption);
  // HostCSDNetworkChart = Highcharts.chart(document.getElementById("HostCSDNetworkUsageChart"), HostCSDNetworkOption);
  // HostCSDPowerChart = Highcharts.chart(document.getElementById("HostCSDPowerChart"), HostCSDPowerOption);
  
  HostCpuChart = Highcharts.chart(document.getElementById("HostCpuChart"), HostCSDCpuUsageOption);
  HostMemoryChart = Highcharts.chart(document.getElementById("HostMemoryChart"), HostCSDMemoryOption);
  HostDiskChart = Highcharts.chart(document.getElementById("HostDiskChart"), HostCSDDiskOption);
  // HostNetworkChart = Highcharts.chart(document.getElementById("HostNetworkChart"), HostCSDNetworkOption);
  HostPowerChart= Highcharts.chart(document.getElementById("HostPowerChart"), HostCSDPowerOption);
   
  CSDCapacityChart = Highcharts.chart(document.getElementById("CSDCapacityChart"), CSDCapacityOption);
  SelectedCSDcpuChart = Highcharts.chart(document.getElementById("SelectedCSDcpuChart"), SelectedCSDcpuOption);
  SelectedCSDmemoryChart = Highcharts.chart(document.getElementById("SelectedCSDmemoryChart"), SelectedCSDmemoryOption);
  SelectedCSDnetworkChart = Highcharts.chart(document.getElementById("SelectedCSDnetworkChart"), SelectedCSDnetworkOption);
  SelectedCSDpowerChart = Highcharts.chart(document.getElementById("SelectedCSDpowerChart"), SelectedCSDpowerOption);

  // CSD1cpuChart = Highcharts.chart(document.getElementById("SelectedCSDcpuChart"), SelectedCSDcpuOption);
  // CSD1memoryChart = Highcharts.chart(document.getElementById("SelectedCSDmemoryChart"), SelectedCSDmemoryOption);
  // CSD1networkChart = Highcharts.chart(document.getElementById("SelectedCSDnetworkChart"), SelectedCSDnetworkOption);
  // CSD1powerChart = Highcharts.chart(document.getElementById("SelectedCSDpowerChart"), SelectedCSDpowerOption);

  // CSD2cpuChart = Highcharts.chart(document.getElementById("SelectedCSDcpuChart"), SelectedCSDcpuOption);
  // CSD2memoryChart = Highcharts.chart(document.getElementById("SelectedCSDmemoryChart"), SelectedCSDmemoryOption);
  // CSD2networkChart = Highcharts.chart(document.getElementById("SelectedCSDnetworkChart"), SelectedCSDnetworkOption);
  // CSD2powerChart = Highcharts.chart(document.getElementById("SelectedCSDpowerChart"), SelectedCSDpowerOption);

  // CSD3cpuChart = Highcharts.chart(document.getElementById("SelectedCSDcpuChart"), SelectedCSDcpuOption);
  // CSD3memoryChart = Highcharts.chart(document.getElementById("SelectedCSDmemoryChart"), SelectedCSDmemoryOption);
  // CSD3networkChart = Highcharts.chart(document.getElementById("SelectedCSDnetworkChart"), SelectedCSDnetworkOption);
  // CSD3powerChart = Highcharts.chart(document.getElementById("SelectedCSDpowerChart"), SelectedCSDpowerOption);

  // CSD4cpuChart = Highcharts.chart(document.getElementById("SelectedCSDcpuChart"), SelectedCSDcpuOption);
  // CSD4memoryChart = Highcharts.chart(document.getElementById("SelectedCSDmemoryChart"), SelectedCSDmemoryOption);
  // CSD4networkChart = Highcharts.chart(document.getElementById("SelectedCSDnetworkChart"), SelectedCSDnetworkOption);
  // CSD4powerChart = Highcharts.chart(document.getElementById("SelectedCSDpowerChart"), SelectedCSDpowerOption);
  
  // CSD5cpuChart = Highcharts.chart(document.getElementById("SelectedCSDcpuChart"), SelectedCSDcpuOption);
  // CSD5memoryChart = Highcharts.chart(document.getElementById("SelectedCSDmemoryChart"), SelectedCSDmemoryOption);
  // CSD5networkChart = Highcharts.chart(document.getElementById("SelectedCSDnetworkChart"), SelectedCSDnetworkOption);
  // CSD5powerChart = Highcharts.chart(document.getElementById("SelectedCSDpowerChart"), SelectedCSDpowerOption);

  // get_CSDMetric();
  get_TotalHostMetric();
  // get_CSDCapacity();

  // 5초에 한번씩 그래프 갱신
  // startInterval();
  setTimeout(startInterval(), 5000); // 5초 기다린 후 metric 수집 시작
})

// CSD 그래프 색상
const colors = ['#FFFF7D', '#FFF478', '#FFE773', '#FFD56B', '#FFBF61', '#FFA355', '#FF8548', '#FF6038'];

// // csd 메트릭
// function get_CSDMetric() {
//   var select_cnt = [];
//   var insert_cnt = [];
//   var delete_cnt = [];
//   var update_cnt = [];
//   var scan_rows = [];
//   var filter_rows = [];
//   var scan_filter_ratio = [];

//   fetch('/monitoring/get_CSDMetric')
//   .then(response => response.json())
//   .then(data => {
//     // console.log(data);
//     select_cnt = data[0]['select_count'];
//     insert_cnt = data[0]['insert_count'];
//     delete_cnt = data[0]['delete_count'];
//     update_cnt = data[0]['update_count'];

//     client_cnt = data[1]['client'];

//     filter_rows = data[2]['filter'];
//     scan_rows = data[2]['scan'];
//     scan_filter_ratio = data[2]['scan_filter_ratio'];

//     time = data[0]['timestamp'];

//     // 배열 꽉 차면 맨 앞 데이터 하나 없애기
//     if (queryChart.series[0].data.length >= 12) {
//       queryChart.series[0].data[0].remove();
//     }
//     if (ConnectedClientChart.series[0].data.length >= 12) {
//       ConnectedClientChart.series[0].data[0].remove();
//     }
//     if (DBCSDScanFilterChart.series[0].data.length >= 12) {
//       DBCSDScanFilterChart.series[0].data[0].remove();
//     }

//     queryChart.series[0].addPoint(select_cnt, false);
//     queryChart.series[1].addPoint(insert_cnt, false);
//     queryChart.series[2].addPoint(delete_cnt, false);
//     queryChart.series[3].addPoint(update_cnt, false);
//     queryChart.xAxis[0].categories.push(time);

//     ConnectedClientChart.series[0].addPoint(client_cnt);
//     ConnectedClientChart.xAxis[0].categories.push(time);

//     DBCSDScanFilterChart.series[0].addPoint(scan_rows);
//     DBCSDScanFilterChart.series[1].addPoint(filter_rows);
//     DBCSDScanFilterChart.series[2].addPoint(scan_filter_ratio);
//     DBCSDScanFilterChart.xAxis[0].categories.push(time);

//     queryChart.redraw();
//     ConnectedClientChart.redraw();
//     DBCSDScanFilterChart.redraw();
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });
// }

function get_TotalHostMetric() {
  fetch('/monitoring/get_TotalHostMetric')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        time = data.timestamp;
        cpu_usg = data.cpu_usage;
        mem_usg = data.memory_usage;
        disk_usg = data.disk_usage;
        // network_usg = data.network_usage;
        power_usg = data.power_usage;
        
        HostCpuChart.series[0].setData(cpu_usg);
        HostCpuChart.xAxis[0].setCategories(time);

        HostMemoryChart.series[0].setData(mem_usg);
        HostMemoryChart.xAxis[0].setCategories(time);

        HostDiskChart.series[0].setData(disk_usg);
        HostDiskChart.xAxis[0].setCategories(time);

        // HostNetworkChart.series[0].setData(network_usg);
        // HostNetworkChart.xAxis[0].setCategories(time);

        HostPowerChart.series[0].setData(power_usg);
        HostPowerChart.xAxis[0].setCategories(time);
        
        // console.log(power)

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

// Host / CSD 각 CPU 사용량
function get_HostMetric() {
  fetch('/monitoring/get_HostMetric')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      time = data.timestamp;
      cpu_usg = data.cpu_usage;
      mem_usg = data.memory_usage;
      disk_usg = data.disk_usage;
      power_usg = data.power_usage;
      
      if (HostCpuChart.series[0].data.length >= 12) {
        HostCpuChart.series[0].data[0].remove();
      }
      if (HostMemoryChart.series[0].data.length >= 12) {
        HostMemoryChart.series[0].data[0].remove();
      }
      if (HostDiskChart.series[0].data.length >= 12) {
        HostDiskChart.series[0].data[0].remove();
      }
      // if (HostNetworkChart.series[0].data.length >= 12) {
      //   HostNetworkChart.series[0].data[0].remove();
      // }
      if (HostPowerChart.series[0].data.length >= 12) {
        HostPowerChart.series[0].data[0].remove();
      }

      // 데이터 추가
      HostCpuChart.series[0].addPoint(cpu_usg, false);
      HostCpuChart.xAxis[0].categories.push(time);

      HostMemoryChart.series[0].addPoint(mem_usg, false);
      HostMemoryChart.xAxis[0].categories.push(time);
      
      HostDiskChart.series[0].addPoint(disk_usg, false);
      HostDiskChart.xAxis[0].categories.push(time);

      HostPowerChart.series[0].addPoint(power_usg, false);
      HostPowerChart.xAxis[0].categories.push(time);

      HostCpuChart.redraw();
      HostMemoryChart.redraw();
      HostDiskChart.redraw();
      // HostNetworkChart.redraw();
      HostPowerChart.redraw();

      // cpu_usg = data[0]['storage_cpu_usage'];
      // mem_usg = data[1]['storage_memory_usage'];
      // disk_usg = data[2]['storage_disk_usage'];
      // net_usg = data[3]['storage_network_usage'];
      // power_usg = data[4]['storage_power_usage'];
      // time = data[0]['timestamp'];
      // data.cpu
      // 배열 꽉 차면 맨 앞 데이터 하나 없애기
      // if (HostCpuChart.series[0].data.length >= 12) {
      //   HostCpuChart.series[0].data[0].remove();
      // }
      // if (HostMemoryChart.series[0].data.length >= 12) {
      //   HostMemoryChart.series[0].data[0].remove();
      // }
      // if (HostDiskChart.series[0].data.length >= 12) {
      //   HostDiskChart.series[0].data[0].remove();
      // }
      // if (HostPowerChart.series[0].data.length >= 12) {
      //   HostPowerChart.series[0].data[0].remove();
      // }
      
      // // console.log(HostCpuChart);
      // // 데이터 추가
      // HostCpuChart.series[0].addPoint(cpu_usg, time);
      // HostCpuChart.xAxis[0].categories.push(time);

      // HostMemoryChart.series[0].addPoint(mem_usg, false);
      // HostMemoryChart.xAxis[0].categories.push(time);
      
      // HostDiskChart.series[0].addPoint(disk_usg, false);
      // HostDiskChart.xAxis[0].categories.push(time);

      // HostPowerChart.series[0].addPoint(power_usg, false);
      // HostPowerChart.xAxis[0].categories.push(time);
      
      // HostCpuChart.redraw();
      // HostMemoryChart.redraw();
      // HostDiskChart.redraw();
      // HostNetworkChart.redraw();
      // HostPowerChart.redraw();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

const cpu_capacity_color = ['#C167FF', '#BC9DFF', '#B6B5FF','#ADCAFF', '#A3DAFF', '#9BD2FF', '#85C8FF', '#61B8FF']

// CSD 각 저장 용량
function get_CSDCapacity() {
  fetch('/monitoring/get_CSDCapacity')
    .then(response => response.json())
    .then(data => {
      const csdSeries = Object.keys(data).map(function(key, index) {
        return {
          name: key.toUpperCase(),
          y: data[key].csd_storage_capacity,
          color: cpu_capacity_color[index % cpu_capacity_color.length],
          groupPadding: 0,
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            format: '<span style="font-size:18px"><b>{point.y:.1f}</b><span style="font-size:12px"><br> KB</br>', // one decimal
            y: 36, // 10 pixels down from the top
        }
        };
      });

      CSDCapacityChart = Highcharts.chart(document.getElementById("CSDCapacityChart"), CSDCapacityOption);
      CSDCapacityChart.addSeries({
        // name: 'CSD Capacity',
        data: csdSeries
      });

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

var clicked_csd;
var selectsCSD;
var selectsCategories = [];
var select_cnt = 0;
// var start = 0
// CSD 저장 용량 클릭 이벤트 함수
function handleBarClick(event) {
  const clickedSeriesName = event.point.name;
  const seletesCSD = clickedSeriesName.toLowerCase();
  console.log('Clicked series name:', seletesCSD);
  // console.log(typeof seletesCSD);
  // if (clicked_csd != seletesCSD){
  //   start = 1
  // }
  // select_cnt = 0;
  clicked_csd = seletesCSD;
  

  // isFunctionEnabled = true;
  let timestamps = [];
  let cpu_usages = [];
  let memory_usages = [];
  let network_usages = [];
  let power_usages = [];

  // 서버에 CSD 번호를 전송
  fetch('/monitoring/get_SelectedCSDMetric', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ seletesCSD }),
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        cpu_usages.push(item.cpu_usage);
        memory_usages.push(item.memory_usage);
        network_usages.push(item.network_usage);
        power_usages.push(item.power_usage);
      });

      SelectedCSDcpuChart.series[0].setData(cpu_usages);
      SelectedCSDmemoryChart.series[0].setData(memory_usages);
      SelectedCSDnetworkChart.series[0].setData(network_usages);
      SelectedCSDpowerChart.series[0].setData(power_usages);

      // SelectedCSDcpuChart.xAxis[0].categories.push(time);
      // SelectedCSDmemoryChart.xAxis[0].categories.push(time);
      // SelectedCSDnetworkChart.xAxis[0].categories.push(time);
      // SelectedCSDpowerChart.xAxis[0].categories.push(time);

      SelectedCSDcpuChart.xAxis[0].setCategories(timestamps);
      SelectedCSDmemoryChart.xAxis[0].setCategories(timestamps);
      SelectedCSDnetworkChart.xAxis[0].setCategories(timestamps);
      SelectedCSDpowerChart.xAxis[0].setCategories(timestamps);

      selectsCategories = timestamps;

      SelectedCSDcpuChart.redraw();
      SelectedCSDmemoryChart.redraw();
      SelectedCSDnetworkChart.redraw();
      SelectedCSDpowerChart.redraw();
    })
    .catch(error => {
      console.error('Error fetching additional metrics:', error);
    });
  
}

// 초기에 함수 비활성화
var isFunctionEnabled = false;

// CSD 선택하고 나서 주기적으로 수집 시작
function startGetSelectedCSD(data, cpuChart, memoryChart, networkChart, powerChart) {
  // console.log(data);
  // console.log(typeof data);

  // 초기 세팅
  if (select_cnt == 0){
      cpuChart.xAxis[0].setCategories(selectsCategories);
      memoryChart.xAxis[0].setCategories(selectsCategories);
      networkChart.xAxis[0].setCategories(selectsCategories);
      powerChart.xAxis[0].setCategories(selectsCategories);
      select_cnt = 1;
      console.log("select Test");
  }

  fetch('/monitoring/get_StartCollectSelectedCSDMetric', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      time = data['timestamp']; 
      cpu_usg = data['cpu_usage'];
      mem_usg = data['memory_usage'];
      network_usg = data['network_usage'];
      power_usg = data['power_usage'];
      
      // console.log(cpuChart);
      // yourObject가 존재하고, yourObject[0]도 존재하면 값을 가져오고, 그렇지 않으면 undefined 반환
      // const value = cpuChart.series?.[0];

      // 배열 꽉 차면 맨 앞 데이터 하나 없애기
      if (cpuChart.series) {
        if (cpuChart.series[0].data.length >= 12) {
          cpuChart.series[0].data[0].remove();
        }
        cpuChart.series[0].addPoint(cpu_usg, false);
        // cpuChart.xAxis[0].setCategories(time);
        cpuChart.xAxis[0].categories.push(time);
      }
      if (memoryChart.series) {
        if (memoryChart.series[0].data.length >= 12){
          memoryChart.series[0].data[0].remove();
        }
        memoryChart.series[0].addPoint(mem_usg, false);
        // memoryChart.xAxis[0].setCategories(time); 
        memoryChart.xAxis[0].categories.push(time);
      }
      if (networkChart.series) {
        if (networkChart.series[0].data.length >= 12){
          networkChart.series[0].data[0].remove();
        }
        networkChart.series[0].addPoint(network_usg, false);
        // networkChart.xAxis[0].setCategories(time);
        networkChart.xAxis[0].categories.push(time);
      }
      if (powerChart.series) {    
        if (powerChart.series[0].data.length >= 12){
          powerChart.series[0].data[0].remove();
        }
        powerChart.series[0].addPoint(power_usg, false);
        // powerChart.xAxis[0].setCategories(time);
        powerChart.xAxis[0].categories.push(time);
      }

      cpuChart.redraw();
      memoryChart.redraw();
      networkChart.redraw();
      powerChart.redraw();
      
      console.log("success");
    })
    .catch(error => {
      console.error('Error Collecting Selected CSD metrics:', error);
    });
}

// CSD 저장 용량
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
          text: '(KB)'
      }
  },
  legend: {
      enabled: false
  },
  tooltip: {
      pointFormat: 'Using Capacity: <b>{point.y:.1f} (KB)</b>'
  },

  plotOptions: {
    series: {
      point: {
        events: {
          click: handleBarClick,
        }
      }
    }, column: {
      stacking: 'normal',
      dataLabels: {
        enabled: false
      }
    }
  },
  series: []
}

// csd랑 node metric이랑 인터벌 간격 나눠야한다면? => 인터벌 별로 둘이 함수 나눠야 함
function startInterval(){
  intervalId = setInterval(function() {
    // get_CSDMetric();
    get_HostMetric();
    get_CSDCapacity();
    // get_totalCSDMetric();
    

    // 클릭 이벤트 활성화시에만 돌아가도록
    if (clicked_csd != selectsCSD){
      // select_cnt = 0;
      startGetSelectedCSD(clicked_csd ,SelectedCSDcpuChart, SelectedCSDmemoryChart, SelectedCSDnetworkChart, SelectedCSDpowerChart);
      console.log("test");
    }

  },5000);
}