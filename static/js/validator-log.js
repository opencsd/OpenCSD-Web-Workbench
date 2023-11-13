const queryHistory = [];

const rowsPerPage = 10;
let currentPage = 1;
let temp_id = 0;//임시

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
    dummyButtonCell.querySelector('.queryLogDetailClass').addEventListener('click', function() {modalContentsLoad(dummyButtonCell.id)});
}

const validatorLogTableBody = document.getElementById("validatorLogTableBody");
const validatorLogPrevBtn = document.getElementById("validatorLogPrevBtn");
const validatorLogNextBtn = document.getElementById("validatorLogNextBtn");

// 페이지 갱신 함수
function updateTable() {
    // 모든 로우 숨기기
    const rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
      rows[i].style.display = "none";
    }

    // 현재 페이지에 해당하는 로우만 표시
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    for (let i = startIndex + 1; i < endIndex + 1; i++) {
      if (rows[i]) {
        rows[i].style.display = "table-row";
      }
    }
  }

validatorLogPrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        // 페이지 변경 작업
    }
});

validatorLogNextBtn.addEventListener("click", () => {
    currentPage++;
    // 페이지 변경 작업
});

//모달 내용 로딩
function modalContentsLoad(b){
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