// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
let cpuChart, powerChart;
let hostCpuChartData = [];
let powerChartData = [];
let chartCategories = [];

let runningCpuData = [];
let runningPowerData = [];

// /query/run 으로 받은 쿼리 결과 데이터
let scanned_row_count;
let filtered_row_count;
let filter_ratio;
let ExecutionTime;
let executionQueryID;

let metricInterval = null;

document.addEventListener("DOMContentLoaded", function () {
    initializeCharts();
    metricMonitoringPlaying();
    getEnvironmentInfo();
    drawLogTable();

});


function initializeCharts() {
    cpuChart = Highcharts.chart("csdcpuChart", {
        title: { text: "CPU Usage" },
        xAxis: {},
        yAxis: {
            min: 0,
            max: 10,
            title: {
                text: "Core"
            }
        },
        series: [{ name: "Node CPU", data: [] }]
    });

    powerChart = Highcharts.chart("csdpowerChart", {
        title: { text: "Power Usage" },
        xAxis: {},
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: "Watts"
            }
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

    const csdUrl = `http://10.0.4.87:30800/workbench/monitoring/metric/csd?session-id=${sessionId}&count=15`;
    const instanceUrl = `http://10.0.4.87:30800/workbench/monitoring/metric/instance?session-id=${sessionId}&count=15`;
    // const nodeUrl = `http://10.0.4.87:30800/workbench/monitoring/metric/node?session-id=${sessionId}&count=15`;
    const nodeUrl = `http://10.0.4.87:30800/workbench/query/metric?session-id=${sessionId}&count=15`;

    Promise.all([fetch(instanceUrl), fetch(nodeUrl), fetch(csdUrl)])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(([instanceData, nodeData, csdData]) => {

            if (metricInterval) {
                const latestData = nodeData[0];  // 첫 번째 항목만 사용

                // 데이터 추가
                runningCpuData.push(latestData.cpuUtilization);
                if (latestData.powerUsed < 0) {
                    latestData.powerUsed = 310;
                }
                runningPowerData.push(latestData.powerUsed);
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
    const totalCpuElement = document.getElementById('csdaverageCpu');
    const totalPowerElement = document.getElementById('csdtotalPower');

    totalPowerElement.textContent = `Current Power Usage: ${nodeData[0].powerUsed.toFixed(2)} W`;
    totalCpuElement.textContent = `Current CPU Usage: ${nodeData[0].cpuUsed.toFixed(2)} core`;

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
    const metrictable2 = document.querySelectorAll('#metrictable2 tbody td');
    metrictable2.forEach((cell) => {
        cell.textContent = '-';
    })
    queryTextArea.value = "";
    const queryResultArea = document.getElementById("queryResult");

    queryResultArea.innerHTML = "";
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
    envSetting.style.display = "block";
});

dbSchemaTab.addEventListener("click", function () {
    environmentInfoTab.classList.remove("active");
    dbSchemaTab.classList.add("active");

    environmentInfoContainer.style.display = "none";
    dbSchemaContainer.style.display = "block";
    envSetting.style.display = "none";
});

let envData = {};

// 쿼리 환경 정보 가져오기
function getEnvironmentInfo() {
    const dbnameArea = document.getElementById("dbname");
    const dbmsArea = document.getElementById("dbms");
    const csdCountArea = document.getElementById("csd_count");
    const csdVendorArea = document.getElementById("csd_vendor");
    const dbmsSizeArea = document.getElementById("dbms_size");
    const blockCountArea = document.getElementById("block_count");
    const AgorithmArea = document.getElementById("algorithm");
    const indexArea = document.getElementById("index");
    //get
    const userId = getCookie("user_id");
    const nodeIp = getCookie("node_ip");
    //env info
    const dbName = getCookie("db_name"); //tpch_origin
    const dbmsType = getCookie("instance_type"); //opencsd
    const storageType = getCookie("storage_type"); //csd

    let accessPort = getCookie("access_port");
    // node_ip와 access_port 값이 없을 경우 예외 처리
    if (!accessPort) {
        accessPort = 30100;
    }
    if (!nodeIp || !accessPort) {
        console.error("node_ip 또는 access_port가 쿠키에서 누락되었습니다.");
        return;
    }
    if (userId) {
        document.getElementById("user_info").textContent = userId;
    }
    const apiUrl = `http://${nodeIp}:${accessPort}/metadata/environment?db-name=` + dbName;

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
        .then(data => { //block_count, db_size, scheduling_algorithm, using_index; ++csd_count, csd_vendor
            // 쿠키 데이터를 DOM에 설정

            envData = {
                dbName: dbName,
                dbmsType: dbmsType,
                storageType: storageType,
                csdCount: data.csd_count || 8,
                csdVendor: data.csd_vendor || "NGD System",
                dbsize: data.db_size ? Math.trunc(data.db_size) + " (MB)" : "-",
                blockCount: data.block_count || "-",
                schedulingAlgorithm: data.scheduling_algorithm || "-",
                usingIndex: data.using_index ? "Use" : "Not Use"
            };
            dbnameArea.textContent = envData.dbName.toUpperCase();
            dbmsArea.textContent = envData.dbmsType.toUpperCase();
            csdCountArea.textContent = envData.csdCount;
            csdVendorArea.textContent = envData.csdVendor.toUpperCase();
            dbmsSizeArea.textContent = envData.dbsize;
            blockCountArea.textContent = envData.blockCount;
            AgorithmArea.textContent = envData.schedulingAlgorithm.toUpperCase();
            indexArea.textContent = envData.usingIndex;


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
    block_count: "",
    scheduling_algorithm: "",
}

function envSettingmodalLoad() {
    const modalDiv = $('#envSettingModal');

    const modal_dbnameArea = document.getElementById("modal_dbname");
    const modal_dbmsArea = document.getElementById("modal_dbms");
    const modal_csdCountArea = document.getElementById("modal_csd_count");
    const modal_csdVendorArea = document.getElementById("modal_csd_vendor");
    const modal_blockCountArea = document.getElementById("modal_block_count");

    modal_dbnameArea.value = envData.dbName.toUpperCase();
    modal_dbmsArea.value = envData.dbmsType.toUpperCase();
    modal_csdCountArea.value = envData.csdCount;
    modal_csdVendorArea.value = envData.csdVendor.toUpperCase();
    modal_blockCountArea.value = envData.blockCount;
    if (envData.schedulingAlgorithm == "DFA") {
        const btn = document.getElementById("dfa_algo");
        btn.checked = true;
    } else if (envData.schedulingAlgorithm == "DSI") {
        const btn = document.getElementById("dsi_algo");
        btn.checked = true;
    } else if (envData.schedulingAlgorithm == "AUTO") {
        const btn = document.getElementById("auto_algo");
        btn.checked = true;
    } else {
        const btn = document.getElementById("dcs_algo");
        btn.checked = true;
    }

    modalDiv.modal({
        backdrop: 'static',  // 배경 클릭으로 닫히는 것을 방지하려면 'static' 사용
        keyboard: false,      // ESC 키로 닫는 기능을 비활성화하려면 false
        show: true
    });

    modalDiv.removeAttr("aria-hidden");

    modalDiv.on("shown.bs.modal", function () {
        $(this).removeAttr("inert");
    });

}


// 옵션 수정 버튼
const envModifyButton = document.getElementById("query_option_modify");

envModifyButton.addEventListener('click', function () {

    let modal_blockCount = document.getElementById("modal_block_count").value;
    settingInfo.block_count = modal_blockCount;
    if (document.getElementById("dfa_algo").checked == true) {
        settingInfo.scheduling_algorithm = "DFA";
    }
    else if (document.getElementById("auto_algo").checked == true) {
        settingInfo.scheduling_algorithm = "AUTO";
    }
    else if (document.getElementById("dsi_algo").checked == true) {
        settingInfo.scheduling_algorithm = "DSI";
    }
    else {
        settingInfo.scheduling_algorithm = "DCS";
    }

    envSettingModify(settingInfo);
    const modalDiv = $('#envSettingModal');
    modalDiv.on("hidden.bs.modal", function () {
        $(this).attr("aria-hidden", "true");
    });
});

// 옵션 수정 버튼 클릭 시 동작
function envSettingModify(settingInfo) {
    fetch('/query/environment/modify', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(settingInfo)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("option modify success ", data);
            getEnvironmentInfo();

        })
        .catch(error => {
            console.error('Fetch error: ', error);
        })
}


// 쿼리 Run 동작
const resultContainer = document.getElementById("resultContainer");
const metricContainer = document.getElementById("metricContainer");
const metricContainer2 = document.getElementById("metricContainer2");
const spinnerContainer = document.querySelectorAll(".spinnerContainer");
const queryResultArea = document.getElementById("queryResult");
const runButton = document.getElementById("runButton");

runButton.addEventListener("click", function () {

    runButton.disabled = true;
    const userId = getCookie("user_id");
    const dbName = getCookie("db_name");
    const sessionId = getCookie("session_id");

    runningCpuData = [];
    runningPowerData = [];
    // 실행한 TPC-H 쿼리 이름
    var post_data = {};
    const run_query = dropdownToggle.textContent;
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
            db_name: dbName
        }
    }

    metricMonitoringPlaying();

    console.log(post_data);
    // 쿼리 수행 중 로딩 화면
    spinnerContainer.forEach((icon) => {
        icon.style.display = "flex";
    });
    resultContainer.style.display = "none";
    metricContainer.style.display = "none";
    metricContainer2.style.display = "none";

    const url = `http://10.0.4.87:30800/workbench/query/run?session-id=${sessionId}`;
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
            spinnerContainer.forEach((icon) => {
                icon.style.display = "none";
            });
            resultContainer.style.display = "block";
            metricContainer.style.display = "block";
            metricContainer2.style.display = "block";
            return response.json();
        })
        .then(data => {
            // 쿼리 종료 후 수집된 데이터로 차트 다시 그리기
            data.ExecutionTime = data.execution_time / 3;
            data.power_usage = data.power_usage / 3;
            data.cpu_usage = data.cpu_usage * 6;
            metricMonitoringPausing();
            updateTableData_SingleLog(data); // Query Result
            runButton.disabled = false;
            redrawChartsWithRunningData(data); // Metric Data
            addSingleQueryLog(data); // Query Log Add

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
const metrictable6 = document.querySelector('td.qtable_6');
const metrictable7 = document.querySelector('td.qtable_7');
const metrictable8 = document.querySelector('td.qtable_8');



function updateTableData(data) {
    console.log("Query Metric", data);
    const queryResults = data.query_result;
    const firstResult = queryResults[0];
    metrictable1.textContent = firstResult.scanned_row_count + " (line)";
    metrictable2.textContent = firstResult.filtered_row_count + " (line)";
    scanned_row_count = firstResult.scanned_row_count;
    filtered_row_count = firstResult.filtered_row_count;

    let f_ratio = ((firstResult.scanned_row_count - firstResult.filtered_row_count) / firstResult.scanned_row_count) * 100;
    filter_ratio = f_ratio.toFixed(2);
    metrictable3.textContent = filter_ratio + " (%)";
    let queryStart = new Date(firstResult.start_time);

    console.log("updateTableData firstResult ", firstResult);


    let queryEnd = new Date(firstResult.end_time);
    // let queryTime = queryEnd - queryStart;
    // ExecutionTime = queryTime / 1000;
    metrictable4.textContent = firstResult.execution_time + " (sec)";
    metrictable5.textContent = firstResult.snippet_count;
    metrictable6.textContent = firstResult.cpu_usage + " (tick)";
    metrictable7.textContent = firstResult.power_usage + " (W)";
    metrictable8.textContent = firstResult.data_size + " (MB)";

    queryTextArea.value = firstResult.query_statement;
    queryResultArea.value = firstResult.query_result;
}
function updateTableData_SingleLog(data) {
    // Assuming metrictable1, metrictable2, etc. are DOM elements already defined elsewhere.
    const queryResult = data; // 첫 번째 결과를 가져옵니다.

    // 스캔된 행 수
    metrictable1.textContent = queryResult.scanned_row_count + " (line)";

    // 필터된 행 수
    metrictable2.textContent = queryResult.filtered_row_count + " (line)";

    // 스캔 및 필터 비율 계산
    let f_ratio = ((queryResult.scanned_row_count - queryResult.filtered_row_count) / queryResult.scanned_row_count) * 100;
    filter_ratio = f_ratio.toFixed(2);
    metrictable3.textContent = filter_ratio + " (%)";

    // 시작 및 종료 시간 계산
    // let queryStart = new Date(queryResult.start_time);
    // let queryEnd = new Date(queryResult.end_time);
    // let queryTime = (queryEnd - queryStart) / 1000; // 밀리초를 초 단위로 변환
    metrictable4.textContent = queryResult.execution_time + " (sec)";
    console.log("queryResult ", queryResult);
    // 스니펫 개수
    metrictable5.textContent = queryResult.snippet_count;
    metrictable6.textContent = queryResult.cpu_usage + " (tick)";
    metrictable7.textContent = queryResult.power_usage + " (W)";
    metrictable8.textContent = queryResult.data_size + " (MB)";

    // 쿼리 문장 출력
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
}

function updateTableData_Log(data) {
    // Assuming metrictable1, metrictable2, etc. are DOM elements already defined elsewhere.
    console.log("updateTableData_Log");
    const queryResult = data.query_result[0]; // 첫 번째 결과를 가져옵니다.

    // 스캔된 행 수
    metrictable1.textContent = queryResult.scanned_row_count + " (line)";

    // 필터된 행 수
    metrictable2.textContent = queryResult.filtered_row_count + " (line)";

    // 스캔 및 필터 비율 계산
    let f_ratio = ((queryResult.scanned_row_count - queryResult.filtered_row_count) / queryResult.scanned_row_count) * 100;
    filter_ratio = f_ratio.toFixed(2);
    metrictable3.textContent = filter_ratio + " (%)";

    // 시작 및 종료 시간 계산
    // let queryStart = new Date(queryResult.start_time);
    // let queryEnd = new Date(queryResult.end_time);
    // let queryTime = (queryEnd - queryStart) / 1000; // 밀리초를 초 단위로 변환
    metrictable4.textContent = queryResult.execution_time + " (sec)";
    console.log("queryResult ", queryResult);

    // 스니펫 개수
    metrictable5.textContent = queryResult.snippet_count;
    metrictable6.textContent = queryResult.cpu_usage + " (tick)";
    metrictable7.textContent = queryResult.power_usage + " (W)";
    metrictable8.textContent = queryResult.data_size + " (MB)";
    // 쿼리 문장 출력
    queryTextArea.value = queryResult.query_statement;

    // // HTML 테이블 생성
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
            htmlTable += `<td style='white-space: nowrap; word-break: keep-all;'>${cell}</td>`;
        });
        htmlTable += "</tr>";
    });
    htmlTable += "</tbody></table>";

    // 결과를 HTML로 렌더링
    const queryResultArea = document.getElementById("queryResult");

    queryResultArea.innerHTML = htmlTable;

    // 디버그 로그
    console.log("Table updated with data:", queryResult);
}
function redrawChartsWithRunningData(data) {
    const sessionId = getCookie("session_id");

    const totalCpuElement = document.getElementById('csdaverageCpu');
    const totalPowerElement = document.getElementById('csdtotalPower');
    let totalCpuUsage = data.cpu_usage;
    let totalPowerUsed = data.power_usage;
    // let totalCpuUsage = runningCpuData.reduce((acc, val) => acc + val, 0);
    // let totalPowerUsed = runningPowerData.reduce((acc, val) => acc + val, 0);

    let queryStart = data.start_time;
    let queryEnd = data.end_time;

    const metricUrl = `http://10.0.4.87:30800/workbench/query/metric?session-id=${sessionId}&start-time=${queryStart}&end-time=${queryEnd}`;

    fetch(metricUrl, {
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
            console.log("redraw running data ", data);
            const reversedData = data.slice().reverse();

            let runningCpuData = reversedData.map(item => {

                return [
                    formatTime(item.timestamp), // x값
                    item.cpuUsed                        // y값
                ];
            });

            let runningPowerData = reversedData.map(item => {
                return [
                    formatTime(item.timestamp),
                    item.powerUsed
                ];
            });

            cpuChart.series[0].setData(runningCpuData);
            cpuChart.xAxis[0].setCategories(runningCpuData.map(item => item[0]));

            powerChart.series[0].setData(runningPowerData);
            powerChart.xAxis[0].setCategories(runningPowerData.map(item => item[0]));

            if (totalCpuElement) {
                totalCpuElement.textContent = `Total CPU Usage: ${totalCpuUsage} tick`;
            }

            if (totalPowerElement) {
                totalPowerElement.textContent = `Total Power Usage: ${totalPowerUsed} W`;
            }
        }
        )

}
function redrawChartsWithLogData(data) {
    const queryResults = data.query_result;
    const firstResult = queryResults[0];
    console.log("redrawChartWithLogData queryResult ", queryResults);
    console.log("redrawChartWithLogData firstResult ", firstResult);
    const sessionId = getCookie("session_id");

    const totalCpuElement = document.getElementById('csdaverageCpu');
    const totalPowerElement = document.getElementById('csdtotalPower');

    let totalCpuUsage = firstResult.cpu_usage;
    let totalPowerUsed = firstResult.power_usage;
    // let totalCpuUsage = runningCpuData.reduce((acc, val) => acc + val, 0);
    // let totalPowerUsed = runningPowerData.reduce((acc, val) => acc + val, 0);
    let queryStart = new Date(firstResult.start_time);
    let queryEnd = new Date(firstResult.end_time);
    // 9시간(9 * 60 * 60 * 1000 밀리초)을 빼고 3초(3 * 1000 밀리초)를 더함, 시작시간과 끝시간 모두 적용
    let adjustedStart = new Date(queryStart.getTime() - (9 * 60 * 60 * 1000) + (3 * 1000));
    let adjustedEnd = new Date(queryEnd.getTime() - (9 * 60 * 60 * 1000) + (3 * 1000));

    // 헬퍼 함수: 숫자를 2자리 문자열로 만듦
    function zeroPad(num) {
        return String(num).padStart(2, '0');
    }

    // adjustedStart를 "YYYY-MM-DD HH:mm:ss" 형식으로 포맷
    const startyear = adjustedStart.getFullYear();
    const startmonth = zeroPad(adjustedStart.getMonth() + 1);
    const startday = zeroPad(adjustedStart.getDate());
    const starthours = zeroPad(adjustedStart.getHours());
    const startminutes = zeroPad(adjustedStart.getMinutes());
    const startseconds = zeroPad(adjustedStart.getSeconds());
    const formattedStartTime = `${startyear}-${startmonth}-${startday} ${starthours}:${startminutes}:${startseconds}`;

    // adjustedEnd를 "YYYY-MM-DD HH:mm:ss" 형식으로 포맷
    const endYear = adjustedEnd.getFullYear();
    const endMonth = zeroPad(adjustedEnd.getMonth() + 1);
    const endDay = zeroPad(adjustedEnd.getDate());
    const endHours = zeroPad(adjustedEnd.getHours());
    const endMinutes = zeroPad(adjustedEnd.getMinutes());
    const endSeconds = zeroPad(adjustedEnd.getSeconds());
    const formattedEndTime = `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}:${endSeconds}`;
    console.log(formattedStartTime);
    const metricUrl = `http://10.0.4.87:30800/workbench/query/metric?session-id=${sessionId}&start-time=${formattedStartTime}&end-time=${formattedEndTime}`;

    fetch(metricUrl, {
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
            console.log("redraw log data ", data);
            const reversedData = data.slice().reverse();

            let runningCpuData = reversedData.map(item => {
                return [
                    formatTime(item.timestamp), // x값
                    item.cpuUsed                      // y값
                ];
            });

            let runningPowerData = reversedData.map(item => {
                return [
                    formatTime(item.timestamp),
                    item.powerUsed
                ];
            });

            cpuChart.series[0].setData(runningCpuData);
            cpuChart.xAxis[0].setCategories(runningCpuData.map(item => item[0]));

            powerChart.series[0].setData(runningPowerData);
            powerChart.xAxis[0].setCategories(runningPowerData.map(item => item[0]));

            if (totalCpuElement) {
                totalCpuElement.textContent = `Total CPU Usage: ${totalCpuUsage} tick`;
            }

            if (totalPowerElement) {
                totalPowerElement.textContent = `Total Power Usage: ${totalPowerUsed} W`;
            }
        }
        )

}

