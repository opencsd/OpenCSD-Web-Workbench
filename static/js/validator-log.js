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
        var storageType = document.getElementById("storageTypeInfo");

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
        if(storageType = "CSD"){
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
            <button class="btn btn-link p-0 ssd_btn queryLogDetailClass">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </button>
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
        dummyButtonCell.addEventListener('click', function() {dummyButtonCellEventHandler(dummyButtonCell)});
    });
}

function dummyButtonCellEventHandler(buttonCell){
    if (popover) {
        popover.dispose(); // 기존 팝업 제거
    }
    popover = new bootstrap.Popover(buttonCell, {
        container: 'body',
        placement: 'right',
        trigger: 'manual',
        html: true,
        content: function () {
            const popoverContent = document.createElement('div');
            popoverContent.classList.add('text-center');
            popoverContent.style.maxWidth = '200px';

            const LogButton = document.createElement('button');
            LogButton.setAttribute('type', 'button');
            LogButton.classList.add('btn', 'btn-azure', 'd-block', 'mr-2');
            LogButton.style.padding = '5px';
            LogButton.style.width = '80px';
            LogButton.textContent = 'LOG';
            LogButton.addEventListener('click', function () {
                modalContentsLoad(buttonCell.id);
                popover.hide();
            });

            const SnippetButton = document.createElement('button');
            SnippetButton.setAttribute('type', 'button');
            SnippetButton.classList.add('btn', 'btn-azure', 'd-block');
            SnippetButton.style.padding = '5px';
            SnippetButton.style.width = '80px';
            SnippetButton.style.marginBottom = '5px';
            SnippetButton.textContent = 'SNIPPET';
            SnippetButton.addEventListener('click', function () {
                // 스니펫 테이블
                validationLogSnippetLoad(buttonCell.id);
                
                // 스캔 필터 비율 차트
                // var dataArray = [scannedRows, filteredRows];
                // ScanFilterChartOption.series[0].data = dataArray;
                // var ScanFilterChart = new ApexCharts(document.querySelector("#ScanFilterChart"), ScanFilterChartOption);
                // ScanFilterChart.render();
                // popover.hide()

            });

            const MetricButton = document.createElement('button');
            MetricButton.setAttribute('type', 'button');
            MetricButton.classList.add('btn', 'btn-azure', 'd-block', 'mr-2');
            MetricButton.style.padding = '5px';
            MetricButton.style.width = '80px';
            MetricButton.style.marginBottom = '5px';
            MetricButton.textContent = 'METRIC';
            MetricButton.addEventListener('click', function () {
                modalContentsLoad(buttonCell.id);
                popover.hide();
            });

            popoverContent.appendChild(SnippetButton);
            popoverContent.appendChild(MetricButton);
            popoverContent.appendChild(LogButton);

            return popoverContent;
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
        });
        popover.show();
}

const validatorLogTableBody = document.getElementById("validatorLogTableBody");
const validatorLogPrevBtn = document.getElementById("validatorLogPrevBtn");
const validatorLogNextBtn = document.getElementById("validatorLogNextBtn");

// 스니펫 모달 내용 로드
function validationLogSnippetLoad(validationID) {
    console.log("Snippet Modal Pop, Validation ID :", validationID)
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