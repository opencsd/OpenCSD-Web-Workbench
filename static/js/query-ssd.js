// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

// 유저 아이디 
function viewUserID(){
    const user_id = document.getElementById("user_info");
    user_id.textContent = "User : " + storeduserInfo.workbench_user_id;
}

let intervalId;
var hostServerCPUChart, hostServerCPUChartData, hostServerCPUChartCategories;
var hostServerPowerChart, hostServerPowerChartData, hostServerPowerChartCategories;

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
            dbSize.textContent = data.db_size + "(GB)";
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
    .then(data => updateLatestChart(data))
}

function updateLatestChart(data){
    hostServerCPUChartData = [];
    hostServerCPUChartCategories = [];
    hostServerPowerChartData = [];
    hostServerPowerChartCategories = [];

    data.reverse().forEach(function(item) {
        hostServerCPUChartData.push(item.cpu_usage / 1000000);
        var date = new Date(item.time);
        var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        hostServerCPUChartCategories.push(time);
        hostServerPowerChartData.push(item.power_usage);
        hostServerPowerChartCategories.push(time);
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
            categories: hostServerCPUChartCategories
        }
    });

    hostServerPowerChart.updateOptions({
        series: [{
            name: "power",
            data: hostServerPowerChartData
        }
        ],
        xaxis: {
            categories: hostServerPowerChartCategories
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

const resultContainer = document.getElementById("resultContainer");
const metricContainer = document.getElementById("metricContainer");
const spinnerContainer = document.querySelectorAll(".spinnerContainer");
const executionTimeTable = document.querySelector('td.qtable_1');
const queryResult = document.getElementById("queryResult");
const queryTextArea = document.getElementById("queryTextarea");

document.getElementById("pushdownButton").addEventListener("click", function () {
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
        executionTimeTable.textContent = data.execution_time;//이거 형식좀
        queryResult.value = data.result;

        hostServerCPUChartData = [];
        hostServerCPUChartCategories = [];
        hostServerPowerChartData = [];
        hostServerPowerChartCategories = [];

        data.query_metric.forEach(item => {
            hostServerCPUChartData.push(item.cpu_usage / 1000000);
            var date = new Date(item.time);
            var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
            hostServerCPUChartCategories.push(time);
            hostServerPowerChartData.push(item.power_usage);
            hostServerPowerChartCategories.push(time);
        })

        metricViewPlayIcon.style.display = 'inline';
        metricViewPauseIcon.style.display = 'none';
    
        isMetricViewBtnClicked = false;
    
        clearInterval(intervalId);

        drawChart();
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
    dropdownItem.textContent = `Q${number}`;
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
document.getElementById("newQuery").addEventListener("click", function() {
    queryTextArea.value = "";
});
