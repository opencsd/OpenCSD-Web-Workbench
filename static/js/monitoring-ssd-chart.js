let intervalID = 1;
// SlowQueryChart
// var queryChart, ConnectedClientChart, DBRWRateChart, DBCacheUsageChart, DBCacheHitRatioChart
var HostCpuChart, HostMemoryChart, HostNetworkChart, HostPowerChart, hostDiskIOChart

// var totalDDL = new Deque();
// var totalClient = new Deque();
// var totalDisk = new Deque();
// var totalCacheUsage = new Deque();
// var totalCacheHit = new Deque();
// var totalTime = new Deque();
// storage_cpu_usage = 

let total_time = [];

let total_select_cnt = [];
let total_insert_cnt = [];
let total_delete_cnt = [];
let total_update_cnt = [];

let total_client_cnt = [];
let total_disk_usage = [];
let total_cache_usage = [];
let total_cache_hit_ratio = [];

cnt = 0;
HostCpuChart = Highcharts.chart(document.getElementById("HostCpuUsageChart"), HostCpuUsageOption);

// window.addEventListener("load", (event) => {
//   get_TotalMysqlMetric()// 처음 로딩될 때 20개 전부 로딩
//   get_TotalHostMetric() 

//   setTimeout(startInterval(), 5000); // 5초 기다린 후 metric 수집 시작
// });

document.addEventListener("DOMContentLoaded", function(){
  // DataBase Monitoring 차트 정의
  // queryChart = Highcharts.chart(document.getElementById("mainDBMonitoring"), queryChartOption);
  // ConnectedClientChart = Highcharts.chart(document.getElementById("ConnectedClientChart"), ConnectedClientOption);
  // DBRWRateChart = Highcharts.chart(document.getElementById("DBRWRateChart"), DBRWRateOption);
  // DBCacheUsageChart = Highcharts.chart(document.getElementById("DBCacheUsageChart"), DBCacheUsageOption);
  // DBCacheHitRatioChart = Highcharts.chart(document.getElementById("DBCacheHitRatioChart"), DBCacheHitRatioOption);

  // Host Metric Monitoring 차트 정의
  // HostCpuChart = Highcharts.chart(document.getElementById("HostCpuUsageChart"), HostCpuUsageOption);
  HostMemoryChart = Highcharts.chart(document.getElementById("HostMemoryChart"), HostMemoryOption);
  HostNetworkChart = Highcharts.chart(document.getElementById("HostNetworkUsageChart"), HostNetworkOption);
  HostPowerChart = Highcharts.chart(document.getElementById("HostPowerChart"), HostPowerOption);
  HostDiskChart = Highcharts.chart(document.getElementById("HostDiskIOChart"), hostDiskIOOption);

  // getDDLData();
  // getConnectedClient();
  // get_ReadWrite();
  // get_CacheUsage();
  // get_CacheHitRatio();

  // get_TotalMysqlMetric()// 처음 로딩될 때 20개 전부 로딩
  get_TotalHostMetric() 

  setTimeout(startInterval(), 5000); // 5초 기다린 후 metric 수집 시작
  // startInterval();
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
      // if (queryChart.series[0].data.length >= 12) {
      //   queryChart.series[0].data[0].remove();
      // }
      // if (queryChart.series[1].data.length >= 12) {
      //   queryChart.series[1].data[0].remove();
      // }
      // if (queryChart.series[2].data.length >= 12) {
      //   queryChart.series[2].data[0].remove();
      // }
      // if (queryChart.series[3].data.length >= 12) {
      //   queryChart.series[3].data[0].remove();
      // }

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
      // HostCpuChart.series[0].addPoint(cpu_usg, time);
    })
    .catch(error => console.error('Error: ', error));
}

