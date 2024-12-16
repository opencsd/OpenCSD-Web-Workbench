// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
let cpuChart, powerChart;
let hostCpuChartData = [];
let powerChartData = [];
let intervalId;
let chartCategories = [];

let runningCpuData = [];
let runningPowerData = [];

// /query/run 으로 받은 쿼리 결과 데이터
let scanned_row_count;
let filtered_row_count;
let filter_ratio;
let ExecutionTime;
let executionQueryID;

let isQueryRunning = false;

document.addEventListener("DOMContentLoaded", function () {
    initializeCharts();
    fetchMetrics();
    setInterval(fetchMetrics, 5000);
    getEnvironmentInfo();
    // getLatestChartData();
    // drawLogTable();
    // startInterval();

});


function initializeCharts() {
    cpuChart = Highcharts.chart("csdcpuChart", {
      title: { text: "CPU Usage" },
      xAxis: { categories: [] },
      series: [{ name: "Node CPU", data: [] }]
    });
  
    powerChart = Highcharts.chart("csdpowerChart", {
      title: { text: "Power Usage" },
      xAxis: { categories: [] },
      series: [{ name: "Node Power", data: [] }]
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
            if (isQueryRunning) {
                const latestData = nodeData[0];  // 첫 번째 항목만 사용

                // 데이터 추가
                runningCpuData.push(latestData.cpuUtilization);
                runningPowerData.push(latestData.powerUsed);
              }
  
              // 쿼리 실행 중이지 않으면, 일반적으로 그래프를 업데이트
              if (!isQueryRunning) {
                  updateChart(instanceData, nodeData);
              }

            // Update selected CSD chart if applicable
            if (window.selectedCSD) {
                updateSelectedCSDCharts(window.selectedCSD);
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
        fetch('/query/tpch', {
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

    // if (!isMetricViewBtnClicked) {
    //     getLatestChartData();
    //     metricViewPlayIcon.style.display = 'none';
    //     metricViewPauseIcon.style.display = 'inline';
    //     startInterval();
    //     isMetricViewBtnClicked = !isMetricViewBtnClicked;
    // }
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
    envSetting.style.display = "block";
});

dbSchemaTab.addEventListener("click", function () {
    environmentInfoTab.classList.remove("active");
    dbSchemaTab.classList.add("active");

    environmentInfoContainer.style.display = "none";
    dbSchemaContainer.style.display = "block";
    envSetting.style.display = "none";
});

const dbnameArea = document.getElementById("dbname");
const dbmsArea = document.getElementById("dbms");
const csdCountArea = document.getElementById("csd_count");
const csdTypeArea = document.getElementById("csd_type");
const dbmsSizeArea = document.getElementById("dbms_size");
const blockCountArea = document.getElementById("block_count");
const AgorithmArea = document.getElementById("algorithm");
const indexArea = document.getElementById("index");

// 쿼리 환경 정보 가져오기
function getEnvironmentInfo() {
    const dbName = getCookie("db_name");
    const dbmsType = getCookie("instance_type");
    const csdCount = getCookie("csd_count");
    const csdType = getCookie("csd_type");
    const nodeIp = getCookie("node_ip");
    const accessPort = getCookie("access_port");

    // node_ip와 access_port 값이 없을 경우 예외 처리
    if(!accessPort){
        accessPort = 30100;
    }
    if (!nodeIp || !accessPort) {
        console.error("node_ip 또는 access_port가 쿠키에서 누락되었습니다.");
        return;
    }

    const apiUrl = `http://${nodeIp}:${accessPort}/metadata/environment-info?db-name=`+dbName;

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
            // 쿠키 데이터를 DOM에 설정
            dbnameArea.textContent = dbName ? dbName.toUpperCase() : "Unknown";
            dbmsArea.textContent = dbmsType ? dbmsType.toUpperCase() : "Unknown";
            csdCountArea.textContent = csdCount || "Unknown";
            if(csdCountArea.textContent === "Unknown"){
                csdCountArea.textContent = "8";
            }
            csdTypeArea.textContent = csdType ? csdType.toUpperCase() : "Unknown";
            if(csdTypeArea.textContent === "Unknown"){
                csdTypeArea.textContent = "NGD";
            }
            dbmsSizeArea.textContent = data.db_size ? Math.trunc(data.db_size) + " (MB)" : "Unknown";

            // API 데이터를 DOM에 설정
            blockCountArea.textContent = data.block_count || "Unknown";
            AgorithmArea.textContent = data.scheduling_algorithm ? data.scheduling_algorithm.toUpperCase() : "Unknown";
            indexArea.textContent = data.using_index ? "Use" : "Not Use";
        })
        .catch(error => {
            console.error('Fetch 오류: ', error);
        });
}

// 환경 설정 모달 창 동작
const envSetting = document.getElementById("envSetting");

envSetting.addEventListener('click', function () {
    envSettingmodalLoad()
});

var settingInfo = {
    set_blockCount: "",
    set_schedAlgo: "",
    set_Index: ""
}

function envSettingmodalLoad() {
    const dbName = document.getElementById("dbname").textContent;
    const dbNameElement = document.getElementById('inputDBname');
    const csdCountNum = document.getElementById("csd_count").textContent;
    const csdCountElement = document.getElementById('query_SetCsdCount');
    const blockCountNum = document.getElementById("block_count").textContent;
    const blockCountElement = document.getElementById('query_SetBlockCount');
    const dbms = document.getElementById("dbms").textContent;
    const dbmsElement = document.getElementById('query_dbms_select');
    const csdType = document.getElementById("csd_type").textContent;
    const csdTypeElement = document.getElementById('query_csdkind');
    const schedAlgo = document.getElementById("algorithm").textContent;
    const IndexInfo = document.getElementById("index").textContent;
    const IndexInfoElement = document.getElementById('query_index');

    // input 요소에 값을 설정
    csdCountElement.value = csdCountNum;
    dbNameElement.value = dbName;
    blockCountElement.value = blockCountNum;
    console.log(csdCountElement.value);
    console.log(blockCountElement.value);
    

    // 선택된 dbms
    if (dbms === "MYSQL") {
        dbmsElement.value = "mysql"
    }
    else if (dbms === "K-OPENSOURCEDB") {
        dbmsElement.value = "kopen"
    }
    else {
        dbmsElement.value = "sqlite"
    }

    // 선택된 csd type
    if (csdType === "NGD") {
        csdTypeElement.value = "ngd"
    }
    else if (csdType === "SCALEFLUX") {
        csdTypeElement.value = "scale"
    }
    else if(csdType === "SMART"){
        csdTypeElement.value = "smart"
    }
    else{
        csdTypeElement.value = "NGD";
    }

    // 선택된 스케줄링 알고리즘
    if (schedAlgo === "RANDOM") {
        document.getElementById("random_algo").checked = true;
    }
    else if (schedAlgo === "DCS") {
        document.getElementById("dcs_algo").checked = true;
    }
    else if (schedAlgo === "DSI") {
        document.getElementById("dsi_algo").checked = true;
    }
    else {
        document.getElementById("auto_algo").checked = true;
    }
    

    // 인덱스 스캔 사용 여부
    if (IndexInfo === "Use"){
        IndexInfoElement.checked = true;
    }
    else {
        IndexInfoElement.checked = false;
    }

    $("#envSettingModal").modal("show");
    var modalDiv = $('#envSettingModal');
    modalDiv.modal({
        backdrop: true,
        show: true
    });
}

// 옵션 수정 버튼
const envModifyButton = document.getElementById("query_option_modify");

envModifyButton.addEventListener('click', function () {
    settingInfo.set_blockCount = document.getElementById('query_SetBlockCount').value;
    if (document.getElementById("random_algo").checked = true) {
        settingInfo.set_schedAlgo = "random";
    }
    else if (document.getElementById("dcs_algo").checked = true) {
        settingInfo.set_schedAlgo = "dcs";
    }
    else if (document.getElementById("dsi_algo").checked = true) {
        settingInfo.set_schedAlgo = "dsi";
    }
    else {
        settingInfo.set_schedAlgo = "auto";
    }

    if (document.getElementById('query_index').checked = true){
        settingInfo.set_Index = 1;
    }
    else {
        settingInfo.set_Index = 0;
    }

    envSettingModify(settingInfo);
});

// 옵션 수정 버튼 클릭 시 동작
function envSettingModify(settingInfo) {
    fetch('/query/environment/update', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(settingInfo)
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.result === 0) {
                // 옵션 수정 완료
                getEnvironmentInfo();
                console.log("option modify success")
            }
            else {
                // 옵션 수정 실패
                console.log("option modify failed")
            }
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        })
}


