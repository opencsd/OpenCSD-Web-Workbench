let intervalID = 1;

var queryChart, ConnectedClientChart, DBRWRateChart, DBCacheHitRateChart, DBCacheUsageChart, DBCSDScanFilterChart
var hostServerCPUChart, HostCSDCPUChart, HostCSDMemoryChart, HostCSDNetworkChart, HostCSDPowerChart, CSDCapacityChart, SelectedCSDcpuChart, SelectedCSDmemoryChart, SelectedCSDnetworkChart, SelectedCSDpowerChart

document.addEventListener("DOMContentLoaded", function(){
  // DataBase Monitoring 차트 정의
  queryChart = Highcharts.chart(document.getElementById("mainDBMonitoring"), queryChartOption);
  ConnectedClientChart = Highcharts.chart(document.getElementById("ConnectedClientChart"), ConnectedClientOption);
  DBRWRateChart = Highcharts.chart(document.getElementById("DBRWRateChart"), DBRWRateOption);
  DBCacheHitRateChart = Highcharts.chart(document.getElementById("DBCacheHitRateChart"), DBCacheHitRateOption);
  DBCacheUsageChart = Highcharts.chart(document.getElementById("DBCacheUsageChart"), DBCacheUsageOption);
  DBCSDScanFilterChart = Highcharts.chart(document.getElementById("DBCSDScanFilterChart"), DBCSDScanFilterOption);

  // Host Metric Monitoring 차트 정의
  hostServerCPUChart = Highcharts.chart(document.getElementById("mainHostMonitoring"), hostServerCPUChartOption);
  HostCSDCPUChart = Highcharts.chart(document.getElementById("HostCSDCpuUsageChart"), HostCSDCpuUsageOption);
  HostCSDMemoryChart = Highcharts.chart(document.getElementById("HostCSDMemoryChart"), HostCSDMemoryOption);
  HostCSDNetworkChart = Highcharts.chart(document.getElementById("HostCSDNetworkUsageChart"), HostCSDNetworkOption);
  HostCSDPowerChart = Highcharts.chart(document.getElementById("HostCSDPowerChart"), HostCSDPowerOption);
  CSDCapacityChart = Highcharts.chart(document.getElementById("CSDCapacityChart"), CSDCapacityOption);
  SelectedCSDcpuChart = Highcharts.chart(document.getElementById("SelectedCSDcpuChart"), SelectedCSDcpuOption);
  SelectedCSDmemoryChart = Highcharts.chart(document.getElementById("SelectedCSDmemoryChart"), SelectedCSDmemoryOption);
  SelectedCSDnetworkChart = Highcharts.chart(document.getElementById("SelectedCSDnetworkChart"), SelectedCSDnetworkOption);
  SelectedCSDpowerChart = Highcharts.chart(document.getElementById("SelectedCSDpowerChart"), SelectedCSDpowerOption);

  getDDLData();
  getConnectedClient();
  get_ReadWrite();
  get_CacheHit();
  get_CacheUsage();
  get_ScanFilter();

  get_hostServerCPU();
  get_HostCSDcpu();
  get_HostCSDMemory();
  get_HostCSDNetwork();
  get_HostCSDPower();
  get_CSDCapacity();

  // 5초에 한번씩 그래프 갱신
  // startInterval();
})

// DDL 데이터
function getDDLData(){
  var timestamps = [];
  var selectCounts = [];
  var insertCounts = [];
  var deleteCounts = [];
  var updateCounts = [];

  fetch('/monitoring/get_queryChart')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
          timestamps.push(item.timestamp);
          selectCounts.push(item.select_count);
          insertCounts.push(item.insert_count);
          deleteCounts.push(item.delete_count);
          updateCounts.push(item.update_count);
      })
    queryChart.series[0].setData(selectCounts);
    queryChart.series[1].setData(insertCounts);
    queryChart.series[2].setData(updateCounts);
    queryChart.series[3].setData(deleteCounts);
    queryChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

// 연결된 클라이언트 수
function getConnectedClient(){
  var timestamps = [];
  var clients = [];

  fetch('/monitoring/get_ConnectedClient')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        clients.push(item.client);
      })
    ConnectedClientChart.series[0].setData(clients);
    ConnectedClientChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

// Disk R/W Byte
function get_ReadWrite(){
  var timestamps = [];
  var rw_bytes = [];

  fetch('/monitoring/get_ReadWrite')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        rw_bytes.push(item.rw_byte);
      })
      DBRWRateChart.series[0].setData(rw_bytes);
      DBRWRateChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

// Cache Hit 비율
function get_CacheHit(){
  var timestamps = [];
  var cache_hits = [];

  fetch('/monitoring/get_CacheHit')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        cache_hits.push(item.cache_hit_rate);
      })
      DBCacheHitRateChart.series[0].setData(cache_hits);
      DBCacheHitRateChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

// Cache Usage 비율
function get_CacheUsage(){
  var timestamps = [];
  var cache_usg = [];

  fetch('/monitoring/get_CacheUsage')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        cache_usg.push(item.cache_hit_rate);
      })
      DBCacheUsageChart.series[0].setData(cache_usg);
      DBCacheUsageChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

