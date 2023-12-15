// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

let intervalId;
var hostServerCPUChart, hostServerCPUChartData;
var hostServerPowerChart, hostServerPowerChartData;
var timestamps;

//임시값들----
var tempCPUUpdate = [1,3.5,6.2,6.3,4.5];
var tempPowerUpdate = [74,100,115,120,115];
var clicked = false;
let tempNum = 0;
let temp = true;
//------------

// /query/run 으로 받은 쿼리 결과 데이터
let scanned_row_count;
let filtered_row_count;
let filter_ratio;
let ExecutionTime;
let executionQueryID;
//------------

// console.log(storeduserInfo)

document.addEventListener("DOMContentLoaded", function () {
    hostServerCPUChart = new ApexCharts(document.getElementById("queryHostServerCPU"), hostServerCPUChartOption);
    hostServerPowerChart = new ApexCharts(document.getElementById("queryHostServerPower"), hostServerPowerChartOption);

    hostServerCPUChart.render();
    hostServerPowerChart.render();

    viewUserID();
    updateLatestChart();
    startInterval();
    getEnvironmentInfo();
});

// 유저 아이디 
function viewUserID(){
    const user_id = document.getElementById("user_info");
    user_id.textContent = "User : " + storeduserInfo.workbench_user_id;
}

// 쿼리 환경 정보 가져오기
function getEnvironmentInfo() {
    const dbnameArea = document.getElementById("dbname");
    const dbmsArea = document.getElementById("dbms");
    const csdCountArea = document.getElementById("csd_count");
    const csdTypeArea = document.getElementById("csd_type");
    const dbmsSizeArea = document.getElementById("dbms_size");
    const blockCountArea = document.getElementById("block_count");
    const AgorithmArea = document.getElementById("algorithm");
    const indexArea = document.getElementById("index");

    fetch('/query/environment')
        .then(response => response.json())
        .then(data => {
            dbnameArea.textContent = data.db_name.toUpperCase();
            dbmsArea.textContent = data.dbms_type.toUpperCase();
            csdCountArea.textContent = data.csd_count;
            csdTypeArea.textContent = data.csd_type.toUpperCase();
            dbmsSizeArea.textContent = data.db_size + " (GB)";
            blockCountArea.textContent = data.block_count;
            AgorithmArea.textContent = data.scheduling_algorithm.toUpperCase();
            if (data.using_index == 0) {
                indexArea.textContent = "Not Use";
            }
            else {
                indexArea.textContent = "Use";
            }
            
        })
        .catch(error => {
            console.error('Fetch 오류: ', error);
        });
}


// 쿼리 전체 로그 불러오기
function getQueryLogAll() {
    var query_type = "all";

    fetch('/query/get-all', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            "user_id": storeduserInfo.workbench_user_id,
            "query_type": query_type
        })
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(function(item) {
            const newRow = document.createElement("tr");
            const checkboxCell = document.createElement("td");
            checkboxCell.style.width = "5%";
            checkboxCell.style.textAlign = "center";
            const typeCell = document.createElement("td");
            typeCell.style.width = "5%";
            typeCell.style.textAlign = "center";
            const queryIDCell = document.createElement("td");
            queryIDCell.style.width = "1%";
            const queryCell = document.createElement("td");
            queryCell.style.width = "30%";
            const progressBarCells = [];
            const dummyButtonCell = document.createElement("td");
            dummyButtonCell.style.width = "5%";
        })
    })
}

//쿼리 수행 완료 후 쿼리 도는동안의 차트값 그래프 보여주는 함수
function updateQueryChart(){
    hostServerCPUChart.updateOptions({
        series: [{
            name: "cpu",
            data: hostServerCPUChartData
            }
        ],
        xaxis: {
            categories: timestamps
        }
    });

    hostServerPowerChart.updateOptions({
        series: [{
            name: "power",
            data: hostServerPowerChartData
        }
        ],
        xaxis: {
        categories: timestamps
        }
    });
}

function updateLatestChart(){
    //그래프 실시간 업데이트 하는 함수
    let timestamp = [];
    let cpu_usage = [];
    let power_usage = [];
    fetch('/query/metric')
        .then(response => response.json())
        .then(data => {
            data.reverse().forEach(item => {
                var date = new Date(item.time);
                var time = date.getHours()+":"+date.getSeconds();
                timestamp.push(time);
                cpu_usage.push((item.cpu_usage)/1000000);
                power_usage.push(item.power_usage);
            });
            hostServerCPUChart.updateOptions({
                series: [{
                    name: "cpu",
                    data: cpu_usage
                    }
                ],
                xaxis: {
                    categories: timestamp
                }
            });
        
            hostServerPowerChart.updateOptions({
                series: [{
                    name: "power",
                    data: power_usage
                }
                ],
                xaxis: {
                categories: timestamp
                }
            });
        })

    
}


function startInterval(){
    intervalId = setInterval(getLatestChartData,5000);
}


function startInterval(){
    intervalId = setInterval(updateLatestChart,3000);//메트릭 업데이트 주기 설정
}

const environmentInfoTab = document.getElementById("environmentInfoTab");
const dbSchemaTab = document.getElementById("dbSchemaTab");

const environmentInfoContainer = document.getElementById("environmentInfoContainer");
const dbSchemaContainer = document.getElementById("dbSchemaContainer");
const envSetting = document.getElementById("envSetting");

environmentInfoTab.addEventListener("click", function() {
    environmentInfoTab.classList.add("active");
    dbSchemaTab.classList.remove("active");

    environmentInfoContainer.style.display = "block";
    dbSchemaContainer.style.display = "none";
    envSetting.style.display = "block";
});