// 쿼리 Run 동작
const resultContainer = document.getElementById("resultContainer");
const metricContainer = document.getElementById("metricContainer");
const spinnerContainer = document.querySelectorAll(".spinnerContainer");
const queryResultArea = document.getElementById("queryResult");
const runButton = document.getElementById("runButton");

runButton.addEventListener("click", function () {
    runButton.disabled = true;
    const userId = getCookie("user_id");
    const dbName = getCookie("db_name");

    // if (!isMetricViewBtnClicked) {
    //     getLatestChartData();
    //     metricViewPlayIcon.style.display = 'none';
    //     metricViewPauseIcon.style.display = 'inline';
    //     startInterval();
    //     isMetricViewBtnClicked = !isMetricViewBtnClicked;
    // }
    runningCpuData = [];
    runningPowerData = [];
    // 실행한 TPC-H 쿼리 이름
    const run_query = dropdownToggle.textContent
    // Post 요청 시 서버에 보낼 json 데이터
    var post_data = {
        query: run_query,
        user_name: userId,
        db_name: dbName
    }
    isQueryRunning = true;
    console.log(post_data)
    // 쿼리 수행 중 로딩 화면
    spinnerContainer.forEach((icon) => {
        icon.style.display = "flex";
    });
    resultContainer.style.display = "none";
    metricContainer.style.display = "none";

    fetch('http://10.0.4.80:30100/query/run', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(post_data)
    })
        .then(response => {
            spinnerContainer.forEach((icon) => {
                icon.style.display = "none";
            });
            resultContainer.style.display = "block";
            metricContainer.style.display = "block";
            return response.json();
        })
        .then(data => {
            console.log(data)

            updateTableData(data); // Query Result

            metricViewPlayIcon.style.display = 'inline';
            metricViewPauseIcon.style.display = 'none';

            isMetricViewBtnClicked = false;
            runButton.disabled = false;

            // 쿼리 종료 후 수집된 데이터로 차트 다시 그리기
            redrawChartsWithRunningData(); // Metric Data

            addQueryLog(data); // Query Log Add
            
        })
        .catch(error => {
            console.error('Fetch 오류: ', error);
        })
});
const metrictable1 = document.querySelector('td.qtable_1');
const metrictable2 = document.querySelector('td.qtable_2');
const metrictable3 = document.querySelector('td.qtable_3');
const metrictable4 = document.querySelector('td.qtable_4');
const metrictable5 = document.querySelector('td.qtable_5');

