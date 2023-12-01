let intervalID = 1;

var queryChart, ConnectedClientChart, DBRWRateChart, DBCacheUsageChart, SlowQueryChart
var HostCPUChart, HostMemoryChart, HostNetworkChart, HostPowerChart, hostDiskIOChart

document.addEventListener("DOMContentLoaded", function(){
  // DataBase Monitoring 차트 정의
  queryChart = Highcharts.chart(document.getElementById("mainDBMonitoring"), queryChartOption);
  ConnectedClientChart = Highcharts.chart(document.getElementById("ConnectedClientChart"), ConnectedClientOption);
  DBRWRateChart = Highcharts.chart(document.getElementById("DBRWRateChart"), DBRWRateOption);
  DBCacheUsageChart = Highcharts.chart(document.getElementById("DBCacheUsageChart"), DBCacheUsageOption);
  SlowQueryChart = Highcharts.chart(document.getElementById("SlowQueryChart"), SlowQueryOption);

  // Host Metric Monitoring 차트 정의
  HostCPUChart = Highcharts.chart(document.getElementById("HostCpuUsageChart"), HostCpuUsageOption);
  HostMemoryChart = Highcharts.chart(document.getElementById("HostMemoryChart"), HostMemoryOption);
  HostNetworkChart = Highcharts.chart(document.getElementById("HostNetworkUsageChart"), HostNetworkOption);
  HostPowerChart = Highcharts.chart(document.getElementById("HostPowerChart"), HostPowerOption);
  hostDiskIOChart = Highcharts.chart(document.getElementById("HostDiskIOChart"), hostDiskIOOption);

  getDDLData();
  getConnectedClient();
  get_ReadWrite();
  get_CacheUsage();
  get_SlowQuery();

  get_Hostcpu();
  get_HostMemory();
  get_HostNetwork();
  get_HostPower();
  get_DiskUsage();

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

  fetch('/monitoring_ssd/get_queryChart')
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

  fetch('/monitoring_ssd/get_ConnectedClient')
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
  var disk_read = [];
  var disk_write = [];

  fetch('/monitoring_ssd/get_ReadWrite')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        disk_read.push(item.disk_read);
        disk_write.push(item.disk_write);
      })
      DBRWRateChart.series[0].setData(disk_read);
      DBRWRateChart.series[1].setData(disk_write);
      DBRWRateChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

// Cache Usage 비율
function get_CacheUsage(){
  var timestamps = [];
  var cache_usg = [];

  fetch('/monitoring_ssd/get_CacheUsage')
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
function get_SlowQuery(){
  var timestamps = [];
  var slowQuery = [];

  fetch('/monitoring_ssd/get_SlowQuery')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        slowQuery.push(item.slow_query);
      })
      SlowQueryChart.series[0].setData(slowQuery);
      SlowQueryChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

// CSD 그래프 색상
const colors = ['#FFFF7D', '#FFF478', '#FFE773', '#FFD56B', '#FFBF61', '#FFA355', '#FF8548', '#FF6038'];

// Host / CSD 각 CPU 사용량
function get_Hostcpu() {
  let timestamps = [];
  let host_cpu_usg = [];

  fetch('/monitoring_ssd/get_HostCSDcpu')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        timestamps.push(item.timestamp);
        host_cpu_usg.push(item.storage_cpu_usage);
      });
      HostCPUChart.series[0].setData(host_cpu_usg);
      HostCPUChart.xAxis[0].setCategories(timestamps);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Host / CSD 각 Memory 사용량
function get_HostMemory() {
  let timestamps = [];
  let host_mem_usg = [];

  fetch('/monitoring_ssd/get_HostCSDMemory')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        timestamps.push(item.timestamp);
        host_mem_usg.push(item.storage_memory_usage);
      });
      HostMemoryChart.series[0].setData(host_mem_usg);
      HostMemoryChart.xAxis[0].setCategories(timestamps);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Host / CSD 각 Network 사용량
function get_HostNetwork() {
  let timestamps = [];
  let host_net_usg = [];

  fetch('/monitoring_ssd/get_HostCSDNetwork')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        timestamps.push(item.timestamp);
        host_net_usg.push(item.storage_network_usage);
      });
      HostNetworkChart.series[0].setData(host_net_usg);
      HostNetworkChart.xAxis[0].setCategories(timestamps);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Host / CSD 각 Power 사용량
function get_HostPower() {
  let timestamps = [];
  let host_power_usg = [];

  fetch('/monitoring_ssd/get_HostCSDPower')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        timestamps.push(item.timestamp);
        host_power_usg.push(item.storage_power_usage);
      });
      HostPowerChart.series[0].setData(host_power_usg);
      HostPowerChart.xAxis[0].setCategories(timestamps);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function get_DiskUsage() {
  let timestamps = [];
  let host_diskIO_usg = [];

  fetch('/monitoring_ssd/get_DiskUsage')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        timestamps.push(item.timestamp);
        host_diskIO_usg.push(item.disk_usage);
      });
      hostDiskIOChart.series[0].setData(host_diskIO_usg);
      hostDiskIOChart.xAxis[0].setCategories(timestamps);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
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
    
    get_Hostcpu();
    get_HostMemory();
    get_HostNetwork();
    get_HostPower();
    get_DiskUsage();
  },5000);
}