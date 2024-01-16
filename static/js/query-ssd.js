// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

let intervalId;
var hostServerCPUChart, hostServerCPUChartData;
var hostServerPowerChart, hostServerPowerChartData;
var hostServerChartCategories;

document.addEventListener("DOMContentLoaded", function () {
    hostServerCPUChart = new ApexCharts(document.getElementById("queryHostServerCPU"), hostServerCPUChartOption);
    hostServerPowerChart = new ApexCharts(document.getElementById("queryHostServerPower"), hostServerPowerChartOption);

    hostServerCPUChart.render();
    hostServerPowerChart.render();

    viewUserID();
    getEnvironmentInfo();
    getLatestChartData();
    startInterval();
});

// 유저 아이디 
function viewUserID(){
    const user_id = document.getElementById("user_info");
    user_id.textContent = "User : " + storeduserInfo.workbench_user_id;
}

const dbName = document.getElementById("dbName");
const dbms = document.getElementById("dbms");
const dbSize = document.getElementById("dbSize");
const storageType = document.getElementById("storageType");

// 쿼리 환경 정보 가져오기
function getEnvironmentInfo() {
    fetch('/query-ssd/environment')
        .then(response => response.json())
        .then(data => {
            dbName.textContent = data.db_name;
            dbms.textContent = data.dbms_type;
            dbSize.textContent = data.db_size + "(MB)";
            storageType.textContent = data.storage_type;
        })
        .catch(error => {
            console.error('Fetch 오류: ', error);
        });
}

function getLatestChartData(){
    fetch('/query-ssd/metric', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
    })
    .then(response => response.json())
    .then(data => updateChartData(data))
}

function updateChartData(data){
    hostServerCPUChartData = [];
    hostServerPowerChartData = [];
    hostServerChartCategories = [];

    data.reverse().forEach(function(item) {
        hostServerCPUChartData.push(item.cpu_usage_tick);
        hostServerPowerChartData.push(item.power_usage);
        var date = new Date(item.time);
        var hour = date.getHours();
        var minute = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        var formattedHour = hour < 10 ? '0' + hour : hour;
        var formattedMinute = minute < 10 ? '0' + minute : minute;
        var time = formattedHour+":"+formattedMinute+":"+formattedSeconds;
        hostServerChartCategories.push(time);
    })

    drawChart();
}

function drawChart(){
    hostServerCPUChart.updateOptions({
        series: [{
            name: "cpu",
            data: hostServerCPUChartData
            }
        ],
        xaxis: {
            categories: hostServerChartCategories
        }
    });

    hostServerPowerChart.updateOptions({
        series: [{
            name: "power",
            data: hostServerPowerChartData
        }
        ],
        xaxis: {
            categories: hostServerChartCategories
        }
    });
}

function startInterval(){
    intervalId = setInterval(getLatestChartData,5000);
}

const environmentInfoTab = document.getElementById("environmentInfoTab");
const dbSchemaTab = document.getElementById("dbSchemaTab");

const environmentInfoContainer = document.getElementById("environmentInfoContainer");
const dbSchemaContainer = document.getElementById("dbSchemaContainer");

environmentInfoTab.addEventListener("click", function() {
    environmentInfoTab.classList.add("active");
    dbSchemaTab.classList.remove("active");

    environmentInfoContainer.style.display = "block";
    dbSchemaContainer.style.display = "none";
});

dbSchemaTab.addEventListener("click", function() {
    environmentInfoTab.classList.remove("active");
    dbSchemaTab.classList.add("active");

    environmentInfoContainer.style.display = "none";
    dbSchemaContainer.style.display = "block";
});

const metricViewBtn = document.getElementById('metricViewBtn');
const metricViewPlayIcon = document.getElementById('metricViewPlayIcon');
const metricViewPauseIcon = document.getElementById('metricViewPauseIcon');
let isMetricViewBtnClicked = true;

metricViewBtn.addEventListener('click', () => {    
    if (isMetricViewBtnClicked) {
        metricViewPlayIcon.style.display = 'inline';
        metricViewPauseIcon.style.display = 'none';
        clearInterval(intervalId);
    } else {
        getLatestChartData();
        metricViewPlayIcon.style.display = 'none';
        metricViewPauseIcon.style.display = 'inline';
        startInterval();
    }
    isMetricViewBtnClicked = !isMetricViewBtnClicked;
});

function logClickEvent(queryCell){
    if(queryCell.clicked){
        queryCell.style.backgroundColor="#fcfdfe";
        logDeactivateEvent(queryCell.id);
    }else{
        queryCell.style.backgroundColor="#f6f8fb";
        logActivateEvent(queryCell.id);
    }
    queryCell.clicked = !queryCell.clicked;
}

function logActivateEvent(validationID){
    fetch('/validator/log/get-one', { //html 화면 내에서 가져올 수 있을듯
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            'user_id': storeduserInfo.workbench_user_id,
            'validation_id': validationID
        })
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        updateChartData(data[0]);
        drawChart();
        updateOptionTableData(validationID,data[0].option_id);
        queryTextArea.value = data[0].query_statement;
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    })
}

function logDeactivateEvent(validationID){
    deleteFromChart(validationID);
    drawChart();
    drawOptionTable();
}

// 쿼리 Run 동작
const resultContainer = document.getElementById("resultContainer");
const metricContainer = document.getElementById("metricContainer");
const spinnerContainer = document.querySelectorAll(".spinnerContainer");
const executionTimeTable = document.querySelector('td.qtable_1');
const queryResultArea = document.getElementById("queryResult");
const queryTextArea = document.getElementById("queryTextarea");
const runButton = document.getElementById("runButton");

runButton.addEventListener("click", function () {
    runButton.disabled = true;

    if (!isMetricViewBtnClicked) {
        getLatestChartData();
        metricViewPlayIcon.style.display = 'none';
        metricViewPauseIcon.style.display = 'inline';
        startInterval();
        isMetricViewBtnClicked = !isMetricViewBtnClicked;
    }

    var query = queryTextArea.value;

    var post_data = {
        query: query
    }

    spinnerContainer.forEach((icon) => {
        icon.style.display = "flex";
    });
    resultContainer.style.display = "none";
    metricContainer.style.display = "none";  

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
        spinnerContainer.forEach((icon) => {
            icon.style.display = "none";
        });
        resultContainer.style.display = "block";
        metricContainer.style.display = "block";
        return response.json();
    })
    .then(data => {
        clearInterval(intervalId);

        executionTimeTable.textContent = data.execution_time;//이거 형식좀
        queryResultArea.value = data.result;

        metricViewPlayIcon.style.display = 'inline';
        metricViewPauseIcon.style.display = 'none';
    
        isMetricViewBtnClicked = false;
        runButton.disabled = false;

        updateChartData(data.query_metric);
    })
    .catch(error => {
        console.error('Fetch 오류: ', error);
    })
});

// TPCH 쿼리 드롭다운
const queryNumbers = Array.from({ length: 22 }, (_, i) => i + 1);
const dropdownMenu = document.querySelector(".dropdown-menu");
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
newQueryButton.addEventListener("click", function() {
    queryTextArea.value = "";
    queryResultArea.value = "";
    executionTimeTable.textContent = "";

    if (!isMetricViewBtnClicked) {
        getLatestChartData();
        metricViewPlayIcon.style.display = 'none';
        metricViewPauseIcon.style.display = 'inline';
        startInterval();
        isMetricViewBtnClicked = !isMetricViewBtnClicked;
    }
});
