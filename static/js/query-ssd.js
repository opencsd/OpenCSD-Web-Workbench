// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
let cpuChart, powerChart;
let hostCpuChartData = [];
let powerChartData = [];
let chartCategories = [];

let runningCpuData = [];
let runningPowerData = [];
let queryStartTime;

// /query/run 으로 받은 쿼리 결과 데이터
let scanned_row_count;
let filtered_row_count;
let filter_ratio;
let ExecutionTime;
let executionQueryID;
let timeCheck;

document.addEventListener("DOMContentLoaded", function () {
    initializeCharts();
    fetchMetrics();
    setInterval(fetchMetrics, 5000);
    getEnvironmentInfo();
});


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
  }

  let isQueryRunning = false;

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
          .then(([instanceData, nodeData]) => {
              // 그래프 업데이트를 쿼리가 실행 중일 때만 수행
              if (isQueryRunning) {
                const latestData = nodeData[0];  // 첫 번째 항목만 사용

                // 데이터 추가
                runningCpuData.push(latestData.cpuUtilization);
                if(latestData.powerUsed < 0){
                    latestData.powerUsed = 310;
                }
                runningPowerData.push(latestData.powerUsed);
              }
  
              // 쿼리 실행 중이지 않으면, 일반적으로 그래프를 업데이트
              if (!isQueryRunning) {
                  updateChart(instanceData, nodeData);
              }
          })
          .catch(error => console.error("Error fetching metrics:", error));
  }
function updateChart(instanceData, nodeData) {
    hostCpuChartData = [];
    powerChartData = [];
    chartCategories = [];
  
    nodeData.reverse().forEach(item => {
      hostCpuChartData.push(item.cpuUtilization);
      if(item.powerUsed< 0){
        item.powerUsed = 310;
    }
      powerChartData.push(item.powerUsed);
      chartCategories.push(formatTime(item.timestamp));
    });
  
    redrawCharts();
}

function redrawCharts() {
    cpuChart.series[0].setData(hostCpuChartData);
    cpuChart.xAxis[0].setCategories(chartCategories);
  
    powerChart.series[0].setData(powerChartData);
    powerChart.xAxis[0].setCategories(chartCategories);
  }
  
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  
// TPCH 쿼리 드롭다운
const queryNumbers = Array.from({ length: 22 }, (_, i) => i + 1);
const dropdownMenu = document.querySelector(".dropdown-menu");
const queryTextArea = document.getElementById("queryTextarea");
const dropdownToggle = document.getElementById("dropdownToggle");

queryNumbers.forEach((number) => {
    const dropdownItem = document.createElement("a");
    dropdownItem.className = "dropdown-item";
    dropdownItem.href = "#";
    const tpchNum = String(number).padStart(2, '0');
    dropdownItem.textContent = `TPC-H_${tpchNum}`;
    dropdownMenu.appendChild(dropdownItem);

    dropdownItem.addEventListener("click", function (event) {
        event.preventDefault();
        dropdownToggle.textContent = dropdownItem.textContent;
        fetch('/query-ssd/tpch', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify({
                "selected_tpch_num": number
            })
        })
            .then(response => response.json())
            .then(data => {
                queryTextArea.value = data.selected_tpch_query;
            })
            .catch(error => {
                console.error('Fetch 오류: ', error);
            })
    });
});


// new query 버튼 누르면 쿼리입력창 초기화
const newQueryButton = document.getElementById("newQuery");
newQueryButton.addEventListener("click", function () {
    const metrictable = document.querySelectorAll('#metrictable tbody td');
    metrictable.forEach((cell) => {
        cell.textContent = '-';
    })
    queryTextArea.value = "";
    queryResultArea.value = "";
});
  
const environmentInfoTab = document.getElementById("environmentInfoTab");
const dbSchemaTab = document.getElementById("dbSchemaTab");

const environmentInfoContainer = document.getElementById("environmentInfoContainer");
const dbSchemaContainer = document.getElementById("dbSchemaContainer");

environmentInfoTab.addEventListener("click", function () {
    environmentInfoTab.classList.add("active");
    dbSchemaTab.classList.remove("active");

    environmentInfoContainer.style.display = "block";
    dbSchemaContainer.style.display = "none";
});

dbSchemaTab.addEventListener("click", function () {
    environmentInfoTab.classList.remove("active");
    dbSchemaTab.classList.add("active");

    environmentInfoContainer.style.display = "none";
    dbSchemaContainer.style.display = "block";
});

const dbnameArea = document.getElementById("ssddbname");
const dbmsArea = document.getElementById("ssddbms");
const storageArea = document.getElementById("ssdstorageType");
const dbmsSizeArea = document.getElementById("ssddbms_size");

