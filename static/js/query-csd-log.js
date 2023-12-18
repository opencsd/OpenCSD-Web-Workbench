// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

var totalContainerLog = [InterfaceContainerLog, MergingContainerLog, MonitoringContainerLog, offloadingContainerLog];
var totalCSDLog = [csd1Log, csd2Log, csd3Log, csd4Log, csd5Log, csd6Log, csd7Log, csd8Log];

let popover;
var maxList = {
    "scannedMax" : 1000000,
    "filteredMax" : 1000000,
    "ratioMax" : 100,
    "timeMax" : 3600,
}

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
                    </svg>`
        }
        else if (result.query_type == "update" || result.query_type == 2) {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-u" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 8v6a2 2 0 1 0 4 0v-6" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`
        }
        else if (result.query_type == "insert" || result.query_type == 3) {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-i" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 8v8" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`
        }
        else if (result.query_type == "delete" || result.query_type == 4) {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-d" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2z" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`
        }
        else {
            typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-g" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>`
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
                max = maxList.filterRatio;
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
            <span class="btn btn-link p-0 ssd_btn queryLogDetailClass" data-bs-toggle="popover" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </span>
        `;
        dummyButtonCell.addEventListener('click', function() {dummyButtonCellEventHandler(dummyButtonCell)});
        
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
            LogButton.style.marginBottom = '5px';
            LogButton.textContent = 'LOG';
            LogButton.addEventListener('click', function () {
                modalContentsLoad(queryRow.id);
                popover.hide();
            });

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

            popoverContent.appendChild(LogButton);
            popoverContent.appendChild(DetailButton);

            return popoverContent;
        }
    });
    popover.show();
}

// function addNewQueryLog(){
//     const queryLogTableBody = document.getElementById("queryLogTableBody");

//     const queryText = document.getElementById("queryTextarea").value.trim();

//     if (queryText) {
//         const shortenedQuery = queryText.length > 40 ? queryText.slice(0, 40) + "..." : queryText;
//         queryHistory.push(shortenedQuery);

//         const newRow = document.createElement("tr");
//         const checkboxCell = document.createElement("td");
//         checkboxCell.style.width = "5%";
//         checkboxCell.style.textAlign = "center";
//         const typeCell = document.createElement("td");
//         typeCell.style.width = "5%";
//         typeCell.style.textAlign = "center";
//         const queryIDCell = document.createElement("td");
//         queryIDCell.style.width = "1%";
//         const queryCell = document.createElement("td");
//         queryCell.style.width = "30%";
//         const progressBarCells = [];
//         const dummyButtonCell = document.createElement("td");
//         dummyButtonCell.style.width = "5%";

//         for (let i = 0; i < 4; i++) {
//             const progressBarCell = document.createElement("td");
//             progressBarCell.style.width = "12%";
//             let width;
//             let value;
//             let max;
//             let label;

//             if (i == 0) {
//                 value = scanned_row_count;
//                 max = value + 100000;
//             } else if (i == 1) {
//                 value = filtered_row_count;
//                 max = value + 100000;
//             } else if (i == 2) {
//                 value = filter_ratio;
//                 max = 100;
//             } else {
//                 value = ExecutionTime;
//                 max = value + 20;
//             }

//             label = value;
//             width = (value / max) * 100;
//             progressBarCell.innerHTML = `
//                 <div class="progress">
//                     <div class="progress-bar" style="width: ${width}%" role="progressbar" aria-valuenow="${value}"
//                         aria-valuemin="0" aria-valuemax="${max}" aria-label="${label}% Complete">
                        
//                     </div>
//                 </div>
//                 <div style="text-align:center">
//                     <h6 style="margin-top:5px; margin-bottom:0px;">${value}</h6>
//                 </div>
//             `;
//             progressBarCells.push(progressBarCell);
//         }
//         // progressBarCells.id = "logDetail"+executionQueryID;

//         const dummyButton = document.createElement("td");
//         dummyButton.innerHTML = `
//             <span class="btn btn-link p-0 ssd_btn queryLogDetailClass" data-bs-toggle="popover" >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
//                     <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
//                 </svg>
//             </span>
//         `;
//         $(document).ready(function () {
//             $('[data-bs-toggle="popover"]').popover();
//         });

//         // 각 옵션 버튼마다 id 부여
//         dummyButton.id = executionQueryID;

//         checkboxCell.innerHTML = `<input type="checkbox" class="form-check-input" name="form-type[]" value="1">`;
//         newRow.appendChild(checkboxCell);

//         // 쿼리 타입에 따라 아이콘 
//         const queryType = queryText.slice(0, 10);
//         var lowerCasequeryType = queryType.toLowerCase();
//         if (lowerCasequeryType.includes("select")) {
//             // console.log("select query type")
//             typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-s" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="Red" fill="none" stroke-linecap="round" stroke-linejoin="round">
//         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//         <path d="M10 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1" />
//         <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
//         </svg>`
//         }
//         else if (lowerCasequeryType.includes("update")) {
//             // console.log("update query type")
//             typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-u" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M10 8v6a2 2 0 1 0 4 0v-6" />
//             <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
//           </svg>`
//         }
//         else if (lowerCasequeryType.includes("insert")) {
//             // console.log("insert query type")
//             typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-i" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M12 8v8" />
//             <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
//           </svg>`
//         }
//         else if (lowerCasequeryType.includes("delete")) {
//             // console.log("delete query type")
//             typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-d" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0070C0" fill="none" stroke-linecap="round" stroke-linejoin="round">
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M10 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2z" />
//             <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
//           </svg>`
//         }
//         else {
//             // console.log("generic query type")
//             typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-g" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M14 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
//             <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
//           </svg>`
//         }

//         newRow.appendChild(typeCell);

//         queryIDCell.textContent = executionQueryID;
//         queryIDCell.style.textAlign = "center";
//         newRow.appendChild(queryIDCell);

//         queryCell.textContent = `${shortenedQuery}`;
//         queryCell.style.backgroundColor = "#fcfdfe";
//         newRow.appendChild(queryCell);

//         for (let i = 0; i < 4; i++) {
//             newRow.appendChild(progressBarCells[i]);
//         }

//         newRow.appendChild(dummyButtonCell);
//         dummyButtonCell.appendChild(dummyButton);

//         queryLogTableBody.appendChild(newRow);

//         // 쿼리 상세 버튼 클릭 시 동작
//         dummyButton.addEventListener('click', function () {
//             var queryRow = this.parentNode.parentNode;
//             var getScan = queryRow.cells[4].querySelectorAll('div');
//             var scannedRows = getScan[2].outerText;
//             var getFilter = queryRow.cells[5].querySelectorAll('div');
//             var filteredRows = getFilter[2].outerText;
//             console.log(scannedRows, filteredRows)
//             if (popover) {
//                 popover.dispose(); // 기존 팝업 제거
//             }

//             popover = new bootstrap.Popover(dummyButton, {
//                 container: 'body',
//                 placement: 'right',
//                 trigger: 'manual',
//                 html: true,
//                 content: function () {
//                     const popoverContent = document.createElement('div');
//                     popoverContent.classList.add('text-center');
//                     popoverContent.style.maxWidth = '200px';
        
//                     const LogButton = document.createElement('button');
//                     LogButton.setAttribute('type', 'button');
//                     LogButton.classList.add('btn', 'btn-azure', 'd-block', 'mr-2');
//                     LogButton.style.padding = '5px';
//                     LogButton.style.width = '80px';
//                     LogButton.style.marginBottom = '5px';
//                     LogButton.textContent = 'LOG';
//                     LogButton.addEventListener('click', function () {
//                         modalContentsLoad(dummyButton.id);
//                         popover.hide();
//                     });
        
//                     const DetailButton = document.createElement('button');
//                     DetailButton.setAttribute('type', 'button');
//                     DetailButton.classList.add('btn', 'btn-azure', 'd-block');
//                     DetailButton.style.padding = '5px';
//                     DetailButton.style.width = '80px';
//                     DetailButton.textContent = 'DETAIL';
//                     DetailButton.addEventListener('click', function () {
//                         // 스니펫 테이블
//                         queryLogDetailLoad(dummyButton.id);
                        
//                         // 스캔 필터 비율 차트
//                         var dataArray = [scannedRows, filteredRows];
//                         ScanFilterChartOption.series[0].data = dataArray;
//                         var ScanFilterChart = new ApexCharts(document.querySelector("#ScanFilterChart"), ScanFilterChartOption);
//                         ScanFilterChart.render();
//                         popover.hide()

//                     });
        
//                     popoverContent.appendChild(LogButton);
//                     popoverContent.appendChild(DetailButton);
        
//                     return popoverContent;
//                 }
//             });
//             popover.show();
//         });
//     } else {
//         queryLogTableBody.textContent = "No query available.";
//     }
// }

// // 쿼리 로그 행 클릭 시 해당 쿼리 정보 로딩
// const LogTableClick = document.getElementById("queryLogtable")

// LogTableClick.addEventListener('click', function(e) {
//     const metrictable1 = document.querySelector('td.qtable_1');
//     const metrictable2 = document.querySelector('td.qtable_2');
//     const metrictable3 = document.querySelector('td.qtable_3');
//     const metrictable4 = document.querySelector('td.qtable_4');
//     const metrictable5 = document.querySelector('td.qtable_5');

//     const row = e.target.closest('tr');
//     if (row) {
//         const cells = row.getElementsByTagName('td');
//         const query_id = cells[2].innerText;
//         hostServerCPUChartData = [];
//         hostServerPowerChartData = [];
//         fetch('/query/log/get-one', {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             redirect: 'follow',
//             body: JSON.stringify({query_id: query_id})
//         })
//         .then(response => response.json())
//         .then(data => {
//             metrictable1.textContent = data.query_log[0].scanned_row_count + " (line)";
//             metrictable2.textContent = data.query_log[0].filtered_row_count + " (line)";
            
//             let f_ratio = (data.query_log[0].filtered_row_count / data.query_log[0].scanned_row_count) * 100;
//             filter_ratio = f_ratio.toFixed(2);
//             metrictable3.textContent = filter_ratio + " (%)";

//             let queryStart = new Date(data.query_log[0].start_time);
//             let queryEnd = new Date(data.query_log[0].end_time);
//             let queryTime = queryEnd - queryStart;
//             ExecutionTime = queryTime / 1000;
//             metrictable4.textContent = ExecutionTime + " (sec)";
//             metrictable5.textContent = data.query_log[0].snippet_count;

//             document.getElementById("queryResult").value = data.query_log[0].query_result;

//             data.query_metric[0].forEach(item => {
//                 hostServerCPUChartData.push((item.cpu_usage)/1000000);
//                 hostServerPowerChartData.push(item.power_usage);
//                 var date = new Date(item.time);
//                 var hour = date.getHours();
//                 var minute = date.getMinutes();
//                 var seconds = date.getSeconds();
//                 var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
//                 var formattedHour = hour < 10 ? '0' + hour : hour;
//                 var formattedMinute = minute < 10 ? '0' + minute : minute;
//                 var time = formattedHour+":"+formattedMinute+":"+formattedSeconds;
//                 timestamps.push(time);
//             })
//             updateQueryChart();
//         })
//         .catch(error => {
//             console.error('Fetch 오류: ', error);
//         })
//     }
// })

//모달 내용 로딩
function modalContentsLoad(b) {
    $(function () {
        //CSD 로그 드롭박스 및 출력 데이터 초기화
        var CSDButton = document.getElementById("CSDButton");
        var CSDLog = document.getElementById("tab2");
        CSDButton.innerText = "CSD 1";
        CSDLog.innerHTML = totalCSDLog[0];

        //컨테이너 로그 드롭박스 및 출력 데이터 초기화
        var containerButton = document.getElementById("containerButton");
        var containerLog = document.getElementById("tab1");
        containerButton.innerText = "Interface Container"
        containerLog.innerHTML = totalContainerLog[0];

        // 모든 모달은 처음 띄워질 때 첫번째 탭 관련 정보만 시각화
        $("#containerButton").show();
        $("#CSDButton").hide();
        // $('.nav-tabs a:last').tab('hide');

        // 모달 띄우기(모든 탭 관련 정보 설정)
        $("#modal").modal("show");
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
    var arr = ['Interface', "Merging", "Monitoring", "Offloading"];
    for (let i = 0; i < arr.length; i++) {
        document.getElementById(arr[i]).addEventListener('click', function () {
            var containerButton = document.getElementById("containerButton");
            var containerLog = document.getElementById("tab1");
            containerButton.innerText = arr[i] + " Container";
            containerLog.innerHTML = totalContainerLog[i];
        });
    };
}

//###모달 기능#####
// 1. 모달 닫기 
$("#modal #close").click(function () {
    $(function () {
        // Storage Engine, CSD tab 초기화
        var SEtab = document.getElementById("tab1-tab");
        var CSDtab = document.getElementById("tab2-tab");
        SEtab.ariaSelected = 'true';
        CSDtab.ariaSelected = 'false';

        // CSD 로그 드롭박스 및 출력 데이터 초기화
        var CSDButton = document.getElementById("CSDButton");
        var CSDLog = document.getElementById("tab2");
        CSDButton.innerText = "CSD Num";
        CSDLog.innerHTML = "";

        //컨테이너 로그 드롭박스 및 출력 데이터 초기화
        var containerButton = document.getElementById("containerButton");
        var containerLog = document.getElementById("tab1");
        containerButton.innerText = "Container"
        containerLog.innerHTML = "";

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
