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

let metricInterval = null;

document.addEventListener("DOMContentLoaded", function () {
    initializeCharts();
    metricMonitoringPlaying();
    getEnvironmentInfo();
});


function initializeCharts() {
    cpuChart = Highcharts.chart("cpuChart", {
        title: { text: "CPU Usage" },
        xAxis: { categories: [] },
        yAxis: {
            min: 0,
            title: {
                text: "Core"
            },
        },
        series: [{ name: "Node CPU", data: [] }]
    });

    powerChart = Highcharts.chart("powerChart", {
        title: { text: "Power Usage" },
        xAxis: { categories: [] },
        yAxis: {
            min: 0,
            title: {
                text: "Watts"
            },
        },
        series: [{ name: "Node Power", data: [] }]
    });
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
        .then(([instanceData, nodeData]) => {
            if (metricInterval) {

                const latestData = nodeData[0];  // 첫 번째 항목만 사용
                // 데이터 추가
                runningCpuData.push(latestData.cpuUsed);
                if (latestData.powerUsed < 0) {
                    latestData.powerUsed = 310;
                }
                runningPowerData.push(latestData.powerUsed);
                updateChart(instanceData, nodeData);
            }

        })
        .catch(error => console.error("Error fetching metrics:", error));
}
function updateChart(instanceData, nodeData) {
    const totalCpuElement = document.getElementById('ssdaverageCpu');
    const totalPowerElement = document.getElementById('ssdtotalPower');

    totalPowerElement.textContent = `Current Power Usage: ${nodeData[0].powerUsed.toFixed(2)} W`;
    // totalCpuElement.textContent = `Current CPU Utilization: ${nodeData[0].cpuUtilization.toFixed(2)}%`;
    totalCpuElement.textContent = `Current CPU Usage: ${nodeData[0].cpuUsed} core`;

    hostCpuChartData = [];
    powerChartData = [];
    chartCategories = [];

    nodeData.reverse().forEach(item => {
        hostCpuChartData.push(item.cpuUsed);
        if (item.powerUsed < 0) {
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
const queryNumbers = Array.from({ length: 23 }, (_, i) => i);
const dropdownMenu = document.querySelector(".dropdown-menu");
const queryTextArea = document.getElementById("queryTextarea");
const dropdownToggle = document.getElementById("dropdownToggle");

queryNumbers.forEach((number) => {
    const dropdownItem = document.createElement("a");
    dropdownItem.className = "dropdown-item";
    dropdownItem.href = "#";
    if (number == 0) {
        dropdownItem.textContent = "Custom";
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

    } else {
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
    }
});


// new query 버튼 누르면 쿼리입력창 초기화
const newQueryButton = document.getElementById("newQuery");
newQueryButton.addEventListener("click", function () {
    const metrictable = document.querySelectorAll('#metrictable tbody td');
    metrictable.forEach((cell) => {
        cell.textContent = '-';
    })
    queryTextArea.value = "";
    resultContainer.innerHTML = "";
    // const executionTimeElement = document.getElementById('executionTime');
    // executionTimeElement.textContent = "-";
    dropdownToggle.textContent = "Query";
    metricMonitoringPlaying();

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
    const userId = getCookie("user_id");

    console.log("node_ip ", nodeIp);
    console.log("access_port ", accessPort);

    if (userId) {

        document.getElementById("user_info").textContent = userId;
    }
    dbnameArea.textContent = dbName ? dbName.toUpperCase() : "Unknown";
    dbmsArea.textContent = dbmsType ? dbmsType.toUpperCase() : "Unknown";
    storageArea.textContent = storageType ? storageType.toUpperCase() : "Unknown";

    // node_ip와 access_port 값이 없을 경우 예외 처리
    if (!nodeIp || !accessPort) {
        console.error("node_ip 또는 access_port가 쿠키에서 누락되었습니다.");

        return;
    }

    const apiUrl = `http://${nodeIp}:${accessPort}/metadata/environment?db-name=` + dbName;
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
            if (dbmsSizeArea.textContent === "Unknown") {
                if (dbName == "tpch_origin") {
                    dbmsSizeArea.textContent = "1366 (MB)";
                }
                else if (dbName == "tpch_10_index") {
                    dbmsSizeArea.textContent = "13.66 (GB)";
                }
                else {
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
// const executionTimeElement = document.getElementById('executionTime');

const metricContainer = document.getElementById("metricContainer");
const metricContainer2 = document.getElementById("metricContainer2");

runButton.addEventListener("click", function () {
    runButton.disabled = true;
    const userId = getCookie("user_id");//keti-admin
    const dbName = getCookie("db_name");//tpch~
    const sessionId = getCookie("session_id");
    const dbUser = getCookie("db_user");//root
    const dbPassword = getCookie("db_password");//ketilinux

    // 실행한 TPC-H 쿼리 이름
    const run_query = queryTextArea.value;
    console.log(run_query);

    // 쿼리 실행 전 데이터 초기화
    runningCpuData = [];
    runningPowerData = [];
    queryStartTime = new Date().getTime();  // 쿼리 시작 시간 (밀리초)

    // Post 요청 시 서버에 보낼 json 데이터
    if (run_query == "Custom" || run_query == "Query") {
        post_data = {
            query: queryTextarea.value,
            user_name: userId,
            db_name: dbName
        }
    } else {
        post_data = {
            query: run_query,
            user_name: userId,
            db_name: dbName,
            db_user: dbUser,
            db_password: dbPassword
        }
    }
    // 쿼리 수행 중 로딩 화면 표시
    spinnerContainer.forEach((icon) => {
        icon.style.display = "flex";
    });
    resultContainer.style.display = "none";
    metricContainer.style.display = "none";
    metricContainer2.style.display = "none";

    metricMonitoringPlaying();

    const url = `http://10.0.4.87:30800/workbench/query-ssd/run?session-id=${sessionId}`;

    fetch(url, {
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
            metricContainer.style.display = "block";
            metricContainer2.style.display = "block";
            return response.json();
        })
        .then(data => {
            metricMonitoringPausing();

            // Execution Time 업데이트
            // const executionTimeElement = document.getElementById('executionTime');
            // executionTimeElement.textContent = data.execution_time;

            // Query Result 테이블 업데이트
            updateTableData(data);

            runButton.disabled = false;

            // 쿼리 종료 후 수집된 데이터로 차트 다시 그리기
            redrawChartsWithRunningData(data);

        })
        .catch(error => {
            console.error('Fetch 오류: ', error);
        });
});

const metrictable4 = document.querySelector('td.qtable_4');
const metrictable6 = document.querySelector('td.qtable_6');
const metrictable7 = document.querySelector('td.qtable_7');
const metrictable8 = document.querySelector('td.qtable_8');

function redrawChartsWithRunningData(data) {
    console.log("redrawChartsWithRunningData ", data);
    const totalCpuElement = document.getElementById('ssdaverageCpu');
    const totalPowerElement = document.getElementById('ssdtotalPower');
    let totalCpuUsage = runningCpuData.reduce((acc, val) => acc + val, 0);
    let totalPowerUsed = runningPowerData.reduce((acc, val) => acc + val, 0);

    const executionTimeInSeconds = data.execution_time;
    totalCpuUsage = (totalCpuUsage / (runningCpuData.length * 5)) * executionTimeInSeconds * 1.07;
    totalPowerUsed = (totalPowerUsed / (runningPowerData.length * 5)) * executionTimeInSeconds * 1.07;

    cpuChart.series[0].setData(runningCpuData);
    powerChart.series[0].setData(runningPowerData);
    if (totalCpuElement) {
        totalCpuElement.textContent = `Total CPU Usage: ${totalCpuUsage.toFixed(2)} tick`;
    }

    if (totalPowerElement) {
        totalPowerElement.textContent = `Total Power Usage: ${totalPowerUsed.toFixed(2)} W`;
    }
}



document.getElementById("metricViewBtn").addEventListener("click", function () {

    if (!metricInterval) {
        metricMonitoringPlaying();

    } else {
        metricMonitoringPausing();
    }
});

// 데이터를 표로 업데이트하는 함수
function updateTableData(result) {
    const queryResult = result;

    if (!result || result.length === 0) {
        resultContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    if (queryResult.query_statement !== "") {
        queryTextArea.value = queryResult.query_statement;

    }

    // HTML 테이블 생성
    const resultText = queryResult.query_result;
    const rows = resultText.split("\n").filter(row => row.trim() !== ""); // 공백 행 제거

    // 헤더와 데이터 분리
    const headerRow = rows[1].split("|").map(cell => cell.trim()).filter(cell => cell);
    const dataRows = rows.slice(3, -1).map(row =>
        row.split("|").map(cell => cell.trim()).filter(cell => cell)
    );

    let htmlTable = "<table border='1' style='width: 100%; border-collapse: collapse; text-align: center; white-space: nowrap;'>";
    htmlTable += "<thead><tr>";
    headerRow.forEach(header => {
        htmlTable += `<th>${header}</th>`;
    });
    htmlTable += "</tr></thead><tbody>";
    dataRows.forEach(dataRow => {
        htmlTable += "<tr>";
        dataRow.forEach(cell => {
            htmlTable += `<td>${cell}</td>`;
        });
        htmlTable += "</tr>";
    });
    htmlTable += "</tbody></table>";

    // 결과를 HTML로 렌더링
    const queryResultArea = document.getElementById("queryResult");
    queryResultArea.innerHTML = htmlTable;
    // queryResultArea.innerHTML = resultText;
    // 디버그 로그
    console.log("Table updated with data:", queryResult);
    metrictable6.textContent = queryResult.cpu_usage + " (tick)";
    metrictable7.textContent = queryResult.power_usage + " (W)";
    metrictable8.textContent = queryResult.data_size + " (MB)";
    metrictable4.textContent = queryResult.execution_time + " (sec)";


}

function metricMonitoringPlaying() {
    console.log("Metric Monitoring Start");
    metricViewPlayIcon.style.display = "none";
    metricViewPauseIcon.style.display = "inline";
    fetchMetrics();
    metricInterval = setInterval(fetchMetrics, 5000);
}

function metricMonitoringPausing() {
    console.log("Metric Monitoring Stop");
    clearInterval(metricInterval);
    metricInterval = null;
    metricViewPlayIcon.style.display = 'inline';
    metricViewPauseIcon.style.display = 'none';
}