function updateTableData(data) {
    metrictable1.textContent = data.scanned_row_count + " (line)";
    metrictable2.textContent = data.filtered_row_count + " (line)";
    scanned_row_count = data.scanned_row_count;
    filtered_row_count = data.filtered_row_count;

    let f_ratio = ((data.scanned_row_count - data.filtered_row_count) / data.scanned_row_count) * 100;
    filter_ratio = f_ratio.toFixed(2);
    metrictable3.textContent = filter_ratio + " (%)";

    let queryStart = new Date(data.start_time);
    let queryEnd = new Date(data.end_time);
    let queryTime = queryEnd - queryStart;
    ExecutionTime = queryTime / 1000;
    metrictable4.textContent = ExecutionTime + " (sec)";
    metrictable5.textContent = data.snippet_count;

    queryTextArea.value = data.query_statement;
    queryResultArea.value = data.query_result;
}

function redrawChartsWithRunningData() {

    const totalCpuElement = document.getElementById('csdcpuChart');
    const totalPowerElement = document.getElementById('csdpowerChart');
    const totalCpuUsage = runningCpuData.reduce((acc, val) => acc + val, 0) / runningCpuData.length;
    const totalPowerUsed = runningPowerData.reduce((acc, val) => acc + val, 0);

    cpuChart.series[0].setData(runningCpuData);
    powerChart.series[0].setData(runningPowerData);
    if (totalCpuElement) {
        totalCpuElement.textContent = `Average CPU Utilization: ${totalCpuUsage.toFixed(2)}%`;
    }

    if (totalPowerElement) {
        totalPowerElement.textContent = `Total Power Used: ${totalPowerUsed.toFixed(2)}W`;
    }
}

