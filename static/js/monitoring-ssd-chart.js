let intervalID = 1;

var queryChart, queryChartCategories, queryChartSelectData, queryChartInsertData, queryChartUpdateData, queryCharDeletetData
var hostServerCPUChart, hostServerCPUChartCategories, hostServerCPUChartData;

document.addEventListener("DOMContentLoaded", function(){
  queryChart = Highcharts.chart(document.getElementById("mainDBMonitoring"), queryChartOption);
  hostServerCPUChart = Highcharts.chart(document.getElementById("mainHostMonitoring"), hostServerCPUChartOption);

  updateLatestChart();

  queryChart.render();
  hostServerCPUChart.render();

  startInterval();
})

function getLatestChartData(){
  //그래프 최신값 가져오기 (웹서버 연동)
  //임시저장
  queryChartCategories = ['16:58:00', '16:58:30', '16:59:00', '16:58:30', '17:00:00', '17:00:30', '17:01:00', '17:01:30', '17:02:00', '17:02:30', '17:03:00', '17:03:30', '17:04:00', '17:04:30', '17:05:00', '17:05:30', '17:06:00', '17:06:30', '17:07:00', '17:07:30'];
  queryChartSelectData = [20, 19, 8, 18, 12, 12, 13, 5, 22, 16, 12, 16, 11, 25, 16, 17, 16, 20, 26, 15];
  queryChartInsertData = [1, 1, 0, 0, 1, 0, 0, 1, 1, 3, 3, 0, 0, 0, 3, 3, 0, 0, 0, 0];
  queryChartUpdateData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 3, 1, 0];
  queryCharDeletetData = [1, 1, 0, 0, 1, 0, 0, 1, 1, 3, 3, 0, 3, 3, 0, 0, 0, 0, 0, 0];
  
  hostServerCPUChartCategories = ['16:58:00', '16:58:30', '16:59:00', '16:58:30', '17:00:00', '17:00:30', '17:01:00', '17:01:30', '17:02:00', '17:02:30', '17:03:00', '17:03:30', '17:04:00', '17:04:30', '17:05:00', '17:05:30', '17:06:00', '17:06:30', '17:07:00', '17:07:30'];
  hostServerCPUChartData = [80, 90, 80, 80, 40, 70, 80, 100, 120, 80, 80, 80, 40, 90, 90, 80, 90, 100, 70, 70];
}

function updateLatestChart(){
  getLatestChartData();

  queryChart.series[0].setData(queryChartSelectData);
  queryChart.series[1].setData(queryChartInsertData);
  queryChart.series[2].setData(queryChartUpdateData);
  queryChart.series[3].setData(queryCharDeletetData);
  queryChart.xAxis[0].setCategories(queryChartCategories);

  hostServerCPUChart.series[0].setData(hostServerCPUChartData);
  hostServerCPUChart.xAxis[0].setCategories(hostServerCPUChartCategories);
}

function startInterval(){
  //메트릭 업데이트 주기 설정
  intervalId = setInterval(updateLatestChart,1000);
}