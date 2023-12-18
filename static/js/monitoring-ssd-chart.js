let intervalID = 1;
// SlowQueryChart
var queryChart, ConnectedClientChart, DBRWRateChart, DBCacheUsageChart, DBCacheHitRatioChart
var HostCPUChart, HostMemoryChart, HostNetworkChart, HostPowerChart, hostDiskIOChart

HostCPUChart = Highcharts.chart(document.getElementById("HostCpuUsageChart"), HostCpuUsageOption);


document.addEventListener("DOMContentLoaded", function(){
  // DataBase Monitoring 차트 정의
  queryChart = Highcharts.chart(document.getElementById("mainDBMonitoring"), queryChartOption);
  ConnectedClientChart = Highcharts.chart(document.getElementById("ConnectedClientChart"), ConnectedClientOption);
  DBRWRateChart = Highcharts.chart(document.getElementById("DBRWRateChart"), DBRWRateOption);
  DBCacheUsageChart = Highcharts.chart(document.getElementById("DBCacheUsageChart"), DBCacheUsageOption);
  DBCacheHitRatioChart = Highcharts.chart(document.getElementById("DBCacheHitRatioChart"), DBCacheHitRatioOption);

  // Host Metric Monitoring 차트 정의
  
  HostMemoryChart = Highcharts.chart(document.getElementById("HostMemoryChart"), HostMemoryOption);
  HostNetworkChart = Highcharts.chart(document.getElementById("HostNetworkUsageChart"), HostNetworkOption);
  HostPowerChart = Highcharts.chart(document.getElementById("HostPowerChart"), HostPowerOption);
  HostDiskIOChart = Highcharts.chart(document.getElementById("HostDiskIOChart"), hostDiskIOOption);

  getDDLData();
  getConnectedClient();
  get_ReadWrite();
  get_CacheUsage();
  get_CacheHitRatio();
  get_HostMetric();

  // 5초에 한번씩 그래프 갱신
  startInterval();
})

// DDL 데이터
function getDDLData(){
  var timestamps;
  var selectCounts;
  var insertCounts;
  var deleteCounts;
  var updateCounts;

  fetch('/monitoring_ssd/get_queryChart')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (queryChart.series[0].data.length >= 12) {
        queryChart.series[0].data[0].remove();
      }
      if (queryChart.series[1].data.length >= 12) {
        queryChart.series[1].data[0].remove();
      }
      if (queryChart.series[2].data.length >= 12) {
        queryChart.series[2].data[0].remove();
      }
      if (queryChart.series[3].data.length >= 12) {
        queryChart.series[3].data[0].remove();
      }

      // data.forEach(function(item) {
      //     // timestamps.push(item.timestamp);
      //     // selectCounts.push(item.select_count);
      //     // insertCounts.push(item.insert_count);
      //     // deleteCounts.push(item.delete_count);
      //     // updateCounts.push(item.update_count);
      //   timestamp = item.timestamp;
      //   selectCounts = item.select_count;
      //   insertCounts = item.insert_count;
      //   deleteCounts = item.delete_count;
      //   updateCounts = item.update_count;
      // })
      // queryChart.series[0].setData(selectCounts);
      // queryChart.series[1].setData(insertCounts);
      // queryChart.series[2].setData(updateCounts);
      // queryChart.series[3].setData(deleteCounts);
      // queryChart.xAxis[0].setCategories(timestamp);
      // queryChart.series[0].addPoint(item.select_count, item.timestamp)
      // queryChart.series[1].addPoint(item.insert_count, item.timestamp)
      // queryChart.series[2].addPoint(item.delete_count, item.timestamp)
      // queryChart.series[3].addPoint(item.update_count, item.timestamp)

      // queryChart.xAxis[0].categories.push(timestamp);
      // queryChart.xAxis[1].categories.push(timestamp);
      // queryChart.xAxis[2].categories.push(timestamp);
      // queryChart.xAxis[3].categories.push(timestamp);
      // HostCPUChart.series[0].addPoint(cpu_usg, time);
    })
    .catch(error => console.error('Error: ', error));
}

