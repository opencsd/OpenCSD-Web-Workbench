const twentyFourHours = 86400000;
const fiveSeconds = 5000;
const KBToGB = 1048576;
const nanocoreTomillicore = 1000000;

let metricIntervalID, csdIntervalID;
let selectedCSDID = -1;

let cpuChart, hostCpuChartData, instanceCpuChartData;
let powerChart, hostPowerChartData;
let memoryChart, hostMemoryChartData, instanceMemoryChartData;
let networkChart, hostNetworkRXChartData, hostNetworkTXChartData, instanceNetworkRXChartData, instanceNetworkTXChartData;
let diskChart, hostDiskChartData, instanceDiskChartData;
let csdCapacityChart, csdCapacityChartTotalData, csdCapacityChartUsageData, csdCapacityChartCategories;
let csdCpuChart, csdCpuChartData;
let csdMemoryChart, csdMemoryChartData;
let csdNetworkChart, csdNetworkRXChartData, csdNetwockTXChartData;
let hostChartCategories, csdChartCategories;

document.addEventListener("DOMContentLoaded", function(){
  cpuChart = Highcharts.chart(document.getElementById("cpuChart"), cpuChartOption);
  powerChart = Highcharts.chart(document.getElementById("powerChart"), powerChartOption);
  memoryChart = Highcharts.chart(document.getElementById("memoryChart"), memoryChartOption);
  networkChart = Highcharts.chart(document.getElementById("networkChart"), networkChartOption);
  diskChart = Highcharts.chart(document.getElementById("diskChart"), diskChartOption);
  csdCapacityChart = Highcharts.chart(document.getElementById("csdCapacityChart"), csdCapacityChartOption);
  csdCpuChart = Highcharts.chart(document.getElementById("csdCpuChart"), csdCpuChartOption);
  csdMemoryChart = Highcharts.chart(document.getElementById("csdMemoryChart"), csdMemoryChartOption);
  csdNetworkChart = Highcharts.chart(document.getElementById("csdNetworkChart"), csdNetworkChartOption);

  viewUserID();
  getLatestChartData();
  getLatestCSDChartData();
  startInterval();
})

function viewUserID(){
  const user_id = document.getElementById("user_info");
  user_id.textContent = "User : " + storeduserInfo.workbench_user_id;
}

const dbInfoSlideBtn = document.getElementById('dbInfoSlideBtn');
const dbInfoSlideUpIcon = document.getElementById('dbInfoSlideUpIcon');
const dbInfoSlideDownIcon = document.getElementById('dbInfoSlideDownIcon');
let isDBInfoSlideBtnClicked = true;
let storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

dbInfoSlideBtn.addEventListener('click', () => {
  const hiddenDBInfo = document.getElementById('hiddenDBInfo');
  
  if (isDBInfoSlideBtnClicked) {
      dbInfoSlideUpIcon.style.display = 'none';
      dbInfoSlideDownIcon.style.display = 'inline';
      hiddenDBInfo.style.display = 'block';
  } else {
      dbInfoSlideUpIcon.style.display = 'inline';
      dbInfoSlideDownIcon.style.display = 'none';
      hiddenDBInfo.style.display = 'none';
  }
  isDBInfoSlideBtnClicked = !isDBInfoSlideBtnClicked;
});