// 연결된 클라이언트 수
function getConnectedClient(){
  var timestamps = [];
  var clients = [];

  // if (ConnectedClientChart.series[0].data.length >= 12) {
  //   ConnectedClientChart.series[0].data[0].remove();
  // }

  fetch('/monitoring_ssd/get_ConnectedClient')
    .then(response => response.json())
    .then(data => {

      console.log(data);
      
      client = data.client;
      totalClient.addRear(client);
      // data.forEach(function(item) {
      //   timestamps.push(item.timestamp);
      //   clients.push(item.client);
      // })
    HostCpuChart.series[0].addPoint(client, false);
    HostCpuChart.xAxis[0].categories.push(time);
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

      console.log(data);

      diskR = data.disk_read;
      diskW = data.disk_write;
      diskRw = diskR + diskW;
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

      cacheUsg = data.cache_hit_rate;
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

function get_TotalMysqlMetric() {
  queryChart.series[0].setData(total_select_cnt);
  queryChart.series[1].setData(total_insert_cnt);
  queryChart.series[2].setData(total_delete_cnt);
  queryChart.series[3].setData(total_update_cnt); 
  queryChart.xAxis[0].setCategories(total_time);   

  // Client Cnt
  ConnectedClientChart.series[0].setData(total_client_cnt);
  ConnectedClientChart.xAxis[0].setCategories(total_time);
  
  // disk 
  DBRWRateChart.series[0].setData(total_disk_usage);
  // DBRWRateChart.series[1].setData(disk_write);
  DBRWRateChart.xAxis[0].setCategories(total_time);

  // cache usage
  DBCacheUsageChart.series[0].setData(total_cache_usage);
  DBCacheUsageChart.xAxis[0].setCategories(total_time);

  // cache hit
  DBCacheHitRatioChart.series[0].setData(total_cache_hit_ratio);
  DBCacheHitRatioChart.xAxis[0].setCategories(total_time);
}

function get_MysqlMetric() {
  fetch('/monitoring_ssd/get_TotalMysqlMetric')
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    // time = data.timestamp;
    // select_count = data.select_count;
    // insert_count = data.insert_count;
    // delete_count = data.delete_count;
    // update_count = data.update_count;

    // disk_usage = data.disk_usage;
    // cache_ratio = data.cache_ratio;
    // cache_usage = data.cache_usage;
    // client_count = data.client_count;
    total_time = data.timestamp;

    total_select_cnt = data.select_count;
    total_insert_cnt = data.insert_count;
    total_delete_cnt = data.delete_count;
    total_update_cnt = data.update_count;

    total_disk_usage = data.disk_usage;
    total_cache_hit_ratio = data.cache_ratio;
    total_cache_usage = data.cache_usage;
    total_client_cnt = data.client_count;
    
    arrLen = total_select_cnt.length - 1
    // DDL
    queryChart.series[0].addPoint(total_select_cnt[arrLen], false);
    queryChart.series[1].addPoint(total_insert_cnt[arrLen], false);
    queryChart.series[2].addPoint(total_delete_cnt[arrLen], false);
    queryChart.series[3].addPoint(total_update_cnt[arrLen], false);
    queryChart.xAxis[0].categories.push(total_time[arrLen]);

    // Client Cnt
    // console.log(total_select_cnt[arrLen]);
    // console.log(total_client_cnt);
    // console.log(total_client_cnt[arrLen]);
    ConnectedClientChart.series[0].addPoint(total_client_cnt[arrLen], false);
    ConnectedClientChart.xAxis[0].categories.push(total_time[arrLen]);

    // disk
    DBRWRateChart.series[0].addPoint(total_disk_usage[arrLen], false);
    DBRWRateChart.xAxis[0].categories.push(total_time[arrLen]);

    // cache usage
    DBCacheUsageChart.series[0].addPoint(total_cache_usage[arrLen], false);
    DBCacheUsageChart.xAxis[0].categories.push(total_time[arrLen]);

    // cache hit
    DBCacheHitRatioChart.series[0].addPoint(total_cache_hit_ratio[arrLen], false);
    DBCacheHitRatioChart.xAxis[0].categories.push(total_time[arrLen]);

    queryChart.redraw();
    ConnectedClientChart.redraw();
    DBRWRateChart.redraw();
    DBCacheUsageChart.redraw();
    DBCacheHitRatioChart.redraw();

    cnt++;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });  
}

// Host / CSD 각 CPU 사용량
function get_HostMetric() {
  // timestamp = [];

  fetch('/monitoring_ssd/get_HostMetric')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      time = data.timestamp;
      cpu_usg = data.cpu_usage;
      mem_usg = data.memory_usage;
      disk_usg = data.disk_usage;
      network_usg = data.network_usage;
      power_usg = data.power_usage;
      
      // 배열 꽉 차면 맨 앞 데이터 하나 없애기
      if (HostCpuChart.series[0].data.length >= 12) {
        HostCpuChart.series[0].data[0].remove();
      }
      if (HostMemoryChart.series[0].data.length >= 12) {
        HostMemoryChart.series[0].data[0].remove();
      }
      if (HostDiskChart.series[0].data.length >= 12) {
        HostDiskChart.series[0].data[0].remove();
      }
      if (HostNetworkChart.series[0].data.length >= 12) {
        HostNetworkChart.series[0].data[0].remove();
      }
      if (HostPowerChart.series[0].data.length >= 12) {
        HostPowerChart.series[0].data[0].remove();
      }
      
      // 데이터 추가
      HostCpuChart.series[0].addPoint(cpu_usg, false);
      HostCpuChart.xAxis[0].categories.push(time);

      HostMemoryChart.series[0].addPoint(mem_usg, false);
      HostMemoryChart.xAxis[0].categories.push(time);
      
      HostDiskChart.series[0].addPoint(disk_usg, false);
      HostDiskChart.xAxis[0].categories.push(time);
      
      HostNetworkChart.series[0].addPoint(network_usg, false);
      HostNetworkChart.xAxis[0].categories.push(time);

      HostPowerChart.series[0].addPoint(power_usg, false);
      HostPowerChart.xAxis[0].categories.push(time);

      HostCpuChart.redraw();
      HostMemoryChart.redraw();
      HostDiskChart.redraw();
      HostNetworkChart.redraw();
      HostPowerChart.redraw();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function get_TotalHostMetric() {
    fetch('/monitoring_ssd/get_TotalHostMetric')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        time = data.timestamp;
        cpu_usg = data.cpu_usage;
        mem_usg = data.memory_usage;
        disk_usg = data.disk_usage;
        network_usg = data.network_usage;
        power_usg = data.power_usage;
        
        HostCpuChart.series[0].setData(cpu_usg);
        HostCpuChart.xAxis[0].setCategories(time);

        HostMemoryChart.series[0].setData(mem_usg);
        HostMemoryChart.xAxis[0].setCategories(time);

        HostDiskChart.series[0].setData(disk_usg);
        HostDiskChart.xAxis[0].setCategories(time);

        HostNetworkChart.series[0].setData(network_usg);
        HostNetworkChart.xAxis[0].setCategories(time);

        HostPowerChart.series[0].setData(power_usg);
        HostPowerChart.xAxis[0].setCategories(time);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

function startInterval(){
  //메트릭 업데이트 주기 설정(수집 주기에 맞춰서 인터벌 설정해야함)
  intervalId = setInterval(function() {
    // getDDLData();
    // getConnectedClient();
    // get_ReadWrite();
    
    // get_CacheUsage();
    // get_CacheHitRatio();

    // get_ScanFilter();
    
    // get_MysqlMetric();
    get_HostMetric();
    // get_TotalHostMetric();
    
  },5100);
}

// class Deque {
//   constructor() {
//     this.items = [];
//   }

//   // 앞쪽에 요소 추가
//   addFront(element) {
//     this.items.unshift(element);
//   }

//   // 뒷쪽에 요소 추가
//   addRear(element) {
//     this.items.push(element);
//   }

//   // 앞쪽에서 요소 제거
//   removeFront() {
//     if (this.isEmpty()) {
//       return undefined;
//     }
//     return this.items.shift();
//   }

//   // 뒷쪽에서 요소 제거
//   removeRear() {
//     if (this.isEmpty()) {
//       return undefined;
//     }
//     return this.items.pop();
//   }

//   // Deque가 비어있는지 확인
//   isEmpty() {
//     return this.items.length === 0;
//   }

//   // Deque의 크기 반환
//   size() {
//     return this.items.length;
//   }

//   // Deque의 내용을 문자열로 반환
//   toString() {
//     return this.items.toString();
//   }

//   // 크기가 20이 되도록 유지
//   maintainSize() {
//     while (this.size() > 20) {
//       this.removeFront();
//     }
//   }
// }