// DB Scan Filter 로우 수, 비율
function get_ScanFilter(){
  var timestamps = [];
  var scan_rows = [];
  var filter_rows = [];
  var filter_ratio = [];

  fetch('/monitoring/get_ScanFilter')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        scan_rows.push(item.scan);
        filter_rows.push(item.filter);

        var ratio = (item.filter / item.scan) * 100;
        filter_ratio.push(ratio);
      })
      DBCSDScanFilterChart.series[0].setData(scan_rows);
      DBCSDScanFilterChart.series[1].setData(filter_rows);
      DBCSDScanFilterChart.series[2].setData(filter_ratio);
      DBCSDScanFilterChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

function get_hostServerCPU(){
  timestamps = [];
  hostServerInterfaceCPUChartData = [];
  hostServerMonitoringCPUChartData = [];
  hostServerOffloadingCPUChartData = [];
  hostServerMergingCPUChartData = [];

  fetch('/monitoring/get_hostServerCPU')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        hostServerInterfaceCPUChartData.push(item.interface);
        hostServerMonitoringCPUChartData.push(item.monitoring);
        hostServerOffloadingCPUChartData.push(item.offloading);
        hostServerMergingCPUChartData.push(item.merging);
      })
      hostServerCPUChart.series[0].setData(hostServerInterfaceCPUChartData);
      hostServerCPUChart.series[1].setData(hostServerMonitoringCPUChartData);
      hostServerCPUChart.series[2].setData(hostServerOffloadingCPUChartData);
      hostServerCPUChart.series[3].setData(hostServerMergingCPUChartData);
      hostServerCPUChart.xAxis[0].setCategories(timestamps);
    })
    .catch(error => console.error('Error: ', error)); 
}

// CSD 그래프 색상
const colors = ['#FFFF7D', '#FFF478', '#FFE773', '#FFD56B', '#FFBF61', '#FFA355', '#FF8548', '#FF6038'];

// Host / CSD 각 CPU 사용량
function get_HostCSDcpu() {
  let timestamps = [];
  let host_cpu_usg = [];

  fetch('/monitoring/get_HostCSDcpu')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        timestamps.push(item.timestamp);
        host_cpu_usg.push(item.storage_cpu_usage);
      });
      HostCSDCPUChart.series[0].setData(host_cpu_usg);
      HostCSDCPUChart.xAxis[0].setCategories(timestamps);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Host / CSD 각 Memory 사용량
function get_HostCSDMemory() {
  let timestamps = [];
  let host_mem_usg = [];

  fetch('/monitoring/get_HostCSDMemory')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        timestamps.push(item.timestamp);
        host_mem_usg.push(item.storage_memory_usage);
      });
      HostCSDMemoryChart.series[0].setData(host_mem_usg);
      HostCSDMemoryChart.xAxis[0].setCategories(timestamps);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Host / CSD 각 Network 사용량
function get_HostCSDNetwork() {
  let timestamps = [];
  let host_net_usg = [];

  fetch('/monitoring/get_HostCSDNetwork')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        timestamps.push(item.timestamp);
        host_net_usg.push(item.storage_network_usage);
      });
      HostCSDNetworkChart.series[0].setData(host_net_usg);
      HostCSDNetworkChart.xAxis[0].setCategories(timestamps);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Host / CSD 각 Power 사용량
function get_HostCSDPower() {
  let timestamps = [];
  let host_power_usg = [];

  fetch('/monitoring/get_HostCSDPower')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        timestamps.push(item.timestamp);
        host_power_usg.push(item.storage_power_usage);
      });
      HostCSDPowerChart.series[0].setData(host_power_usg);
      HostCSDPowerChart.xAxis[0].setCategories(timestamps);
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
            format: '<span style="font-size:18px"><b>{point.y:.1f}</b><span style="font-size:12px"><br> GB</br>', // one decimal
            y: 36, // 10 pixels down from the top
        }
        };
      });
      CSDCapacityChart.addSeries({
        // name: 'CSD Capacity',
        data: csdSeries
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// CSD 저장 용량 클릭 이벤트 함수
function handleBarClick(event) {
  const clickedSeriesName = event.point.name;
  const seletesCSD = clickedSeriesName.toLowerCase();
  console.log('Clicked series name:', seletesCSD);

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
      SelectedCSDcpuChart.xAxis[0].setCategories(timestamps);
      SelectedCSDmemoryChart.xAxis[0].setCategories(timestamps);
      SelectedCSDnetworkChart.xAxis[0].setCategories(timestamps);
      SelectedCSDpowerChart.xAxis[0].setCategories(timestamps);

      SelectedCSDcpuChart.series[0].setData(cpu_usages);
      SelectedCSDmemoryChart.series[0].setData(memory_usages);
      SelectedCSDnetworkChart.series[0].setData(network_usages);
      SelectedCSDpowerChart.series[0].setData(power_usages);
    })
    .catch(error => {
      console.error('Error fetching additional metrics:', error);
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
        text: '(GB)'
    }
},
legend: {
    enabled: false
},
tooltip: {
    pointFormat: 'Using Capacity: <b>{point.y:.1f} (GB)</b>'
},
plotOptions: {
  series: {
    point: {
      events: {
        click: handleBarClick,
      }
    }
  }
},
series: []
}

function startInterval(){
  //메트릭 업데이트 주기 설정
  intervalId = setInterval(function() {
    getDDLData();
    getConnectedClient();
    get_ReadWrite();
    get_CacheHit();
    get_CacheUsage();
    get_ScanFilter();
  
    get_hostServerCPU();
    get_HostCSDcpu();
    get_HostCSDMemory();
    get_HostCSDNetwork();
    get_HostCSDPower();
    get_CSDCapacity();
  },5000);
}