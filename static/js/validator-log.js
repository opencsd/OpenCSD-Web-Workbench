const queryHistory = [];

const rowsPerPage = 10;
let currentPage = 1;
let temp_id = 0;//임시
let popover;

function addValidatorLog(queryText,result){
    const queryLogTableBody = document.getElementById("validatorLogTableBody");

    temp_id++;//ID도 웹서버에서 전달

    var shortenedQuery = queryText.length > 40 ? queryText.slice(0, 40) + "..." : queryText;
    queryHistory.push(shortenedQuery);

    const newRow = document.createElement("tr");

    const checkboxCell = document.createElement("td");
    checkboxCell.style.width = "5%";
    checkboxCell.innerHTML = `<input type="checkbox" class="form-check-input" name="form-type[]" value="2">`;

    const queryIDCell = document.createElement("td");
    queryIDCell.style.width = "1%";
    queryIDCell.style.textAlign = "center";
    queryIDCell.textContent = temp_id;

    const modeIconCell = document.createElement("td");
    modeIconCell.style.width = "5%";
    modeIconCell.style.textAlign = "center";
    if(true/*CSD Option 조건일 경우*/){
        modeIconCell.innerHTML = `<div><img src="../static/image/free-icon-letter-c.png" width="20" height="20"/></div>`;
    }else{
        //SSD Option 조건일 경우
        modeIconCell.innerHTML = `<div><img src="../static/image/free-icon-letter-s.png" width="20" height="20"/></div>`;
    }

    const queryCell = document.createElement("td");
    queryCell.style.width = "30%";
    queryCell.style.backgroundColor = "#fcfdfe";
    queryCell.textContent = `${shortenedQuery}`;

    const progressBarCells = [];
    for (let i = 0; i < 4; i++) {
        //response로 받은 결과 데이터 넣기(cpu,power,network,time)
        const progressBarCell = document.createElement("td");
        progressBarCell.style.width = "12%";
        let width;
        let value;//결과 데이터
        let max;//max값은 로그중 가장 큰값

        if(i==0){//임시저장
            value = 2112;
            max = 6000;
        }else if(i==1){
            value = 800;
            max = 4000;
        }else if(i==2){
            value = 96;
            max = 200;
        }else{
            value = 13;
            max = 100;
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
    dummyButtonCell.innerHTML = `
        <span class="btn btn-link p-0 ssd_btn queryLogDetailClass" data-bs-toggle="popover" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
        </span>
    `;
    $(document).ready(function () {
        $('[data-bs-toggle="popover"]').popover();
    });

    // 각 로그 버튼마다 id 부여
    dummyButtonCell.id = temp_id;
    
    newRow.appendChild(checkboxCell);
    newRow.appendChild(queryIDCell);
    newRow.appendChild(modeIconCell);
    newRow.appendChild(queryCell);
    for (let i = 0; i < 4; i++) {
        newRow.appendChild(progressBarCells[i]);
    }
    newRow.appendChild(dummyButtonCell);

    queryLogTableBody.appendChild(newRow);

    //쿼리 로그 상세 버튼 클릭시 모달 로드
    // dummyButtonCell.querySelector('.queryLogDetailClass').addEventListener('click', function() {
    //     modalContentsLoad(dummyButtonCell.id)});

    dummyButtonCell.addEventListener('click', function() {
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
        });
        popover.show();
    });
}

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
function modalContentsLoad(b){
    console.log("LOG Modal Pop, Validation ID :", b)
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