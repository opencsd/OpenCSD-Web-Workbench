let intervalID = 1;

var queryChart, queryChartCategories, queryChartSelectData, queryChartInsertData, queryChartUpdateData, queryCharDeletetData
var hostServerCPUChart, hostServerCPUChartCategories, hostServerInterfaceCPUChartData, hostServerMonitoringCPUChartData, hostServerOffloadingCPUChartData, hostServerMergingCPUChartData;

document.addEventListener("DOMContentLoaded", function(){
  queryChart = Highcharts.chart(document.getElementById("mainDBMonitoring"), queryChartOption);
  hostServerCPUChart = Highcharts.chart(document.getElementById("mainHostMonitoring"), hostServerCPUChartOption);
  ConnectedClientChart = Highcharts.chart(document.getElementById("ConnectedClientChart"), ConnectedClientOption);
  DBRWRateChart = Highcharts.chart(document.getElementById("DBRWRateChart"), DBRWRateOption);
  DBCacheHitRateChart = Highcharts.chart(document.getElementById("DBCacheHitRateChart"), DBCacheHitRateOption);
  DBCacheUsageChart = Highcharts.chart(document.getElementById("DBCacheUsageChart"), DBCacheUsageOption);
  DBCSDScanFilterChart = Highcharts.chart(document.getElementById("DBCSDScanFilterChart"), DBCSDScanFilterOption);

  queryChart.render();
  hostServerCPUChart.render();
  ConnectedClientChart.render();
  DBRWRateChart.render();
  DBCacheHitRateChart.render();
  DBCacheUsageChart.render();
  DBCSDScanFilterChart.render();

  getDDLData();
  updateLatestChart();
  // startInterval();
})

function getDDLData(){
  //그래프 최신값 가져오기 (웹서버 연동)
  
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

function updateLatestChart(){
  hostServerCPUChartCategories = ['16:58:00', '16:58:30', '16:59:00', '16:58:30', '17:00:00', '17:00:30', '17:01:00', '17:01:30', '17:02:00', '17:02:30', '17:03:00', '17:03:30', '17:04:00', '17:04:30', '17:05:00', '17:05:30', '17:06:00', '17:06:30', '17:07:00', '17:07:30'];
  hostServerInterfaceCPUChartData = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
  hostServerMonitoringCPUChartData = [80, 90, 80, 80, 40, 70, 80, 100, 120, 80, 80, 80, 40, 90, 90, 80, 90, 100, 70, 70];
  hostServerOffloadingCPUChartData = [80, 90, 80, 80, 40, 70, 80, 100, 120, 80, 80, 80, 40, 90, 90, 80, 90, 100, 70, 70];
  hostServerMergingCPUChartData = [500, 400, 450, 430, 430, 1000, 1200, 800, 700, 550, 500, 500, 435, 700, 800, 920, 700, 500, 520, 450];

  hostServerCPUChart.series[0].setData(hostServerInterfaceCPUChartData);
  hostServerCPUChart.series[1].setData(hostServerMonitoringCPUChartData);
  hostServerCPUChart.series[2].setData(hostServerOffloadingCPUChartData);
  hostServerCPUChart.series[3].setData(hostServerMergingCPUChartData);
  hostServerCPUChart.xAxis[0].setCategories(hostServerCPUChartCategories);


}

function startInterval(){
  //메트릭 업데이트 주기 설정
  intervalId = setInterval(function() {
    getDDLData();
    updateLatestChart();
  },5000);
}