function getLatestChartData(){
  fetch('/monitoring/metric', {
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
  cpuChart.series[1].setData(instanceCpuChartData);
  cpuChart.xAxis[0].setCategories(hostChartCategories);
  powerChart.series[0].setData(hostPowerChartData);
  powerChart.xAxis[0].setCategories(hostChartCategories);
  memoryChart.series[0].setData(hostMemoryChartData);
  memoryChart.series[1].setData(instanceMemoryChartData);
  memoryChart.xAxis[0].setCategories(hostChartCategories);
  networkChart.series[0].setData(hostNetworkRXChartData);
  networkChart.series[1].setData(hostNetworkTXChartData);
  networkChart.series[2].setData(instanceNetworkRXChartData);
  networkChart.series[3].setData(instanceNetworkTXChartData);
  networkChart.xAxis[0].setCategories(hostChartCategories);
  diskChart.series[0].setData(hostDiskChartData);
  diskChart.series[1].setData(instanceDiskChartData);
  diskChart.xAxis[0].setCategories(hostChartCategories);

  cpuChart.redraw();
  powerChart.redraw();
  memoryChart.redraw();
  networkChart.redraw();
  diskChart.redraw();
}

function getLatestCSDChartData(){
  fetch('/monitoring/csd/capacity', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
  })
  .then(response => response.json())
  .then(data => {updateCSDChartData(data)})
}

function updateCSDChartData(data){
  csdCapacityChartTotalData = [];
  csdCapacityChartUsageData = [];
  csdCapacityChartCategories = [];

  for (let csd_id in data) {
    csdCapacityChartTotalData.push(["CSD"+csd_id, data[csd_id].disk_total / KBToGB]);
    csdCapacityChartUsageData.push({
      name: "CSD"+csd_id,
      y: data[csd_id].disk_usage / KBToGB,
      color: 'rgba(135,206,250,0.7)',
    });
    csdCapacityChartCategories.push("CSD "+csd_id);
  }

  drawCSDChart();
}

function drawCSDChart(){
  csdCapacityChart.series[0].setData(csdCapacityChartTotalData);
  csdCapacityChart.series[1].setData(csdCapacityChartUsageData);
  csdCapacityChart.xAxis[0].setCategories(csdCapacityChartCategories);
  csdCapacityChart.redraw();
}

function getLatestCSDMetricChartData(){
  fetch('/monitoring/csd/metric', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({
        "csd_id": selectedCSDID,
    })
  })
  .then(response => response.json())
  .then(data => {updateCSDMetricChartData(data)})
}

function updateCSDMetricChartData(data){
  csdCpuChartData = [];
  csdMemoryChartData = [];
  csdNetworkRXChartData = [];
  csdNetwockTXChartData = [];
  csdChartCategories = [];

  data.reverse().forEach(function(item){
    csdCpuChartData.push(item.cpu_usage);
    csdMemoryChartData.push(item.memory_usage);
    csdNetworkRXChartData.push(item.network_rx_byte);
    csdNetwockTXChartData.push(item.network_tx_byte);
    var date = new Date(item.time);
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    var formattedHour = hour < 10 ? '0' + hour : hour;
    var formattedMinute = minute < 10 ? '0' + minute : minute;
    var time = formattedHour+":"+formattedMinute+":"+formattedSeconds;
    csdChartCategories.push(time);
  });

  drawCSDMetricChart();
}

function drawCSDMetricChart(){
  let serieseName = "CSD"+selectedCSDID;
  csdCpuChart.series[0].setData(csdCpuChartData);
  csdCpuChart.xAxis[0].setCategories(csdChartCategories);
  csdCpuChart.series[0].update({name:serieseName + " CPU"}, false);
  csdMemoryChart.series[0].setData(csdMemoryChartData);
  csdMemoryChart.xAxis[0].setCategories(csdChartCategories);
  csdMemoryChart.series[0].update({name:serieseName + " Memory"}, false);
  csdNetworkChart.series[0].setData(csdNetworkRXChartData);
  csdNetworkChart.series[1].setData(csdNetwockTXChartData);
  csdNetworkChart.xAxis[0].setCategories(csdChartCategories);
  csdNetworkChart.series[0].update({name:serieseName + " RX Net"}, false);
  csdNetworkChart.series[1].update({name:serieseName + " TX Net"}, false);

  csdCpuChart.redraw();
  csdMemoryChart.redraw();
  csdNetworkChart.redraw();
}

function startInterval(){
  metricIntervalID = setInterval(getLatestChartData, fiveSeconds);
  csdIntervalID = setInterval(getLatestCSDChartData, twentyFourHours);
}

