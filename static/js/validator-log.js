let popover;
var maxList = {
    "cpuMax" : 0,
    "powerMax" : 0,
    "networkMax" : 0,
    "timeMax" : 0,
}

function addValidatorLog(data){
    data.forEach(function(result){
        const queryLogTableBody = document.getElementById("validatorLogTableBody");

        var query = result.query_statement;
        var shortenedQuery = query.length > 40 ? query.slice(0, 50) + "..." : query;
        // var storageType = document.getElementById("storageTypeInfo");

        const newRow = document.createElement("tr");

        const checkboxCell = document.createElement("td");
        checkboxCell.style.width = "5%";
        checkboxCell.innerHTML = `<input type="checkbox" class="form-check-input" name="form-type[]" value="2">`;

        const queryIDCell = document.createElement("td");
        queryIDCell.style.width = "1%";
        queryIDCell.style.textAlign = "center";
        queryIDCell.textContent = result.validation_id;

        const modeIconCell = document.createElement("td");
        modeIconCell.style.width = "5%";
        modeIconCell.style.textAlign = "center";
        if(result.option_id == 0){
            modeIconCell.innerHTML = `<div><img src="../static/image/free-icon-letter-c.png" width="20" height="20"/></div>`;
        }else{//SSD Option 조건일 경우
            modeIconCell.innerHTML = `<div><img src="../static/image/free-icon-letter-s.png" width="20" height="20"/></div>`;
        }

        const queryCell = document.createElement("td");
        queryCell.style.width = "30%";
        queryCell.style.backgroundColor = "#fcfdfe";
        queryCell.textContent = `${shortenedQuery}`;
        queryCell.id = result.validation_id;
        queryCell.clicked = false;
        queryCell.addEventListener('click', function() {logClickEvent(queryCell)});
        queryCell.addEventListener("mouseover", function() {queryCell.style.backgroundColor="#f6f8fb"});
        queryCell.addEventListener("mouseout", function() {queryCell.style.backgroundColor="#fcfdfe"});

        const progressBarCells = [];
        for (let i = 0; i < 4; i++) {
            //response로 받은 결과 데이터 넣기(cpu,power,network,time)
            const progressBarCell = document.createElement("td");
            progressBarCell.style.width = "12%";

            let value, max, width;

            if(i==0){//cpu
                value = result.storage_cpu_usage_predict;
                if(maxList.cpuMax < value){
                    maxList.cpuMax = value;

                    var tbody = document.getElementById("validatorLogTableBody");
                    var trList = tbody.getElementsByTagName('tr');
                    for (var j = 0; j < trList.length; j++) {
                        var tdList = trList[j].getElementsByTagName('td');
                        var tdValue = tdList[4].querySelector('.progress-bar').ariaValueNow;
                        tdList[4].querySelector('.progress-bar').style.width = (tdValue / maxList.cpuMax) * 100 + "%";
                        tdList[4].querySelector('.progress-bar').ariaValueMax = maxList.cpuMax;
                    }
                }
                max = maxList.cpuMax;
            }else if(i==1){//power
                value = result.storage_power_usage_predict;
                if(maxList.powerMax < value){
                    maxList.powerMax = value;

                    var tbody = document.getElementById("validatorLogTableBody");
                    var trList = tbody.getElementsByTagName('tr');
                    for (var j = 0; j < trList.length; j++) {
                        var tdList = trList[j].getElementsByTagName('td');
                        var tdValue = tdList[5].querySelector('.progress-bar').ariaValueNow;
                        tdList[5].querySelector('.progress-bar').style.width = (tdValue / maxList.cpuMax) * 100 + "%";
                        tdList[5].querySelector('.progress-bar').ariaValueMax = maxList.cpuMax;
                    }
                }
                max = maxList.powerMax;
            }else if(i==2){//network
                value = result.network_usage_predict;
                if(maxList.networkMax < value){
                    maxList.networkMax = value;

                    var tbody = document.getElementById("validatorLogTableBody");
                    var trList = tbody.getElementsByTagName('tr');
                    for (var j = 0; j < trList.length; j++) {
                        var tdList = trList[j].getElementsByTagName('td');
                        var tdValue = tdList[6].querySelector('.progress-bar').ariaValueNow;
                        tdList[6].querySelector('.progress-bar').style.width = (tdValue / maxList.cpuMax) * 100 + "%";
                        tdList[6].querySelector('.progress-bar').ariaValueMax = maxList.cpuMax;
                    }
                }
                max = maxList.networkMax;
            }else if(i==3){//time
                value = result.execution_time_predict;
                if(maxList.timeMax < value){
                    maxList.timeMax = value;

                    var tbody = document.getElementById("validatorLogTableBody");
                    var trList = tbody.getElementsByTagName('tr');
                    for (var j = 0; j < trList.length; j++) {
                        var tdList = trList[j].getElementsByTagName('td');
                        var tdValue = tdList[7].querySelector('.progress-bar').ariaValueNow;
                        tdList[7].querySelector('.progress-bar').style.width = (tdValue / maxList.cpuMax) * 100 + "%";
                        tdList[7].querySelector('.progress-bar').ariaValueMax = maxList.cpuMax;
                    }
                }
                max = maxList.timeMax;
            }

            width = (value / max) * 100;

            progressBarCell.innerHTML = `
                <div class="progress">
                    <div class="progress-bar" style="width: ${width}%" role="progressbar" aria-valuenow="${value}"
                        aria-valuemin="0" aria-valuemax="${max}" aria-label="${value}% Complete">
                    </div>
                </div>
                <div style="text-align:center">
                    <h6 style="margin-top:5px; margin-bottom:0px;">${value}</h6>
                </div>
            `;
            progressBarCells.push(progressBarCell);
        }

        const dummyButtonCell = document.createElement("td");
        dummyButtonCell.style.width = "5%";
        dummyButtonCell.id = result.validation_id;
        dummyButtonCell.innerHTML = `
            <span class="btn btn-link p-0 ssd_btn queryLogDetailClass" data-bs-toggle="popover" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </span>
        `;
        
        newRow.appendChild(checkboxCell);
        newRow.appendChild(queryIDCell);
        newRow.appendChild(modeIconCell);
        newRow.appendChild(queryCell);
        for (let i = 0; i < 4; i++) {
            newRow.appendChild(progressBarCells[i]);
        }
        newRow.appendChild(dummyButtonCell);

        queryLogTableBody.appendChild(newRow);

        //쿼리 로그 클릭 이벤트 발생 시 모달 로드
        dummyButtonCell.addEventListener('click', function() {
            dummyButtonCellEventHandler(dummyButtonCell)});
    });
}