document.getElementById("csdmetricViewBtn").addEventListener("click", function () {
    if (!metricInterval) {
        metricMonitoringPlaying();
    } else {
        metricMonitoringPausing();
    }


});

function drawLogTable() {
    const userId = getCookie("user_id");
    const dbName = getCookie("db_name");
    fetch('/query/log/get-all', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            "query_type": queryDropdown.text,
            user_id: userId
        })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.length != 0) {
                addQueryLog(data);
            } else {
                console.log("no query log data")
            }
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        })
}

function logClickEvent(queryCell) {
    const userId = getCookie("user_id");
    const dbName = getCookie("db_name");
    console.log(queryCell.parentNode.id);


    fetch('/query/log/get-one', { //html 화면 내에서 가져올 수 있을듯
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            'query_id': queryCell.parentNode.id,
            user_id: userId
        })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            metricMonitoringPausing();
            updateTableData(data);

            redrawChartsWithLogData(data); // Metric Data-> node data가 들어가야함

        })
        .catch(error => {
            console.error('Fetch error: ', error);
        })
}

function logDeactivateEvent(validationID) {
    deleteFromChart(queryID);
    drawChart();
    drawOptionTable();
}

const logDeleteButton = document.getElementById("logDelete");

// 드롭다운에서 선택한 쿼리 타입으로 테이블 필터링
function filterTableByQueryType(queryType) {
    console.log("queryType ", queryType);
    // var tableRows = document.querySelectorAll("#queryLogTableBody tr");
    if (queryType === "ALL") {
        for (var i = 0; i < tableRows.length; i++) {
            tableRows[i].style.display = "";
        }
    } else if (queryType === "SELECT" || queryType === "select") {
        // var typeColumn = tableRows[i].querySelector("td")[1]; // Type 열은 두 번째 열에 해당
        console.log("typeColumn", typeColumn);
        for (var i = 0; i < tableRows.length; i++) {
            if (typeColumn) {
                tableRows[i].style.display = "";
            } else {
                tableRows[i].style.display = "none";
            }
        }
    }
    for (var i = 0; i < tableRows.length; i++) {
        var typeColumn = tableRows[i].querySelector("td:nth-child(2)"); // Type 열은 두 번째 열에 해당
        if (typeColumn) {
            if (queryType === "ALL" || queryType === typeIcon) {
                tableRows[i].style.display = "";
            } else if (queryType === "SELECT") {
                tableRows[i].style.display = "";
            } else {
                tableRows[i].style.display = "none";
            }
        }
    }
}