dbSchemaTab.addEventListener("click", function() {
    environmentInfoTab.classList.remove("active");
    dbSchemaTab.classList.add("active");

    environmentInfoContainer.style.display = "none";
    dbSchemaContainer.style.display = "block";
    envSetting.style.display = "none";
});

// 실시간 메트릭 수집 시작/일시정지 버튼
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
        metricViewPlayIcon.style.display = 'none';
        metricViewPauseIcon.style.display = 'inline';
        startInterval();
    }
    isMetricViewBtnClicked = !isMetricViewBtnClicked;
});


// 환경 설정 모달 동작
var selected_csdkind = $("#query_csdkind");
var SetCsdCount = $("#query_SetCsdCount");
var SetBlockCount = $("#query_SetBlockCount");
var scheduling_algorithm = $("#query_scheduling");
var using_index = $("#query_index");

$("#query-csdSelect").on("change", function() {
    if ($(this).is(":checked")){
        console.log("CSD Checked")
        selected_csdkind.prop('disabled', false)
        SetCsdCount.prop('disabled', false)
        SetBlockCount.prop('disabled', false)
        using_index.prop('disabled', false)
        scheduling_algorithm.prop('disabled', false)
    }
});
$("#query-ssdSelect").on("change", function() {
    if ($(this).is(":checked")){
        console.log("SSD Checked")
        selected_csdkind.prop('disabled', true)
        SetCsdCount.prop('disabled', true)
        SetBlockCount.prop('disabled', true)
        using_index.prop('disabled', true)
        scheduling_algorithm.prop('disabled', true)
    }
});

envSetting.addEventListener('click', function() {
    envSettingmodalLoad()
});

function envSettingmodalLoad(){
    $(function() {
        $("#envSettingModal").modal("show");
        var modalDiv = $('#envSettingModal');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
}


// 쿼리 Run 동작
const resultContainer = document.getElementById("resultContainer");
const metricContainer = document.getElementById("metricContainer");
const spinnerContainer = document.getElementById("loading");

document.getElementById("pushdownButton").addEventListener("click", function () {
    // 실행한 TPC-H 쿼리 이름
    const run_query = dropdownToggle.textContent
    // Post 요청 시 서버에 보낼 json 데이터
    var post_data = {
        query: run_query,
        user_id: storeduserInfo.workbench_user_id
    }
    // 쿼리 수행 중 로딩 화면
    spinnerContainer.style.display = "flex";
    document.getElementById("loading-metric").style.display = "flex";
    resultContainer.style.display = "none";
    metricContainer.style.display = "none";  

    const metrictable1 = document.querySelector('td.qtable_1');
    const metrictable2 = document.querySelector('td.qtable_2');
    const metrictable3 = document.querySelector('td.qtable_3');
    const metrictable4 = document.querySelector('td.qtable_4');
    const metrictable5 = document.querySelector('td.qtable_5');

    hostServerCPUChartData = [];
    hostServerPowerChartData = [];
    timestamps = [];
    var count = 0;

    fetch('/query/run', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(post_data)
    })
    .then(response => {
        spinnerContainer.style.display = 'none'
        document.getElementById("loading-metric").style.display = "none";
        resultContainer.style.display = "block";
        metricContainer.style.display = "block";
        return response.json();
    })
    .then(data => {
        metrictable1.textContent = data.query_result.scanned_row_count + " (line)";
        metrictable2.textContent = data.query_result.filtered_row_count + " (line)";
        scanned_row_count = data.query_result.scanned_row_count;
        filtered_row_count = data.query_result.filtered_row_count;
        executionQueryID = data.query_result.query_id;

        let f_ratio = (data.query_result.filtered_row_count / data.query_result.scanned_row_count) * 100;
        filter_ratio = f_ratio.toFixed(2);
        metrictable3.textContent = filter_ratio + " (%)";

        let queryStart = new Date(data.query_result.start_time);
        let queryEnd = new Date(data.query_result.end_time);
        let queryTime = queryEnd - queryStart;
        ExecutionTime = queryTime / 1000;
        metrictable4.textContent = ExecutionTime + " (sec)";
        metrictable5.textContent = data.query_result.snippet_count;

        document.getElementById("queryResult").value = data.query_result.query_result;

        data.query_metric.forEach(item => {
            hostServerCPUChartData.push(item.cpu_usage);
            hostServerPowerChartData.push(item.power_usage);
            timestamps.push(item.time);
            count++;
        })
        updateQueryChart();
        addNewQueryLog();
    })
    .catch(error => {
        console.error('Fetch 오류: ', error);
    })

    metricViewPlayIcon.style.display = 'inline';
    metricViewPauseIcon.style.display = 'none';

    isMetricViewBtnClicked = false;
    
    clearInterval(intervalId);
    
});


// TPCH 쿼리 드롭다운
const queryNumbers = Array.from({ length: 22 }, (_, i) => i + 1);
const dropdownMenu = document.querySelector(".dropdown-menu");
const queryTextArea = document.getElementById("queryTextarea");
const dropdownToggle = document.getElementById("dropdownToggle");
const runQueryNum = ""

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
const queryResultArea = document.getElementById("queryResult");
newQueryButton.addEventListener("click", function() {
    const metrictable = document.querySelectorAll('#metrictable tbody td');
    metrictable.forEach((cell) => {
        cell.textContent = '-';
    })
    queryTextArea.value = "";
    queryResultArea.value = "";

    updateLatestChart();
    startInterval();
});