document.getElementById("csdmetricViewBtn").addEventListener("click", function () {
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

// const queryDropdown = document.querySelector("#queryDropdown");
// const queryDropdownItems = document.querySelectorAll(".queryDropdownItem");

// queryDropdownItems.forEach(function (item) {
//     item.addEventListener("click", function () {
//         queryDropdown.text = item.textContent;
//     });
// });

// function getLatestChartData() {
//     fetch('/query/metric', {
//         method: 'GET',
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         redirect: 'follow',
//     })
//         .then(response => response.json())
//         .then(data => { updateChartData(data) })
// }

// function drawChart() {
//     hostServerCPUChart.updateOptions({
//         series: [{
//             name: "cpu",
//             data: hostServerCPUChartData
//         }
//         ],
//         xaxis: {
//             categories: hostServerChartCategories
//         }
//     });

//     hostServerPowerChart.updateOptions({
//         series: [{
//             name: "power",
//             data: hostServerPowerChartData
//         }
//         ],
//         xaxis: {
//             categories: hostServerChartCategories
//         }
//     });
// }

// function startInterval() {
//     intervalId = setInterval(getLatestChartData, 5000);
// }

// function drawLogTable() {
//     fetch('/query/log/get-all', {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         redirect: 'follow',
//         body: JSON.stringify({
//             "query_type": queryDropdown.text
//         })
//     })
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             if (data.length != 0) {
//                 addQueryLog(data);
//             } else {
//                 console.log("no query log data")
//             }
//         })
//         .catch(error => {
//             console.error('Fetch error: ', error);
//         })
// }






// function logClickEvent(queryCell) {
//     fetch('/query/log/get-one', { //html 화면 내에서 가져올 수 있을듯
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         redirect: 'follow',
//         body: JSON.stringify({
//             'query_id': queryCell.parentNode.id
//         })
//     })
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             clearInterval(intervalId);


//             updateTableData(data);

//             metricViewPlayIcon.style.display = 'inline';
//             metricViewPauseIcon.style.display = 'none';

//             isMetricViewBtnClicked = false;

//             updateChartData(data.query_metric);
//         })
//         .catch(error => {
//             console.error('Fetch error: ', error);
//         })
// }

// function logDeactivateEvent(validationID) {
//     deleteFromChart(queryID);
//     drawChart();
//     drawOptionTable();
// }



// const logDeleteButton = document.getElementById("logDelete");

// // 드롭다운에서 선택한 쿼리 타입으로 테이블 필터링
// function filterTableByQueryType(queryType) {
//     var tableRows = document.querySelectorAll("#queryLogTableBody tr");

//     for (var i = 0; i < tableRows.length; i++) {
//         var typeColumn = tableRows[i].querySelector("td:nth-child(2)"); // Type 열은 두 번째 열에 해당
//         if (typeColumn) {
//             var typeValue = typeColumn.innerHTML.trim();
//             // console.log(typeValue);
//             var typeIcon = "";
//             if (typeValue.includes(`class="icon icon-tabler icon-tabler-square-rounded-letter-s"`)) {
//                 typeIcon = 'SELECT'
//             }
//             else if (typeValue.includes(`class="icon icon-tabler icon-tabler-square-rounded-letter-c"`)) {
//                 typeIcon = 'DCL'
//             }
//             else if (typeValue.includes(`class="icon icon-tabler icon-tabler-square-rounded-letter-d"`)) {
//                 typeIcon = 'DDL'
//             }
//             else {
//                 typeIcon = 'OTHER'
//             }

//             if (queryType === "ALL" || queryType === typeIcon) { 
//                 tableRows[i].style.display = "";
//             } 
//             else {
//                 tableRows[i].style.display = "none";
//             }
//         }
//     }
// }

// // 드롭다운 항목 클릭 시 호출되는 함수
// function onQueryTypeSelected(queryType) {
//     document.getElementById("queryDropdown").innerText = queryType;
//     filterTableByQueryType(queryType);
// }

// // 각 드롭다운 항목에 이벤트 리스너 추가
// var dropdownItems = document.querySelectorAll(".queryDropdownItem");
// dropdownItems.forEach(function (item) {
//     item.addEventListener("click", function () {
//         onQueryTypeSelected(item.textContent);
//     });
// });


// logDeleteButton.addEventListener("click", function () {
//     const checkedCheckboxIds = [];

//     const checkboxes = document.querySelectorAll('.logCheckBox');
//     checkboxes.forEach(checkbox => {
//         if (checkbox.checked) {
//             checkedCheckboxIds.push(checkbox.parentNode.parentNode.id);
//         }
//     });

//     fetch('/query/log/delete', {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         redirect: 'follow',
//         body: JSON.stringify({
//             "delete_query_id": checkedCheckboxIds
//         })
//     })
//         .then(response => response.json())
//         .then(data => {
//             checkedCheckboxIds.forEach(rowID => {
//                 var rowToDelete = document.getElementById(rowID);

//                 if (rowToDelete) {
//                     rowToDelete.remove();
//                 }
//             });
//         })
//         .catch(error => {
//             console.error('Fetch 오류: ', error);
//         })
// });