function dummyButtonCellEventHandler(dummyButtonCell){
    if (popover) {
        popover.dispose(); // 기존 팝업 제거
    }
    popover = new bootstrap.Popover(dummyButtonCell, {
        container: 'body',
        placement: 'right',
        trigger: 'manual',
        html: true,
        content: function () {
            const popoverContent = document.createElement('div');
            popoverContent.classList.add('text-center');
            popoverContent.style.maxWidth = '200px';

            // 로그 버튼
            const LogButton = document.createElement('button');
            LogButton.setAttribute('type', 'button');
            LogButton.classList.add('btn', 'btn-azure', 'd-block', 'mr-2');
            LogButton.style.padding = '5px';
            LogButton.style.width = '80px';
            LogButton.textContent = 'LOG';
            LogButton.addEventListener('click', function () {
                modalContentsLoad(dummyButtonCell.id);
                popover.hide();
            });

            // 스니펫 버튼
            const SnippetButton = document.createElement('button');
            SnippetButton.setAttribute('type', 'button');
            SnippetButton.classList.add('btn', 'btn-azure', 'd-block');
            SnippetButton.style.padding = '5px';
            SnippetButton.style.width = '80px';
            SnippetButton.style.marginBottom = '5px';
            SnippetButton.textContent = 'SNIPPET';
            SnippetButton.addEventListener('click', function () {
                validationLogSnippetLoad(dummyButtonCell.id);
                popover.hide()

            });

            // 메트릭 버튼
            const MetricButton = document.createElement('button');
            MetricButton.setAttribute('type', 'button');
            MetricButton.classList.add('btn', 'btn-azure', 'd-block');
            MetricButton.style.padding = '5px';
            MetricButton.style.width = '80px';
            MetricButton.style.marginBottom = '5px';
            MetricButton.textContent = 'METRIC';
            MetricButton.addEventListener('click', function () {
                validationLogMetricLoad(dummyButtonCell.id);
                // 메트릭 차트 넣기
                popover.hide();
            });

            popoverContent.appendChild(SnippetButton);
            popoverContent.appendChild(MetricButton);
            popoverContent.appendChild(LogButton);

            return popoverContent;
        }
    }),
    popover.show();
}

const validatorLogTableBody = document.getElementById("validatorLogTableBody");
const validatorLogPrevBtn = document.getElementById("validatorLogPrevBtn");
const validatorLogNextBtn = document.getElementById("validatorLogNextBtn");