// 연결된 클라이언트 수
function getConnectedClient(){
  var timestamps = [];
  var clients = [];

  if (ConnectedClientChart.series[0].data.length >= 12) {
    ConnectedClientChart.series[0].data[0].remove();
  }

  fetch('/monitoring_ssd/get_ConnectedClient')
    .then(response => response.json())
    .then(data => {

      console.log(data);

      // data.forEach(function(item) {
      //   timestamps.push(item.timestamp);
      //   clients.push(item.client);
      // })
    // ConnectedClientChart.series[0].setData(clients);
    // ConnectedClientChart.xAxis[0].setCategories(timestamps);
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

      console.log(data);
      // data.forEach(function(item) {
      //   timestamps.push(item.timestamp);
      //   disk_read.push(item.disk_read);
      //   disk_write.push(item.disk_write);
      // })
      // DBRWRateChart.series[0].setData(disk_read);
      // DBRWRateChart.series[1].setData(disk_write);
      // DBRWRateChart.xAxis[0].setCategories(timestamps);
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
      
      console.log(data);
      // data.forEach(function(item) {
      //   timestamps.push(item.timestamp);
      //   cache_usg.push(item.cache_hit_rate);
      // })
      // DBCacheUsageChart.series[0].setData(cache_usg);
      // DBCacheUsageChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

// Cache Hit 비율
function get_CacheHitRatio(){
  var timestamps = [];
  var cache_ratio = [];

  fetch('/monitoring_ssd/get_CacheHitRatio')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // data.forEach(function(item) {
      //   timestamps.push(item.timestamp);
      //   cache_ratio.push(item.cache_hit_ratio);
      // })
      // DBCacheHitRatioChart.series[0].setData(cache_ratio);
      // DBCacheHitRatioChart.xAxis[0].setCategories(timestamps);
  })
  .catch(error => console.error('Error: ', error));
}

// CSD 그래프 색상
const colors = ['#FFFF7D', '#FFF478', '#FFE773', '#FFD56B', '#FFBF61', '#FFA355', '#FF8548', '#FF6038'];

// Host / CSD 각 CPU 사용량
function get_HostMetric() {
  fetch('/monitoring_ssd/get_HostMetric')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      cpu_usg = data[0]['storage_cpu_usage'];
      mem_usg = data[1]['storage_memory_usage'];
      disk_usg = data[2]['disk_usage'];
      network_usg = data[3]['storage_network_usage'];
      power_usg = data[4]['storage_power_usage'];
      time = data[0]['timestamp'];
      
      // 배열 꽉 차면 맨 앞 데이터 하나 없애기
      if (HostCPUChart.series[0].data.length >= 12) {
        HostCPUChart.series[0].data[0].remove();
      }
      if (HostMemoryChart.series[0].data.length >= 12) {
        HostMemoryChart.series[0].data[0].remove();
      }
      if (HostDiskIOChart.series[0].data.length >= 12) {
        HostDiskIOChart.series[0].data[0].remove();
      }
      if (HostNetworkChart.series[0].data.length >= 12) {
        HostNetworkChart.series[0].data[0].remove();
      }
      if (HostPowerChart.series[0].data.length >= 12) {
        HostPowerChart.series[0].data[0].remove();
      }
      
      // 데이터 추가
      HostCPUChart.series[0].addPoint(cpu_usg, time);
      HostCPUChart.xAxis[0].categories.push(time);

      HostMemoryChart.series[0].addPoint(mem_usg, false);
      HostMemoryChart.xAxis[0].categories.push(time);
      
      HostDiskIOChart.series[0].addPoint(disk_usg, false);
      HostDiskIOChart.xAxis[0].categories.push(time);
      
      HostNetworkChart.series[0].addPoint(network_usg, false);
      HostNetworkChart.xAxis[0].categories.push(time);

      HostPowerChart.series[0].addPoint(power_usg, false);
      HostPowerChart.xAxis[0].categories.push(time);
    
      HostCPUChart.redraw();
      HostMemoryChart.redraw();
      HostDiskIOChart.redraw();
      HostNetworkChart.redraw();
      HostPowerChart.redraw();
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
    
    get_CacheUsage();
    get_CacheHitRatio();
    // get_ScanFilter();
  
    get_HostMetric();
  },10000);
}