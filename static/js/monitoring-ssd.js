const twentyFourHours = 86400000;
const fiveSeconds = 5000;
const KBToGB = 1048576;
const nanocoreTomillicore = 1000000;

let metricIntervalID;
let storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

let cpuChart, hostCpuChartData, instanceCpuChartData;
let powerChart, hostPowerChartData;
let memoryChart, hostMemoryChartData, instanceMemoryChartData;
let networkChart, hostNetworkRXChartData, hostNetworkTXChartData, instanceNetworkRXChartData, instanceNetworkTXChartData;
let diskChart, hostDiskChartData, instanceDiskChartData;
let hostChartCategories;

document.addEventListener("DOMContentLoaded", function(){
  cpuChart = Highcharts.chart(document.getElementById("cpuChart"), cpuChartOption);
  powerChart = Highcharts.chart(document.getElementById("powerChart"), powerChartOption);
  memoryChart = Highcharts.chart(document.getElementById("memoryChart"), memoryChartOption);
  networkChart = Highcharts.chart(document.getElementById("networkChart"), networkChartOption);
  diskChart = Highcharts.chart(document.getElementById("diskChart"), diskChartOption);

  viewUserID();
  getLatestChartData();
  startInterval();
})

function viewUserID(){
  const user_id = document.getElementById("user_info");
  user_id.textContent = "User : " + storeduserInfo.workbench_user_id;
}

function getLatestChartData(){
  fetch('/monitoring-ssd/metric', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
  })
  .then(response => response.json())
  .then(data => {updateChartData(data)})
}

function updateChartData(data){
  hostCpuChartData = [];
  instanceCpuChartData = [];
  hostPowerChartData = [];
  hostMemoryChartData = [];
  instanceMemoryChartData = [];
  hostNetworkRXChartData = [];
  hostNetworkTXChartData = [];
  instanceNetworkRXChartData = [];
  instanceNetworkTXChartData = [];
  hostDiskChartData = [];
  instanceDiskChartData = [];
  hostChartCategories = [];

  data["host_metric"].reverse().forEach(item => {
    hostCpuChartData.push((item.cpu_usage_nanocore)/nanocoreTomillicore);
    hostPowerChartData.push((item.power_usage));
    hostMemoryChartData.push((item.memory_usage)/KBToGB);
    hostNetworkRXChartData.push((item.network_rx_byte)/KBToGB);
    hostNetworkTXChartData.push((item.network_tx_byte)/KBToGB);
    hostDiskChartData.push((item.disk_usage)/KBToGB);
    var date = new Date(item.time);
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    var formattedHour = hour < 10 ? '0' + hour : hour;
    var formattedMinute = minute < 10 ? '0' + minute : minute;
    var time = formattedHour+":"+formattedMinute+":"+formattedSeconds;
    hostChartCategories.push(time);
  })

  data["instance_metric"].reverse().forEach(item => {
    instanceCpuChartData.push((item.cpu_usage)/nanocoreTomillicore);
    instanceMemoryChartData.push((item.memory_usage)/KBToGB);
    instanceNetworkRXChartData.push((item.network_rx_usage)/KBToGB);
    instanceNetworkTXChartData.push((item.network_tx_usage)/KBToGB);
    instanceDiskChartData.push((item.disk_usage)/KBToGB);
  })

  drawChart();
}

function drawChart(){
  cpuChart.series[0].setData(hostCpuChartData);
  cpuChart.xAxis[0].setCategories(hostChartCategories);
  powerChart.series[0].setData(hostPowerChartData);
  powerChart.xAxis[0].setCategories(hostChartCategories);
  memoryChart.series[0].setData(hostMemoryChartData);
  memoryChart.xAxis[0].setCategories(hostChartCategories);
  networkChart.series[0].setData(hostNetworkRXChartData);
  networkChart.series[1].setData(hostNetworkTXChartData);
  networkChart.xAxis[0].setCategories(hostChartCategories);
  diskChart.series[0].setData(hostDiskChartData);
  diskChart.xAxis[0].setCategories(hostChartCategories);

  cpuChart.redraw();
  powerChart.redraw();
  memoryChart.redraw();
  networkChart.redraw();
  diskChart.redraw();
}

function startInterval(){
  metricIntervalID = setInterval(getLatestChartData, fiveSeconds);
}