// 스니펫 모달 내용 로드
function validationLogSnippetLoad(validationID) {
    console.log("Snippet Modal Pop, Validation ID :", validationID)
    const logSnippetTableBody = document.getElementById("logSnippetTableBody");
    // 웹 서버와 연결해서 스니펫 테이블 채우기
    fetch('/validator/snippet', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({validation_id: validationID})
    })
        .then(response => response.json())
        .then(data => {
            logSnippetTableBody.innerHTML = ``;

            data.forEach(function (item) {
                const SnippetRow = document.createElement("tr");
                const WIDCell = document.createElement("td");
                WIDCell.style.width = "10%";
                WIDCell.style.textAlign = "center";
                const TypeCell = document.createElement("td");
                TypeCell.style.width = "20%";
                TypeCell.style.textAlign = "center";
                const ProjectionCell = document.createElement("td");
                ProjectionCell.style.width = "10%";
                ProjectionCell.style.textAlign = "center";
                const FilterCell = document.createElement("td");
                FilterCell.style.width = "10%";
                FilterCell.style.textAlign = "center";
                const OrderCell = document.createElement("td");
                OrderCell.style.width = "10%";
                OrderCell.style.textAlign = "center";
                const GroupCell = document.createElement("td");
                GroupCell.style.width = "10%";
                GroupCell.style.textAlign = "center";
                const LimitCell = document.createElement("td");
                LimitCell.style.width = "10%";
                LimitCell.style.textAlign = "center";

                WIDCell.textContent = item.work_id;
                // TypeCell.textContent = item.snippet_type;
                switch(item.snippet_type) {
                    case 0:
                        TypeCell.textContent = "CSD_SCAN_SNIPPET";
                        break;
                    case 1:
                        TypeCell.textContent = "AGGREGATION_SNIPPET";
                        break;
                    case 2:
                        TypeCell.textContent = "STORAGE_FILTER_SNIPPET";
                        break;
                    case 3:
                        TypeCell.textContent = "INNER_JOIN_SNIPPET";
                        break;
                    case 4:
                        TypeCell.textContent = "LEFT_OUTER_JOIN_SNIPPET";
                        break;
                    case 5:
                        TypeCell.textContent = "RIGHT_OUTER_JOIN_SNIPPET";
                        break;
                    case 6:
                        TypeCell.textContent = "CROSS_JOIN_SNIPPET";
                        break;
                    case 7:
                        TypeCell.textContent = "UNION_SNIPPET";
                        break;
                    case 8:
                        TypeCell.textContent = "IN_SNIPPET";
                        break;
                    case 9:
                        TypeCell.textContent = "DEPENDENCY_INNER_JOIN_SNIPPET";
                        break;
                    case 10:
                        TypeCell.textContent = "DEPENDENCY_EXIST_SNIPPET";
                        break;
                    case 11:
                        TypeCell.textContent = "DEPENDENCY_IN_SNIPPET";
                        break;
                    default:
                        TypeCell.textContent = "ERROR";
                }
                ProjectionCell.textContent = item.projection_count;
                FilterCell.textContent = item.filter_count;
                OrderCell.textContent = item.order_by_count;
                GroupCell.textContent = item.group_by_count;
                LimitCell.textContent = item.limit_exist;

                SnippetRow.appendChild(WIDCell);
                SnippetRow.appendChild(TypeCell);
                SnippetRow.appendChild(ProjectionCell);
                SnippetRow.appendChild(FilterCell);
                SnippetRow.appendChild(OrderCell);
                SnippetRow.appendChild(GroupCell);
                SnippetRow.appendChild(LimitCell);

                logSnippetTableBody.appendChild(SnippetRow);
            })
        })
        .catch(console.error(error => console.error('Error: ', error)));

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
        document.getElementById("validationQuery").value = data[0].query_statement;
    })
    .catch(console.error(error => console.error('Error: ', error)));

    $(function () {
        $("#snippetModal").modal("show");
        var modalDiv = $('#snippetModal');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
}

// 메트릭 모달 내용 로드
function validationLogMetricLoad(validationID) {
    console.log("Metric Modal Pop, Validation ID :", validationID)
    const MetricTableBody = document.getElementById("MetricTableBody");
    const cpuRow = document.createElement("tr");
    const powerRow = document.createElement("tr");

    const cpuCell = document.createElement("td");
    cpuCell.style.width = "15%";
    cpuCell.style.textAlign = "center";
    cpuCell.textContent = `CPU (tick)`

    const powerCell = document.createElement("td");
    powerCell.style.width = "15%";
    powerCell.style.textAlign = "center";
    powerCell.textContent = `Power (W)`

    cpuRow.appendChild(cpuCell)
    powerRow.appendChild(powerCell)

    var storageCPU;
    var storagePower;

    var csdCPUTotal;
    var csdPowerTotal;

    MetricTableBody.innerHTML = ``;

    var HostCSDCPUChart = new ApexCharts(document.querySelector("#HostCSDCPU"), HostCSDCPUChartOption);
    HostCSDCPUChart.render();

    fetch('/validator/metric/getAll', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({validation_id: validationID})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)

        var csdCpuArr = [];
        var csdPowerArr = [];
        
        data.result2.forEach(function (item) {
            csdCpuArr.push(item.csd_cpu_usage_predict);
            csdPowerArr.push(item.csd_power_usage_predict);
        })
        csdCPUTotal = csdCpuArr.reduce((acc, curr) => acc + curr, 0);
        csdCPUTotal = csdCPUTotal.toFixed(2);
        csdPowerTotal = csdPowerArr.reduce((acc, curr) => acc + curr, 0);
        csdPowerTotal = csdPowerTotal.toFixed(2);

        var CpuTotal = parseFloat(data.result1[0].storage_cpu_usage_predict) + parseFloat(csdCPUTotal);
        var PowerTotal = parseFloat(data.result1[0].storage_power_usage_predict) + parseFloat(csdPowerTotal);

        const CPUTotalCell = document.createElement("td");
        CPUTotalCell.style.width = "10%";
        CPUTotalCell.style.textAlign = "center";
        CPUTotalCell.textContent = `${CpuTotal}`;
        cpuRow.appendChild(CPUTotalCell);

        const PowerTotalCell = document.createElement("td");
        PowerTotalCell.style.width = "10%";
        PowerTotalCell.style.textAlign = "center";
        PowerTotalCell.textContent = `${PowerTotal}`;
        powerRow.appendChild(PowerTotalCell);

        const HostCPUCell = document.createElement("td");
        HostCPUCell.style.width = "10%";
        HostCPUCell.style.textAlign = "center";
        HostCPUCell.textContent = `${data.result1[0].storage_cpu_usage_predict}`;
        cpuRow.appendChild(HostCPUCell);

        const HostPowerCell = document.createElement("td");
        HostPowerCell.style.width = "10%";
        HostPowerCell.style.textAlign = "center";
        HostPowerCell.textContent = `${data.result1[0].storage_power_usage_predict}`;
        powerRow.appendChild(HostPowerCell);

        const csdCPUTotalCell = document.createElement("td");
        csdCPUTotalCell.style.width = "10%";
        csdCPUTotalCell.style.textAlign = "center";
        csdCPUTotalCell.textContent = `${csdCPUTotal}`;
        cpuRow.appendChild(csdCPUTotalCell);

        const csdPowerTotalCell = document.createElement("td");
        csdPowerTotalCell.style.width = "10%";
        csdPowerTotalCell.style.textAlign = "center";
        csdPowerTotalCell.textContent = `${csdPowerTotal}`;
        powerRow.appendChild(csdPowerTotalCell);

        csdCpuArr.forEach(function (item) {
            const csdCPUCell = document.createElement("td");
            csdCPUCell.style.width = "10%";
            csdCPUCell.style.textAlign = "center";
            csdCPUCell.textContent = `${item}`;
            cpuRow.appendChild(csdCPUCell)
        })

        csdPowerArr.forEach(function (item) {
            const csdPowerCell = document.createElement("td");
            csdPowerCell.style.width = "10%";
            csdPowerCell.style.textAlign = "center";
            csdPowerCell.textContent = `${item}`;
            powerRow.appendChild(csdPowerCell)
        })

        MetricTableBody.appendChild(cpuRow);
        MetricTableBody.appendChild(powerRow);
    })
    .catch(console.error(error => console.error('Error: ', error)));
    
    


    $(function () {
        $("#metricModal").modal("show");
        var modalDiv = $('#metricModal');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
}




// 로그 모달 내용 로딩
function modalContentsLoad(validationID){
    console.log("LOG Modal Pop, Validation ID :", validationID)
    $(function() {
        var containerLog = document.getElementById("tab1");
        containerLog.innerHTML = validatorLog;
        $("#validatorModal").modal("show");
        var modalDiv = $('#validatorModal');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
}


//###모달 기능#####
// 1. 모달 닫기 
$("#closeLogModal").click(function () {
    $(function() {
        //컨테이너 로그 출력 데이터 초기화
        var containerLog = document.getElementById("tab1");
        containerLog.innerHTML = "";
        $("#validatorModal").modal("hide");
        var modalDiv = $('#validatorModal');
        modalDiv.modal({
            backdrop: false,
            show: false
        });
    });
});
// 2. 모달 드래그 
$(function () {
    $('.modal-dialog').draggable({
        handle: ".modal-header"
    });
});