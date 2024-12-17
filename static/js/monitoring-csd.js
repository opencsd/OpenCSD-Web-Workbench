const KBToGB = 1048576;

let cpuChart, powerChart, memoryChart, networkChart, diskChart;
let hostCpuChartData = [], instanceCpuChartData = [];
let powerChartData = [];
let hostMemoryChartData = [], instanceMemoryChartData = [];
let hostNetworkRxData = [], hostNetworkTxData = [], instanceNetworkRxData = [], instanceNetworkTxData = [];
let hostDiskChartData = [], instanceDiskChartData = [];
let chartCategories = [];
let csdCapacityChart, csdCpuChart, csdMemoryChart, csdNetworkChart;
let csdCapacityData = [], csdCpuData = [], csdMemoryData = [], csdNetworkDataRx = [], csdNetworkDataTx = [];
let csdCategories = [];


document.addEventListener("DOMContentLoaded", function(){
  initializeCharts();
  fetchMetrics();
  setInterval(fetchMetrics, 10000);
  csdCapacityChart.update({
    plotOptions: {
      series: {
        point: {
          events: {
            click: handleCSDPointClick
          }
        }
      }
    }
  });

  window.selectedCSD = "csd1";
})

document.addEventListener('DOMContentLoaded', () => {
  // 쿠키에서 session_id 읽기
  const sessionId = getCookie('session_id');
  
  if (!sessionId) {
    console.error('Session ID not found in cookies');
    return;
  }

  fetch(`http://10.0.4.87:30800/workbench/monitoring/connection-info?session-id=${sessionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {updateInstanceInfo(data);
    const operationNode = data.instanceInfo?.operationNode;
    const instanceType = data.instanceInfo?.instanceType;
    const dbName = data.connectionInfo?.dbName;
    const storageType = data.volumeInfo?.storageType;
    const accessPort = data.instanceInfo?.accessPort;

    document.cookie = `instance_type=${instanceType};path=/;samesite=lax`;
    document.cookie = `db_name=${dbName};path=/;samesite=lax`;
    document.cookie = `storage_type=${storageType};path=/;samesite=lax`;
    document.cookie = `access_port=${accessPort};path=/;samesite=lax`;

    if (!operationNode) {
      console.error('Operation node not found in connection-info');
      return;
    }
    fetch('http://10.0.4.87:30800/cluster/node-list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(nodeData => {
        const nodeList = nodeData.nodeList || {};
        const node = nodeList[operationNode]; // operationNode 이름으로 노드 검색
        if (node && node.nodeIp) {
          const nodeIp = node.nodeIp;

          // 쿠키에 nodeIp 저장
          document.cookie = `node_ip=${nodeIp}; path=/; samesite=lax`;
          console.log(`Node IP saved in cookie: ${nodeIp}`);
        } else {
          console.error('Node IP not found for the operationNode');
        }
      })
      .catch(error => console.error('Error fetching node-list:', error));
})
    .catch(error => console.error('Error fetching data:', error));
});

function updateInstanceInfo(data) {
  const { instanceInfo, volumeInfo } = data;

  document.getElementById('instanceName').textContent = instanceInfo?.instanceName || '-';
  document.getElementById('accessPort').textContent = instanceInfo?.accessPort || '-';
  document.getElementById('instanceType').textContent = instanceInfo?.instanceType || '-';
  document.getElementById('operationNode').textContent = instanceInfo?.operationNode || '-';
  document.getElementById('storageNode').textContent = instanceInfo?.storageNode || '-';
  document.getElementById('instanceStatus').textContent = instanceInfo?.instanceStatus || '-';
  document.getElementById('queryEngineStatus').textContent = instanceInfo?.queryEngineStatus || '-';
  document.getElementById('storageEngineStatus').textContent = instanceInfo?.storageEngineStatus || '-';
  document.getElementById('storageNode').textContent = instanceInfo?.storageNode || '-';
  document.getElementById('volumeName').textContent = volumeInfo?.volumeName || '-';
  document.getElementById('volumePath').textContent = volumeInfo?.volumePath || '-';
  document.getElementById('volumeType').textContent = volumeInfo?.volumeType || '-';
  document.getElementById('storageType').textContent = volumeInfo?.storageType || '-';

}


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}


function initializeCharts() {
  cpuChart = Highcharts.chart("cpuChart", {
    title: { text: "CPU Usage" },
    xAxis: { categories: [] },
    series: [{ name: "Node CPU", data: [] }]
  });

  powerChart = Highcharts.chart("powerChart", {
    title: { text: "Power Usage" },
    xAxis: { categories: [] },
    series: [{ name: "Node Power", data: [] }]
  });

  memoryChart = Highcharts.chart("memoryChart", {
    title: { text: "Memory Usage" },
    xAxis: { categories: [] },
    series: [{ name: "Node Memory", data: [] }]
  });

  networkChart = Highcharts.chart("networkChart", {
    title: { text: "Network Usage" },
    xAxis: { categories: [] },
    series: [
      { name: "Node RX", data: [] },
      { name: "Node TX", data: [] }
    ]
  });

  diskChart = Highcharts.chart("diskChart", {
    title: { text: "Disk Usage" },
    xAxis: { categories: [] },
    series: [{ name: "Node Disk", data: [] }]
  });

  csdCapacityChart = Highcharts.chart("csdCapacityChart", {
    title: { text: "CSD Capacity Usage" },
    xAxis: { categories: [] },
    series: [{ name: "CSD Usage", data: [] }]
  });

  csdCpuChart = Highcharts.chart("csdCpuChart", {
    title: { text: "CSD CPU Usage" },
    xAxis: { categories: [] },
    series: [{ name: "CPU Usage", data: [] }]
  });

  csdMemoryChart = Highcharts.chart("csdMemoryChart", {
    title: { text: "CSD Memory Usage" },
    xAxis: { categories: [] },
    series: [{ name: "Memory Usage", data: [] }]
  });

  csdNetworkChart = Highcharts.chart("csdNetworkChart", {
    title: { text: "CSD Network Usage" },
    xAxis: { categories: [] },
    series: [
      { name: "Network RX", data: [] },
      { name: "Network TX", data: [] }
    ]
  });
}


function fetchMetrics() {
  const sessionId = getCookie("session_id");

  if (!sessionId) {
    console.error("Session ID not found");
    return;
  }
  const csdUrl = `http://10.0.4.87:30800/workbench/monitoring/metric/csd?session-id=${sessionId}&count=15`;
  const instanceUrl = `http://10.0.4.87:30800/workbench/monitoring/metric/instance?session-id=${sessionId}&count=15`;
  const nodeUrl = `http://10.0.4.87:30800/workbench/monitoring/metric/node?session-id=${sessionId}&count=15`;

  Promise.all([fetch(instanceUrl), fetch(nodeUrl), fetch(csdUrl)])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(([instanceData, nodeData, csdData]) => {
      updateCharts(instanceData, nodeData);
      updateCSDCharts(csdData);

      // 선택된 CSD가 있다면 해당 CSD 차트 갱신
      if (window.selectedCSD) {
        updateSelectedCSDCharts(window.selectedCSD);
      }
    })
    .catch(error => console.error("Error fetching metrics:", error));
}

function updateCSDCharts(csdData) {
  if (typeof csdData !== 'object' || Array.isArray(csdData)) {
    console.error("CSD data is not valid:", csdData);
    return;
  }

  csdCategories = [];
  const csdSeries = [];
  const csdDetails = {};

  Object.entries(csdData).forEach(([csdKey, csdArray]) => {
    if (!Array.isArray(csdArray)) {
      console.error(`${csdKey} data is not an array`);
      return;
    }

    const seriesData = [];
    const cpuData = [];
    const memoryData = [];
    const networkRxData = [];
    const networkTxData = [];

    csdArray.reverse().forEach(item => {
      const timestamp = formatTime(item.timestamp);
      if (!csdCategories.includes(timestamp)) {
        csdCategories.push(timestamp);
      }

      seriesData.push(item.diskUtilization);
      cpuData.push(item.cpuUtilization);
      memoryData.push(item.memoryUtilization);
      networkRxData.push(item.networkRxData);
      networkTxData.push(item.networkTxData);
    });

    csdSeries.push({
      name: csdKey,
      data: seriesData
    });

    csdDetails[csdKey] = {
      cpu: cpuData,
      memory: memoryData,
      networkRx: networkRxData,
      networkTx: networkTxData,
    };
  });

  // 차트 갱신
  redrawCSDCharts(csdSeries);

  // 데이터 저장
  window.csdDetails = csdDetails;

  // 초기 csd1 표시
  if (window.selectedCSD) {
    updateSelectedCSDCharts(window.selectedCSD);
  }
}


function updateCharts(instanceData, nodeData) {
  hostCpuChartData = [];
  instanceCpuChartData = [];
  powerChartData = [];
  hostMemoryChartData = [];
  instanceMemoryChartData = [];
  hostNetworkRxData = [];
  hostNetworkTxData = [];
  instanceNetworkRxData = [];
  instanceNetworkTxData = [];
  hostDiskChartData = [];
  instanceDiskChartData = [];
  chartCategories = [];

  nodeData.reverse().forEach(item => {
    hostCpuChartData.push(item.cpuUtilization);
    powerChartData.push(item.powerUsed);
    hostMemoryChartData.push(item.memoryUtilization);
    hostNetworkRxData.push(item.networkRxData / KBToGB);
    hostNetworkTxData.push(item.networkTxData / KBToGB);
    hostDiskChartData.push(item.diskUtilization);
    chartCategories.push(formatTime(item.timestamp));
  });

  instanceData.reverse().forEach(item => {
    instanceCpuChartData.push(item.cpuUsage);
    instanceMemoryChartData.push(item.memoryUsage / KBToGB);
    instanceNetworkRxData.push(item.networkRxUsage / KBToGB);
    instanceNetworkTxData.push(item.networkTxUsage / KBToGB);
    instanceDiskChartData.push(item.storageUsage / KBToGB);
  });

  redrawCharts();
}

function updateSelectedCSDCharts(csdId) {
  const selectedData = window.csdDetails?.[csdId];

  if (!selectedData) {
    console.error(`No data found for ${csdId}`);
    return;
  }

  console.log(`Updating charts for ${csdId}`, selectedData);

  // 하단 그래프 갱신
  csdCpuChart.series[0].update({
    data: selectedData.cpu,
    color: csdCapacityChart.series.find(s => s.name === csdId)?.color || "gray" // 선택된 CSD의 색상
  });

  csdMemoryChart.series[0].update({
    data: selectedData.memory,
    color: csdCapacityChart.series.find(s => s.name === csdId)?.color || "gray" // 선택된 CSD의 색상
  });

  csdNetworkChart.series[0].update({
    data: selectedData.networkRx,
    color: csdCapacityChart.series.find(s => s.name === csdId)?.color || "gray" // 선택된 CSD의 색상
  });

  csdNetworkChart.series[1].update({
    data: selectedData.networkTx,
    color: csdCapacityChart.series.find(s => s.name === csdId)?.color || "gray" // 선택된 CSD의 색상
  });

  // x축 (시간) 갱신
  csdCpuChart.xAxis[0].setCategories(csdCategories);
  csdMemoryChart.xAxis[0].setCategories(csdCategories);
  csdNetworkChart.xAxis[0].setCategories(csdCategories);

  // 선택된 CSD 저장
  window.selectedCSD = csdId;
}



function redrawCSDCharts(csdSeries) {
  // 기존 시리즈 초기화
  while (csdCapacityChart.series.length > 0) {
    csdCapacityChart.series[0].remove(false); // 데이터 제거 (reflow 방지)
  }

  // 새로운 데이터 추가
  csdSeries.forEach(series => {
    csdCapacityChart.addSeries(series, false);
  });

  // x축 업데이트
  csdCapacityChart.xAxis[0].setCategories(csdCategories);

  // 차트 다시 그리기
  csdCapacityChart.redraw();
}

function handleCSDPointClick(event) {
  const csdId = event.point.series.name; // 클릭된 CSD의 이름
  const seriesColor = event.point.series.color; // 클릭된 시리즈의 색상

  console.log(`Selected CSD: ${csdId}, Color: ${seriesColor}`);

  // 선택된 CSD 데이터로 업데이트
  window.selectedCSD = csdId;  // 선택된 CSD 저장
  updateSelectedCSDCharts(csdId); // 선택된 CSD 차트 갱신
}
function redrawCharts() {
  cpuChart.series[0].setData(hostCpuChartData);

  cpuChart.xAxis[0].setCategories(chartCategories);

  powerChart.series[0].setData(powerChartData);
  powerChart.xAxis[0].setCategories(chartCategories);

  memoryChart.series[0].setData(hostMemoryChartData);

  memoryChart.xAxis[0].setCategories(chartCategories);

  networkChart.series[0].setData(hostNetworkRxData);
  networkChart.series[1].setData(hostNetworkTxData);

  networkChart.xAxis[0].setCategories(chartCategories);

  diskChart.series[0].setData(hostDiskChartData);

  diskChart.xAxis[0].setCategories(chartCategories);
}


function formatTime(timestamp) {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
