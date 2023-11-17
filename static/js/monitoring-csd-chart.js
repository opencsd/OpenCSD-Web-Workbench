let intervalID = 1;

var queryChart, queryChartCategories, queryChartSelectData, queryChartInsertData, queryChartUpdateData, queryCharDeletetData
var hostServerCPUChart, hostServerCPUChartCategories, hostServerInterfaceCPUChartData, hostServerMonitoringCPUChartData, hostServerOffloadingCPUChartData, hostServerMergingCPUChartData;

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

  // DataBase Monitoring 렌더링
  queryChart.render();
  ConnectedClientChart.render();
  DBRWRateChart.render();
  DBCacheHitRateChart.render();
  DBCacheUsageChart.render();
  DBCSDScanFilterChart.render();

  // Host Metric Monitoring 렌더링
  hostServerCPUChart.render();
  HostCSDCPUChart.render();
  HostCSDMemoryChart.render();
  HostCSDNetworkChart.render();
  HostCSDPowerChart.render();
  CSDCapacityChart.render();

  getDDLData();
  getConnectedClient();
  get_ReadWrite();
  get_CacheHit();
  get_CacheUsage();
  get_ScanFilter();

  get_hostServerCPU();
  // startInterval();
})

// DDL 데이터
function getDDLData(){
  var timestamps = [];
  var selectCounts = [];
  var insertCounts = [];
  var deleteCounts = [];
  var updateCounts = [];

  fetch('/get_queryChart')
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

  fetch('/get_ConnectedClient')
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

  fetch('/get_ReadWrite')
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

  fetch('/get_CacheHit')
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

  fetch('/get_CacheUsage')
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

  fetch('/get_ScanFilter')
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

  fetch('/get_hostServerCPU')
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

function get_HostCSDcpu(){
  timestamps = [];
  hostData = [];
  csd1 = [];
  csd2 = [];
  csd3 = [];
  csd4 = [];
  csd5 = [];
  csd6 = [];
  csd7 = [];
  csd8 = [];

  fetch('/get_HostCSDcpu')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(item) {
        timestamps.push(item.timestamp);
        hostData.push(item.storage_cpu_usage);
        
      })
    })
}

function startInterval(){
  //메트릭 업데이트 주기 설정
  intervalId = setInterval(function() {
    getDDLData();
    updateLatestChart();
  },5000);
}