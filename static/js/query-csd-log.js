// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

// var totalContainerLog = [InterfaceContainerLog, MergingContainerLog, MonitoringContainerLog, offloadingContainerLog];
// var totalCSDLog = [csd1Log, csd2Log, csd3Log, csd4Log, csd5Log, csd6Log, csd7Log, csd8Log];

var totalContainerLog = [];
var totalCSDLog = [];

let popover;
var maxList = {
    "scannedMax" : 1000000,
    "filteredMax" : 1000000,
    "ratioMax" : 100,
    "timeMax" : 500,
}

var selectIcon = "";
var dclIcon = "";
var ddlIcon = "";
var otherIcon = "";

function addQueryLog(data){
    data.forEach(function(result){
        const queryLogTableBody = document.getElementById("queryLogTableBody");

        var query = result.query_statement;
        var shortenedQuery = query.length > 40 ? query.slice(0, 50) + "..." : query;

        const newRow = document.createElement("tr");

        const checkboxCell = document.createElement("td");
        checkboxCell.style.width = "5%";
        checkboxCell.innerHTML = `<input type="checkbox" class="form-check-input logCheckBox" name="form-type[]">`;

        const typeCell = document.createElement("td");
        typeCell.style.width = "5%";
        typeCell.style.textAlign = "center";
        if (result.query_type == "select" || result.query_type == 1) {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-s" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="Red" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`;
                    selectIcon = typeCell.innerHTML;
                    
        }
        else if (result.query_type == "dcl" || result.query_type == 2) {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-c" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 8v6a2 2 0 1 0 4 0v-6" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`;
                    dclIcon = typeCell.innerHTML;
        }
        else if (result.query_type == "ddl" || result.query_type == 3) {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-d" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 8v8" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`;
                    ddlIcon = typeCell.innerHTML;
        }
        // else if (result.query_type == "delete" || result.query_type == 4) {
        //     typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-d" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        //                 <path d="M10 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2z" />
        //                 <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        //             </svg>`
        // }
        else {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-o" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`;
                    otherIcon = typeCell.innerHTML;
        }

        const queryIDCell = document.createElement("td");
        queryIDCell.style.width = "1%";
        queryIDCell.style.textAlign = "center";
        queryIDCell.textContent = result.query_id;

        const queryCell = document.createElement("td");
        queryCell.style.width = "30%";
        queryCell.style.backgroundColor = "#fcfdfe";
        queryCell.textContent = `${shortenedQuery}`;
        queryCell.className = "queryCells";
        queryCell.clicked = false;
        queryCell.addEventListener('click', function() {logClickEvent(queryCell);});
        // queryCell.addEventListener("mouseenter", function() {queryCell.style.backgroundColor="#f6f8fb"});
        // queryCell.addEventListener("mouseleave", function() {queryCell.style.backgroundColor=originalColor});

        const progressBarCells = [];
        for (let i = 0; i < 4; i++) {
            const progressBarCell = document.createElement("td");
            progressBarCell.style.width = "12%";

            let value, max, width;

            if(i==0){//scanned row
                value = result.scanned_row_count;
                // if(maxList.scannedMax < value){
                //     maxList.scannedMax = value;

                //     var tbody = document.getElementById("queryLogTableBody");
                //     var trList = tbody.getElementsByTagName('tr');
                //     for (var j = 0; j < trList.length; j++) {
                //         var tdList = trList[j].getElementsByTagName('td');
                //         var tdValue = tdList[4].querySelector('.progress-bar').ariaValueNow;
                //         tdList[4].querySelector('.progress-bar').style.width = (tdValue / maxList.scannedMax) * 100 + "%";
                //         tdList[4].querySelector('.progress-bar').ariaValueMax = maxList.scannedMax;
                //     }
                // }
                max = maxList.scannedMax;
            }else if(i==1){//filtered row
                value = result.filtered_row_count;
                // if(maxList.filteredMax < value){
                //     maxList.filteredMax = value;

                //     var tbody = document.getElementById("queryLogTableBody");
                //     var trList = tbody.getElementsByTagName('tr');
                //     for (var j = 0; j < trList.length; j++) {
                //         var tdList = trList[j].getElementsByTagName('td');
                //         var tdValue = tdList[5].querySelector('.progress-bar').ariaValueNow;
                //         tdList[5].querySelector('.progress-bar').style.width = (tdValue / maxList.filteredMax) * 100 + "%";
                //         tdList[5].querySelector('.progress-bar').ariaValueMax = maxList.filteredMax;
                //     }
                // }
                max = maxList.filteredMax;
            }else if(i==2){//filter ratio
                let filterRatio = ((result.scanned_row_count - result.filtered_row_count) / result.scanned_row_count) * 100;
                value = filterRatio.toFixed(2);
                max = maxList.ratioMax;
            }else if(i==3){//time
                value = (result.execution_time).toFixed(2);
                // if(maxList.timeMax < value){
                //     maxList.timeMax = value;

                //     var tbody = document.getElementById("queryLogTableBody");
                //     var trList = tbody.getElementsByTagName('tr');
                //     for (var j = 0; j < trList.length; j++) {
                //         var tdList = trList[j].getElementsByTagName('td');
                //         var tdValue = tdList[7].querySelector('.progress-bar').ariaValueNow;
                //         tdList[7].querySelector('.progress-bar').style.width = (tdValue / maxList.timeMax) * 100 + "%";
                //         tdList[7].querySelector('.progress-bar').ariaValueMax = maxList.timeMax;
                //     }
                // }
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
        dummyButtonCell.innerHTML = `
            <a class="btn btn-link p-0 ssd_btn queryLogDetailClass" data-bs-toggle="popover" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </a>
        `;
        dummyButtonCell.addEventListener('click', function() {
            dummyButtonCellEventHandler(dummyButtonCell)
        });
        
        newRow.appendChild(checkboxCell);
        newRow.appendChild(typeCell);
        newRow.appendChild(queryIDCell);
        newRow.appendChild(queryCell);
        for (let i = 0; i < 4; i++) {
            newRow.appendChild(progressBarCells[i]);
        }
        newRow.appendChild(dummyButtonCell);
        newRow.id = result.query_id;

        queryLogTableBody.appendChild(newRow);
    });
}


function addSingleQueryLog(result){
        const queryLogTableBody = document.getElementById("queryLogTableBody");

        var query = result.query_statement;
        var shortenedQuery = query.length > 40 ? query.slice(0, 50) + "..." : query;

        const newRow = document.createElement("tr");

        const checkboxCell = document.createElement("td");
        checkboxCell.style.width = "5%";
        checkboxCell.innerHTML = `<input type="checkbox" class="form-check-input logCheckBox" name="form-type[]">`;

        const typeCell = document.createElement("td");
        typeCell.style.width = "5%";
        typeCell.style.textAlign = "center";
        if (result.query_type == "select" || result.query_type == 1) {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-s" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="Red" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`;
                    selectIcon = typeCell.innerHTML;
                    
        }
        else if (result.query_type == "dcl" || result.query_type == 2) {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-c" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 8v6a2 2 0 1 0 4 0v-6" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`;
                    dclIcon = typeCell.innerHTML;
        }
        else if (result.query_type == "ddl" || result.query_type == 3) {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-d" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 8v8" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`;
                    ddlIcon = typeCell.innerHTML;
        }
        // else if (result.query_type == "delete" || result.query_type == 4) {
        //     typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-d" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        //                 <path d="M10 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2z" />
        //                 <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        //             </svg>`
        // }
        else {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-o" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`;
                    otherIcon = typeCell.innerHTML;
        }

        const queryIDCell = document.createElement("td");
        queryIDCell.style.width = "1%";
        queryIDCell.style.textAlign = "center";
        queryIDCell.textContent = result.query_id;

        const queryCell = document.createElement("td");
        queryCell.style.width = "30%";
        queryCell.style.backgroundColor = "#fcfdfe";
        queryCell.textContent = `${shortenedQuery}`;
        queryCell.className = "queryCells";
        queryCell.clicked = false;
        queryCell.addEventListener('click', function() {logClickEvent(queryCell);});
        // queryCell.addEventListener("mouseenter", function() {queryCell.style.backgroundColor="#f6f8fb"});
        // queryCell.addEventListener("mouseleave", function() {queryCell.style.backgroundColor=originalColor});

        const progressBarCells = [];
        for (let i = 0; i < 4; i++) {
            const progressBarCell = document.createElement("td");
            progressBarCell.style.width = "12%";

            let value, max, width;

            if(i==0){//scanned row
                value = result.scanned_row_count;
                // if(maxList.scannedMax < value){
                //     maxList.scannedMax = value;

                //     var tbody = document.getElementById("queryLogTableBody");
                //     var trList = tbody.getElementsByTagName('tr');
                //     for (var j = 0; j < trList.length; j++) {
                //         var tdList = trList[j].getElementsByTagName('td');
                //         var tdValue = tdList[4].querySelector('.progress-bar').ariaValueNow;
                //         tdList[4].querySelector('.progress-bar').style.width = (tdValue / maxList.scannedMax) * 100 + "%";
                //         tdList[4].querySelector('.progress-bar').ariaValueMax = maxList.scannedMax;
                //     }
                // }
                max = maxList.scannedMax;
            }else if(i==1){//filtered row
                value = result.filtered_row_count;
                // if(maxList.filteredMax < value){
                //     maxList.filteredMax = value;

                //     var tbody = document.getElementById("queryLogTableBody");
                //     var trList = tbody.getElementsByTagName('tr');
                //     for (var j = 0; j < trList.length; j++) {
                //         var tdList = trList[j].getElementsByTagName('td');
                //         var tdValue = tdList[5].querySelector('.progress-bar').ariaValueNow;
                //         tdList[5].querySelector('.progress-bar').style.width = (tdValue / maxList.filteredMax) * 100 + "%";
                //         tdList[5].querySelector('.progress-bar').ariaValueMax = maxList.filteredMax;
                //     }
                // }
                max = maxList.filteredMax;
            }else if(i==2){//filter ratio
                let filterRatio = ((result.scanned_row_count - result.filtered_row_count) / result.scanned_row_count) * 100;
                value = filterRatio.toFixed(2);
                max = maxList.ratioMax;
            }else if(i==3){//time
                value = (result.execution_time).toFixed(2);
                // if(maxList.timeMax < value){
                //     maxList.timeMax = value;

                //     var tbody = document.getElementById("queryLogTableBody");
                //     var trList = tbody.getElementsByTagName('tr');
                //     for (var j = 0; j < trList.length; j++) {
                //         var tdList = trList[j].getElementsByTagName('td');
                //         var tdValue = tdList[7].querySelector('.progress-bar').ariaValueNow;
                //         tdList[7].querySelector('.progress-bar').style.width = (tdValue / maxList.timeMax) * 100 + "%";
                //         tdList[7].querySelector('.progress-bar').ariaValueMax = maxList.timeMax;
                //     }
                // }
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
        dummyButtonCell.innerHTML = `
            <a class="btn btn-link p-0 ssd_btn queryLogDetailClass" data-bs-toggle="popover" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </a>
        `;
        dummyButtonCell.addEventListener('click', function() {
            dummyButtonCellEventHandler(dummyButtonCell)
        });
        
        newRow.appendChild(checkboxCell);
        newRow.appendChild(typeCell);
        newRow.appendChild(queryIDCell);
        newRow.appendChild(queryCell);
        for (let i = 0; i < 4; i++) {
            newRow.appendChild(progressBarCells[i]);
        }
        newRow.appendChild(dummyButtonCell);
        newRow.id = result.query_id;

        queryLogTableBody.appendChild(newRow);
}

function dummyButtonCellEventHandler(dummyButtonCell){
    var queryRow = dummyButtonCell.parentNode;
    var getScan = queryRow.cells[4].querySelectorAll('div');
    var scannedRows = getScan[2].outerText;
    var getFilter = queryRow.cells[5].querySelectorAll('div');
    var filteredRows = getFilter[2].outerText;
    
    if (popover) {
        popover.dispose(); // 기존 팝업 제거
    }

    popover = new bootstrap.Popover(dummyButtonCell, {
        container: 'body',
        placement: 'right',
        trigger: 'focus',
        html: true,
        content: function () {
            
            const popoverContent = document.createElement('div');
            popoverContent.classList.add('text-center');
            popoverContent.style.maxWidth = '200px';

            // const LogButton = document.createElement('button');
            // LogButton.setAttribute('type', 'button');
            // LogButton.classList.add('btn', 'btn-azure', 'd-block', 'mr-2');
            // LogButton.style.padding = '5px';
            // LogButton.style.width = '80px';
            // LogButton.style.marginBottom = '5px';
            // LogButton.textContent = 'LOG';
            // LogButton.addEventListener('click', function () {
            //     modalContentsLoad(queryRow.id);
            //     popover.hide();
            // });

            const DetailButton = document.createElement('button');
            DetailButton.setAttribute('type', 'button');
            DetailButton.classList.add('btn', 'btn-azure', 'd-block');
            DetailButton.style.padding = '5px';
            DetailButton.style.width = '80px';
            DetailButton.textContent = 'DETAIL';
            DetailButton.addEventListener('click', function () {
                // 스니펫 테이블
                queryLogDetailLoad(queryRow.id);
                
                // 스캔 필터 비율 차트
                var dataArray = [scannedRows, filteredRows];
                ScanFilterChartOption.series[0].data = dataArray;
                var ScanFilterChart = new ApexCharts(document.querySelector("#ScanFilterChart"), ScanFilterChartOption);
                ScanFilterChart.render();
                popover.hide()

            });

            // popoverContent.appendChild(LogButton);
            popoverContent.appendChild(DetailButton);

            function documentClickHandler(e) {
                // 팝오버가 열려있을 때만 동작하도록 체크
                if (popover._element && !popover._element.contains(e.target)) {
                    popover.hide();
                    document.removeEventListener('click', documentClickHandler);
                }
            }
    
            // document의 click 이벤트에 대한 핸들러 등록
            document.addEventListener('click', documentClickHandler);

            return popoverContent;
        }
    });
    popover.show();
}

// 쿼리 로그
function modalContentsLoad(query_id) {
    const containerButton = document.getElementById("containerButton");
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // 드롭다운에서 선택한 항목 보이기
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            containerButton.textContent = item.textContent;
        });
    });

    const post_data = {
        query_id: query_id
    }

    // 웹 서버 연결해서 디버그 정보 받아오기
    fetch('/query/desc/debug', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(post_data)
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            // instance log 데이터 배열에 넣기
            totalContainerLog = Object.values(data['instance_debug_log']);

            var containerLog = document.getElementById("tab1");
            containerLog.innerHTML = totalContainerLog[0];

            // csd log 데이터 배열에 넣기
            data.csd_debug_log.forEach(function (item) {
                totalCSDLog.push(item.csd_log);
            })
            var CSDLog = document.getElementById("tab2");
            CSDLog.innerHTML = totalCSDLog[0];
        })

    $(function () {
        //CSD 로그 드롭박스 및 출력 데이터 초기화
        var CSDButton = document.getElementById("CSDButton");
        CSDButton.innerText = "CSD 1";

        // 출력 데이터 초기화
        containerButton.innerText = "Query Engine"

        // 모든 모달은 처음 띄워질 때 첫번째 탭 관련 정보만 시각화
        $("#containerButton").show();
        $("#CSDButton").hide();

        // 모달 띄우기(모든 탭 관련 정보 설정)
        $("#modal").modal("show");
        $("#tab1-tab").tab("show");
        var modalDiv = $('#modal');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
    //CSD 1~8 ->
    for (let i = 1; i <= 8; i++) {
        document.getElementById("CSD" + i).addEventListener('click', function () {
            var CSDButton = document.getElementById("CSDButton");
            var csdLog = document.getElementById("tab2");
            CSDButton.innerText = "CSD " + i;
            csdLog.innerHTML = totalCSDLog[i - 1];
        });
    };
    //Container 1~4
    var arr = ['Query', 'Interface', "Merging", "Monitoring", "Offloading"];
    for (let i = 0; i < arr.length; i++) {
        document.getElementById(arr[i]).addEventListener('click', function () {
            var containerLog = document.getElementById("tab1");
            containerLog.innerHTML = totalContainerLog[i];
        });
    };
}

// ###모달 기능#####

// 1. 모달 닫기 
$("#modal #close").click(function () {
    $(function () {
        $("#modal").modal("hide");
    });
});
// 2. 모달 드래그 
$(function () {
    $('.modal-dialog').draggable({
        handle: ".modal-header"
    });
});

// 3. 모달 탭 전환 
$('a[data-toggle="tab"]').click(function (e) {
    var targetTab = $(e.target).attr('href');
    
    // 탭 1로 전환 시 내용 업데이트
    if (targetTab === '#tab1') {
        $("#containerButton").show();
        $("#CSDButton").hide();

    }
    // 탭 2로 전환 시 내용 업데이트
    else if (targetTab === '#tab2') {
        $("#containerButton").hide();
        $("#CSDButton").show();
    }
});


// 쿼리 로그 디테일 모달
function queryLogDetailLoad(query_id) {
    const queryDetailTableBody = document.getElementById("logDetailTableBody");
    const post_data = {
        query_id: query_id
    }
    // 웹 서버와 연결해서 db로부터 값 받아서 테이블 채우기
    fetch('/query/desc/snippet', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(post_data)
    })
        .then(response => response.json())
        .then(data => {

            queryDetailTableBody.innerHTML = ``;

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
                const HavingCell = document.createElement("td");
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
                ProjectionCell.textContent = item.projection;
                FilterCell.textContent = item.filter;
                OrderCell.textContent = item.order_by;
                GroupCell.textContent = item.group_by;
                LimitCell.textContent = item.limit_exist;
                HavingCell.textContent = item.having;

                SnippetRow.appendChild(WIDCell);
                SnippetRow.appendChild(TypeCell);
                SnippetRow.appendChild(ProjectionCell);
                SnippetRow.appendChild(FilterCell);
                SnippetRow.appendChild(OrderCell);
                SnippetRow.appendChild(GroupCell);
                SnippetRow.appendChild(LimitCell);
                SnippetRow.appendChild(HavingCell);

                queryDetailTableBody.appendChild(SnippetRow);
            })
        })
        .catch(console.error(error => console.error('Error: ', error)));

    // 모달 창 열기
    $(function () {
        $("#queryLogDetail").modal("show");
        var modalDiv = $('#queryLogDetail');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
}