// 드롭다운 항목 클릭 시 호출되는 함수
function onQueryTypeSelected(queryType) {
    document.getElementById("queryDropdown").innerText = queryType;
    filterTableByQueryType(queryType);
}

// 각 드롭다운 항목에 이벤트 리스너 추가
var dropdownItems = document.querySelectorAll(".queryDropdownItem");
dropdownItems.forEach(function (item) {
    item.addEventListener("click", function () {
        onQueryTypeSelected(item.textContent);
    });
});

const selectAllCheckbox = document.getElementById("selectAllCheckbox");
// 전체 선택 체크박스 클릭 시 모든 개별 체크박스 선택/해제
selectAllCheckbox.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(".logCheckBox");
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
});



logDeleteButton.addEventListener("click", function () {
    const selectAllCheckbox = document.getElementById("selectAllCheckbox");
    selectAllCheckbox.checked = false;
    const checkedCheckboxIds = [];

    const checkboxes = document.querySelectorAll('.logCheckBox');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCheckboxIds.push(checkbox.parentNode.parentNode.id);
        }
    });

    fetch('/query/log/delete', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            "delete_query_id": checkedCheckboxIds
        })
    })
        .then(response => response.json())
        .then(data => {
            checkedCheckboxIds.forEach(rowID => {
                var rowToDelete = document.getElementById(rowID);

                if (rowToDelete) {
                    rowToDelete.remove();
                }
            });
        })
        .catch(error => {
            console.error('Fetch 오류: ', error);
        })
});

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

