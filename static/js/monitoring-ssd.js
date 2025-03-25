const KBToGB = 1048576;

let cpuChart, powerChart, memoryChart, networkChart, diskChart;
let hostCpuChartData = [], instanceCpuChartData = [];
let powerChartData = [];
let hostMemoryChartData = [], instanceMemoryChartData = [];
let hostNetworkRxData = [], hostNetworkTxData = [], instanceNetworkRxData = [], instanceNetworkTxData = [];
let hostDiskChartData = [], instanceDiskChartData = [];
let chartCategories = [];

document.addEventListener("DOMContentLoaded", function () {
  initializeCharts();
  fetchMetrics();
  setInterval(fetchMetrics, 5000);
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
    .then(data => {
      updateInstanceInfo(data);
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
  const { connectionInfo, instanceInfo, volumeInfo } = data;
  document.getElementById('user_info').textContent = connectionInfo?.userName || '-';

  document.getElementById('ssdinstanceName').textContent = instanceInfo?.instanceName || '-';
  document.getElementById('ssdaccessPort').textContent = instanceInfo?.accessPort || '-';
  document.getElementById('ssdinstanceType').textContent = instanceInfo?.instanceType || '-';
  document.getElementById('ssdoperationNode').textContent = instanceInfo?.operationNode || '-';
  document.getElementById('ssdstorageNode').textContent = instanceInfo?.storageNode || '-';
  document.getElementById('ssdinstanceStatus').textContent = instanceInfo?.instanceStatus || '-';
  document.getElementById('ssdqueryEngineStatus').textContent = instanceInfo?.queryEngineStatus || '-';
  document.getElementById('ssdstorageEngineStatus').textContent = instanceInfo?.storageEngineStatus || '-';
  document.getElementById('ssdstorageNode').textContent = instanceInfo?.storageNode || '-';
  document.getElementById('ssdvolumeName').textContent = volumeInfo?.volumeName || '-';
  document.getElementById('ssdvolumePath').textContent = volumeInfo?.volumePath || '-';
  document.getElementById('ssdvolumeType').textContent = volumeInfo?.volumeType || '-';
  document.getElementById('ssdstorageType').textContent = volumeInfo?.storageType || '-';
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
  cpuChart = Highcharts.chart("ssdcpuChart", {
    title: { text: "CPU Usage" },
    xAxis: { categories: [] },
    yAxis: {
      min: 0,
      title: {
        text: "Core"
      }
    },
    series: [{ name: "Node CPU", data: [] }]
  });

  powerChart = Highcharts.chart("ssdpowerChart", {
    title: { text: "Power Usage" },
    xAxis: { categories: [] },
    yAxis: {
      min: 0,
      title: {
        text: "Watts"
      }
    },
    series: [{ name: "Node Power", data: [] }]
  });

  memoryChart = Highcharts.chart("ssdmemoryChart", {
    title: { text: "Memory Usage" },
    xAxis: { categories: [] },
    yAxis: {
      min: 0,
      title: {
        text: "GB"
      }
    },
    series: [{ name: "Node Memory", data: [] }]
  });

  networkChart = Highcharts.chart("ssdnetworkChart", {
    title: { text: "Network Usage" },
    xAxis: { categories: [] },
    yAxis: {
      min: 0,
      title: {
        text: "Bytes"
      }
    },
    series: [
      { name: "Node RX", data: [] },
      { name: "Node TX", data: [] }
    ]
  });
  /**
   * disk delete
   */
  // diskChart = Highcharts.chart("ssddiskChart", {
  //   title: { text: "Disk Usage" },
  //   xAxis: { categories: [] },
  //   series: [{ name: "Node Disk", data: [] }]
  // });
}


function fetchMetrics() {
  const sessionId = getCookie("session_id");

  if (!sessionId) {
    console.error("Session ID not found");
    return;
  }

  const instanceUrl = `http://10.0.4.87:30800/workbench/monitoring/metric/instance?session-id=${sessionId}&count=15`;
  const nodeUrl = `http://10.0.4.87:30800/workbench/monitoring/metric/node?session-id=${sessionId}&count=15`;

  Promise.all([fetch(instanceUrl), fetch(nodeUrl)])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(([instanceData, nodeData]) => updateCharts(instanceData, nodeData))
    .catch(error => console.error("Error fetching metrics:", error));
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