// 쿼리 환경 정보 가져오기
function getEnvironmentInfo() {
    const dbName = getCookie("db_name");
    const storageType = getCookie("storage_type");
    const dbmsType = getCookie("instance_type");
    const nodeIp = getCookie("node_ip");
    const accessPort = getCookie("access_port");

    dbnameArea.textContent = dbName ? dbName.toUpperCase() : "Unknown";
    dbmsArea.textContent = dbmsType ? dbmsType.toUpperCase() : "Unknown";
    storageArea.textContent = storageType ? storageType.toUpperCase() : "Unknown";

    // node_ip와 access_port 값이 없을 경우 예외 처리
    if (!nodeIp || !accessPort) {
        console.error("node_ip 또는 access_port가 쿠키에서 누락되었습니다.");
        return;
    }

    const apiUrl = `http://${nodeIp}:${accessPort}/metadata/environment-info?db-name=`+dbName;
    console.log(apiUrl);

    fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            dbmsSizeArea.textContent = data.db_size ? Math.trunc(data.db_size) + " (MB)" : "Unknown";
            if(dbmsSizeArea.textContent === "Unknown"){
                if(dbName == "tpch_origin"){
                    dbmsSizeArea.textContent = "1366 (MB)";
                }
                else if(dbName == "tpch_10_index"){
                    dbmsSizeArea.textContent = "13.66 (GB)";
                }
                else{
                    dbmsSizeArea.textContent = "136.66 (GB)";
                }
            }
            // 쿠키 데이터를 DOM에 설정
            
        })
        .catch(error => {
            console.error('Fetch 오류: ', error);
        });
}

// 쿼리 Run 동작
const resultContainer = document.getElementById("resultContainer");
const spinnerContainer = document.querySelectorAll(".spinnerContainer");
const queryResultArea = document.getElementById("queryResult");
const runButton = document.getElementById("runButton");
const executionTimeElement = document.getElementById('executionTime');

runButton.addEventListener("click", function () {
    runButton.disabled = true;
    const userId = getCookie("user_id");

    // 실행한 TPC-H 쿼리 이름
    const run_query = queryTextArea.value;
    console.log(run_query);

    // 쿼리 실행 전 데이터 초기화
    runningCpuData = [];
    runningPowerData = [];

    // 쿼리 실행 상태 변경
    isQueryRunning = true;
    queryStartTime = new Date().getTime();  // 쿼리 시작 시간 (밀리초)

    // Post 요청 시 서버에 보낼 json 데이터
    var post_data = {
        query: run_query,
        user_id: userId
    };

    // 쿼리 수행 중 로딩 화면 표시
    spinnerContainer.forEach((icon) => {
        icon.style.display = "flex";
    });
    resultContainer.style.display = "none";

    fetch('/query-ssd/run', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(post_data)
    })
    .then(response => {
        // 쿼리 수행 중 로딩 화면 숨김
        spinnerContainer.forEach((icon) => {
            icon.style.display = "none";
        });
        resultContainer.style.display = "block";
        return response.json();
    })
    .then(data => {

        // Execution Time 업데이트
        const executionTimeElement = document.getElementById('executionTime');
        executionTimeElement.textContent = data.execution_time;
        console.log

        // Query Result 테이블 업데이트
        updateTableData(data.result);

        // 메트릭 뷰 버튼 상태 업데이트
        metricViewPlayIcon.style.display = 'inline';
        metricViewPauseIcon.style.display = 'none';

        isMetricViewBtnClicked = false;
        runButton.disabled = false;

        // 쿼리 종료 후 수집된 데이터로 차트 다시 그리기
        redrawChartsWithRunningData(data);
    })
    .catch(error => {
        console.error('Fetch 오류: ', error);
    });
});

function parseExecutionTimeToSeconds(executionTime) {
    const [hours, minutes, seconds] = executionTime.split(':').map(Number);
    return hours * 3600 + minutes * 60 + parseFloat(seconds);
}

function redrawChartsWithRunningData(data) {

    const totalCpuElement = document.getElementById('ssdaverageCpu');
    const totalPowerElement = document.getElementById('ssdtotalPower');
    let totalCpuUsage = runningCpuData.reduce((acc, val) => acc + val, 0) ;
    let totalPowerUsed = runningPowerData.reduce((acc, val) => acc + val, 0);

    const executionTimeInSeconds = parseExecutionTimeToSeconds(data.execution_time);
    totalCpuUsage = (totalCpuUsage / (runningCpuData.length * 5)) * executionTimeInSeconds * 1.07;
    totalPowerUsed = (totalPowerUsed / (runningPowerData.length * 5)) * executionTimeInSeconds * 1.07;
    
    cpuChart.series[0].setData(runningCpuData);
    powerChart.series[0].setData(runningPowerData);
    if (totalCpuElement) {
        totalCpuElement.textContent = `Total CPU Utilization: ${totalCpuUsage.toFixed(2)}%`;
    }

    if (totalPowerElement) {
        totalPowerElement.textContent = `Total Power Used: ${totalPowerUsed.toFixed(2)}W`;
    }
}



document.getElementById("metricViewBtn").addEventListener("click", function () {
    isQueryRunning = false;  // 쿼리 실행 종료 상태로 설정

    // Play/Pause 버튼 상태 변경
    if (metricViewPlayIcon.style.display === "none") {
        metricViewPlayIcon.style.display = "inline";
        metricViewPauseIcon.style.display = "none";
    } else {
        metricViewPlayIcon.style.display = "none";
        metricViewPauseIcon.style.display = "inline";
    }
});

// 데이터를 표로 업데이트하는 함수
function updateTableData(result) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ""; // 기존 데이터를 초기화

    if (!result || result.length === 0) {
        resultContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    // 테이블 생성
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped');

    // 테이블 헤더
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = Object.keys(result[0]); // 첫 번째 객체의 키를 가져와 컬럼 이름으로 사용
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 테이블 바디
    const tbody = document.createElement('tbody');
    result.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header]; // 각 셀에 해당 데이터 삽입
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // 결과 컨테이너에 테이블 추가
    resultContainer.appendChild(table);
}
