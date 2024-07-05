// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

var metricCompareChart, metricCompareChartSeries = [], metricCompareChartSeriesReal = [];
var detailCPUChart, detailCPUChartSeries = [];
var detailPowerChart, detailPowerChartSeries = [];
var detailNetworkChart, detailNetworkChartSeries = [];
var detailTimeChart, detailTimeChartSeries = [];
// var detailChart, detailChartSeries = [];
var detailChartCategories = [], optionTableData = [];

var cpuMetric, powerMetric, networkMetric, executionTime;

document.addEventListener("DOMContentLoaded", function () { 
    metricCompareChart = new ApexCharts(document.getElementById("metricCompare"), metricCompareChartOption);
    detailCPUChart = new ApexCharts(document.getElementById("detailCPU"), detailCPUChartOption);
    detailPowerChart = new ApexCharts(document.getElementById("detailPower"), detailPowerChartOption);
    detailNetworkChart = new ApexCharts(document.getElementById("detailNetwork"), detailNetworkChartOption);
    detailTimeChart = new ApexCharts(document.getElementById("detailTime"), detailTimeChartOption);

    // detailChart = new ApexCharts(document.getElementById("detailChart"), detailChartOption);

    metricCompareChart.render();
    detailCPUChart.render();
    detailPowerChart.render();
    detailNetworkChart.render();
    detailTimeChart.render();
    // detailChart.render();
    // console.log(detailChart)

    viewUserID();
    drawLogTable();
    getOptionList();
});

// 유저 아이디 
function viewUserID(){
    const user_id = document.getElementById("user_info");
    user_id.textContent = "User : " + storeduserInfo.workbench_user_id;
}

const detailMetricDropdown = document.querySelector("#detailMetricDropdown");
const detailMetricDropdownItems = document.querySelectorAll(".detailMetricDropdownItem");

detailMetricDropdownItems.forEach(function(item) { // 드롭다운으로 차트 바꾸기
    item.addEventListener("click", function() {
        detailMetricDropdown.textContent = item.textContent;
        // detailChart.style.display = "none"; 

        //visibility:hidden 상태와 visibility:visible

        //보여지는거 해결좀
        // 차트 숨기기 / 보이기 -> 차트 데이터 series 바꾸기

        // detailCPUChart.updateOptions({ chart: { foreColor: '#000000' } });
        // detailPowerChart.updateOptions({ chart: { foreColor: '#000000' } });

        detailCPU.style.display = "none"; 
        detailPower.style.display = "none"; 
        detailNetwork.style.display = "none"; 
        detailTime.style.display = "none"; 

        if(item.textContent == "Power"){
            detailPower.style.display = "block"; 
            detailPower.render();
        }else if(item.textContent == "Network"){
            detailNetwork.style.display = "block"; 
            detailNetwork.render()
        }else if(item.textContent == "Time"){ 
            detailTime.style.display = "block"; 
            detailTime.render()
        }else{//"CPU"
            detailCPU.style.display = "block"; 
            detailCPU.render()
        }

        // console.log(item.textContent)
        console.log(powerMetric);
        console.log(networkMetric);
        console.log(executionTime);

        // if(item.textContent == "Power"){
        //     detailChartSeries = [];
        //     detailChartSeries.push(powerMetric);
        //     // detailChart.style.display = "block"; 
        //     detailChart.update();
        // }else if(item.textContent == "Network"){
        //     detailChartSeries = [];
        //     detailChartSeries.push(networkMetric);
        //     // detailChart.style.display = "block";
        //     detailChart.update()
        // }else if(item.textContent == "Time"){ 
        //     detailChartSeries = [];
        //     detailChartSeries.push(executionTime);
        //     // detailChart.style.display = "block";
        //     detailChart.update()
        // }else{ // "CPU"
        //     detailChartSeries = [];
        //     detailChartSeries.push(cpuMetric);
        //     // detailChart.style.display = "block";
        //     detailChart.update()
        // }
    });
});

function drawLogTable(){
    fetch('/validator/log/get-all', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            user_id: storeduserInfo.workbench_user_id,
        })
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        addValidatorLog(data);
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    })
}

function clearOptionDropdown(){
    var dropdown = document.querySelector(".opt_menu");
    var option = document.createElement("option");
    dropdown.innerHTML = '';

    // New Option 요소 넣기
    option.classList.add("dropdown-item", "opt_item");
    option.href = "#";
    option.text = "New Option+";
    option.id = "new_option";
    option.value = "";
    dropdown.appendChild(option);
}

// 옵션 드롭다운 리스트 불러오기
function getOptionList(){
    clearOptionDropdown();

    fetch('/validator/option/get-all', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            user_id: storeduserInfo.workbench_user_id,
        })
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        var dropdown = document.querySelector(".opt_menu");

        data.forEach(function(item) {
            var option = document.createElement("a");
            option.classList.add("dropdown-item", "opt_item");
            option.href = "#";
            option.dataset.option = item["data-option"];
            option.innerText = item.option_name;
            option.value = item.option_id;
            dropdown.appendChild(option);
        })
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    })
}


const runButton = document.getElementById("runButton");

runButton.addEventListener("click", function () {
    var queryText = dropdownToggle.textContent;
    runButton.disabled = true;

    if(queryText){
        fetch('/validator/run', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify({
                "User_ID": storeduserInfo.workbench_user_id,
                "Query_Statement": queryText,
                "Option_ID": optionID
            })
        })
        .then(response => response.json())
        .then(data => {
            runButton.disabled = false;
            addValidatorLog(data);
            updateChartData(data[0]);
            drawChart();
            updateOptionTableData(data[0].validation_id,optionID);
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        })
    }else{
        alert("Insert Query");
    }
});

function updateChartData(data){
    var compareMetric, compareMetricReal;
    var color;
    var id = "ID " + data.validation_id;

    compareMetricReal = {
        data: [
            data.storage_cpu_usage_predict,
            data.storage_power_usage_predict,
            data.network_usage_predict,
            data.execution_time_predict
        ]
    }

    if(metricCompareChartSeries.length == 0){
        color = "#78b86fff";
        compareMetric = {
            name: id,
            data: [100, 100, 100, 100],
            color: color 
        }
    }else{
        if(metricCompareChartSeries[metricCompareChartSeries.length-1].color == "#e6c333ff"){
            color = "#78b86fff";
        }else{
            color = "#e6c333ff";
        }

        var compareMetricDataFirst = [], compareMetricDataSecond =[];

        for(let i = 0; i<4; i++){
            let first = metricCompareChartSeriesReal[metricCompareChartSeriesReal.length-1].data[i];
            let second = compareMetricReal.data[i];
            
            if(first > second){
                let ratio = Math.round((second / first) * 100);
                compareMetricDataFirst.push(100);
                compareMetricDataSecond.push(ratio);
            }else if(first < second){
                let ratio = Math.round((first / second) * 100);
                compareMetricDataFirst.push(ratio);
                compareMetricDataSecond.push(100);
            }else{
                compareMetricDataFirst.push(100);
                compareMetricDataSecond.push(100);
            }

            compareMetric = {
                name: id,
                data: compareMetricDataSecond,
                color: color 
            }
            metricCompareChartSeries[metricCompareChartSeries.length-1].data = compareMetricDataFirst;
        }
    }

    // 차트 데이터 넣기...
    cpuMetric = {
        name: id,
        data: [data.storage_cpu_usage_predict],
        color: color 
    }
    powerMetric = {
        name: id,
        data: [data.storage_power_usage_predict],
        color: color 
    }
    networkMetric = {
        name: id,
        data: [data.network_usage_predict],
        color: color
    }
    executionTime = {
        name: id,
        data: [data.execution_time_predict],
        color: color 
    }

    metricCompareChartSeriesReal.push(compareMetricReal);
    metricCompareChartSeries.push(compareMetric);

    // 차트에 차트 데이터 적용하기
    // detailChartSeries.push(powerMetric);
    detailCPUChartSeries.push(cpuMetric);
    detailPowerChartSeries.push(powerMetric);
    detailNetworkChartSeries.push(networkMetric);
    detailTimeChartSeries.push(executionTime);
    detailChartCategories.push(id);

    // 3개 이상부터 선택되면 앞에 있는 차트 데이터 사라짐
    if(metricCompareChartSeries.length == 3){
        let firstID = detailChartCategories[0];
        let numberValue = parseInt(firstID.match(/\d+/)[0], 10);
        const firstCell = document.getElementById(numberValue);
        firstCell.style.backgroundColor = "#fcfdfe";
        firstCell.clicked = !firstCell.clicked;

        metricCompareChartSeriesReal.shift();
        metricCompareChartSeries.shift();

        // detailChartSeries.shift();
        detailCPUChartSeries.shift();
        detailPowerChartSeries.shift();
        detailNetworkChartSeries.shift();
        detailTimeChartSeries.shift();
        detailChartCategories.shift();
    }
}

function drawChart(){
    metricCompareChart.updateOptions({
        series: metricCompareChartSeries,
    });

    // detailChart.updateOptions({
    //     series: detailChartSeries,
    //     xaxis: {
    //         categories: detailChartCategories
    //     }
    // });

    detailCPUChart.updateOptions({
        series: detailCPUChartSeries,
        xaxis: {
            categories: detailChartCategories
        }
    });

    detailPowerChart.updateOptions({
        series: detailPowerChartSeries,
        xaxis: {
            categories: detailChartCategories
        }
    });

    detailNetworkChart.updateOptions({
        series: detailNetworkChartSeries,
        xaxis: {
            categories: detailChartCategories
        }
    });

    detailTimeChart.updateOptions({
        series: detailTimeChartSeries,
        xaxis: {
            categories: detailChartCategories
        }
    });
}

function updateOptionTableData(validationID,optionID){
    fetch('/validator/option/get-one', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            'option_id': optionID
        })
    })
    .then(response => response.json())
    .then(data => {
        var option = {
            "selected_id" : validationID,
            "option_name" : data[0].option_name,
            "dbms" : data[0].dbms_type,
            "storage_type" : data[0].storage_type,
            "csd_type" : data[0].csd_type,
            "csd_count" : data[0].csd_count,
            "block_count" : data[0].block_count,
            "scheduling_algorithm" : data[0].scheduling_algorithm
        }

        optionTableData.push(option);

        if(optionTableData.length == 3){
            optionTableData.shift();
        }

        drawOptionTable();
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    })    
}

function logClickEvent(queryCell){
    if(queryCell.clicked){
        queryCell.style.backgroundColor="#fcfdfe";
        logDeactivateEvent(queryCell.parentNode.id);
    }else{
        queryCell.style.backgroundColor="#f6f8fb";
        logActivateEvent(queryCell.parentNode.id);
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
        // console.log(data[0])
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

function deleteFromChart(validationID){
    var lookupID = "ID " + validationID;
    let index = detailChartCategories.indexOf(lookupID);
    metricCompareChartSeriesReal.splice(index, 1);
    metricCompareChartSeries.splice(index, 1);
    // detailChartSeries.splice(index, 1);
    detailCPUChartSeries.splice(index, 1);
    detailPowerChartSeries.splice(index, 1);
    detailNetworkChartSeries.splice(index, 1);
    detailTimeChartSeries.splice(index, 1);
    detailChartCategories.splice(index, 1);
    optionTableData.splice(index, 1);

    if(metricCompareChartSeries.length == 1){
        metricCompareChartSeries[0].data = [100,100,100,100];
    }
}

function drawOptionTable(){
    var tbody = document.querySelector('.simul_tbody');
    var allTdElements = tbody.querySelectorAll('td');

    allTdElements.forEach(function(td) {
        document.querySelector(".firstCol:nth-child(1)").style.backgroundColor = "rgb(252, 253, 254)";
        document.querySelector(".secondCol:nth-child(1)").style.backgroundColor = "rgb(252, 253, 254)";
        td.textContent = '-';
    });

    for(var i = 0; i < optionTableData.length; i++){
        if(i==0){
            document.querySelector(".firstCol:nth-child(1)").style.backgroundColor = metricCompareChartSeries[i].color;
            document.querySelector(".firstCol:nth-child(1)").textContent = optionTableData[i].selected_id;
            document.querySelector(".firstCol:nth-child(2)").textContent = optionTableData[i].option_name;
            document.querySelector(".firstCol:nth-child(3)").textContent = optionTableData[i].dbms;
            document.querySelector(".firstCol:nth-child(4)").textContent = optionTableData[i].storage_type;
            document.querySelector(".firstCol:nth-child(5)").textContent = optionTableData[i].csd_type ? optionTableData[i].csd_type : '-';
            document.querySelector(".firstCol:nth-child(6)").textContent = optionTableData[i].csd_count ? optionTableData[i].csd_count : '-';
            document.querySelector(".firstCol:nth-child(7)").textContent = optionTableData[i].block_count ? optionTableData[i].block_count : '-';
            document.querySelector(".firstCol:nth-child(8)").textContent = optionTableData[i].scheduling_algorithm ? optionTableData[i].scheduling_algorithm : '-';
        }else{
            document.querySelector(".secondCol:nth-child(1)").style.backgroundColor = metricCompareChartSeries[i].color;
            document.querySelector(".secondCol:nth-child(1)").textContent = optionTableData[i].selected_id;
            document.querySelector(".secondCol:nth-child(2)").textContent = optionTableData[i].option_name;
            document.querySelector(".secondCol:nth-child(3)").textContent = optionTableData[i].dbms;
            document.querySelector(".secondCol:nth-child(4)").textContent = optionTableData[i].storage_type;
            document.querySelector(".secondCol:nth-child(5)").textContent = optionTableData[i].csd_type ? optionTableData[i].csd_type : '-';
            document.querySelector(".secondCol:nth-child(6)").textContent = optionTableData[i].csd_count ? optionTableData[i].csd_count : '-';
            document.querySelector(".secondCol:nth-child(7)").textContent = optionTableData[i].block_count ? optionTableData[i].block_count : '-';
            document.querySelector(".secondCol:nth-child(8)").textContent = optionTableData[i].scheduling_algorithm ? optionTableData[i].scheduling_algorithm : '-';
        }
    }
}

// TPC-H 쿼리 드롭다운 반응
const queryNumbers = Array.from({ length: 22 }, (_, i) => i + 1);
const dropdownMenu = document.querySelector("#dropdownMenu");
const queryTextArea = document.getElementById("queryTextarea");
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

            // 선택한 쿼리 서버로부터 GET
            fetch('/validator/tpch', {
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

const logDeleteButton = document.getElementById("logDelete");

logDeleteButton.addEventListener("click", function() {
    const checkedCheckboxIds = [];

    const checkboxes = document.querySelectorAll('.logCheckBox');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCheckboxIds.push(checkbox.parentNode.parentNode.id);
        }
    });

    console.log(checkedCheckboxIds)

    fetch('/validator/log/delete', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            "validation_id": checkedCheckboxIds
        })
    })
    .then(response => response.json())
    .then(data => {
        checkedCheckboxIds.forEach(rowID => {
            var rowToDelete = document.getElementById(rowID);

            if (rowToDelete) {
                rowToDelete.remove();
            }

            let possibleID = "ID " + rowID;
            const indexOfValue = detailChartCategories.indexOf(possibleID);

            if (indexOfValue != -1) {
                logDeactivateEvent(rowID);
            }
        });
    })
    .catch(error => {
        console.error('Fetch 오류: ', error);
    })
});

// new query 버튼 누르면 쿼리입력창 초기화
const newQueryButton = document.getElementById("newQuery");
newQueryButton.addEventListener("click", function() {
    queryTextArea.value = "";
});

// 옵션 드롭다운 선택 시 동작
const opt_dropdownMenu = document.querySelector(".opt_menu");
const opt_dropdownToggle = document.querySelector(".opt_toggle");
var selectedOptionName = "";
var selectedStorageType = "";

const dbmsInfo = document.getElementById("dbmsInfo");
const storageTypeInfo = document.getElementById("storageTypeInfo");
const csdkindInfo = document.getElementById("csdkindInfo");
const csdCountInfo = document.getElementById("csdCountInfo");
const blockCountInfo = document.getElementById("blockCountInfo");
const algorithmInfo = document.getElementById("algorithmInfo");
var optionID = 0;

opt_dropdownMenu.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("opt_item")) {
        const opt_selectedOption = e.target.textContent;
        opt_dropdownToggle.textContent = opt_selectedOption;
        const opt_selectedOptionID = e.target.value;

        optionID = opt_selectedOptionID;

        if(optionID){
            fetch('/validator/option/get-one', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                body: JSON.stringify({
                    option_id: optionID
                })
            })
            .then(response => response.json())
            .then(data => {
                dbmsInfo.textContent = data[0].dbms_type.toUpperCase(); 
                storageTypeInfo.textContent = data[0].storage_type.toUpperCase();
                csdkindInfo.textContent = data[0].csd_type;
                csdCountInfo.textContent = data[0].csd_count;
                blockCountInfo.textContent = data[0].block_count;
                algorithmInfo.textContent = data[0].scheduling_algorithm;
                selectedOptionName = opt_selectedOption;
                selectedStorageType = data[0].storage_type.toUpperCase();
            })
            .catch(error => {
                console.error('Fetch 오류: ', error);
            });
        }
        else {
            NewOptionmodalLoad();
        }
    }
});

// 새로운 옵션 추가 모달 팝업
function NewOptionmodalLoad(){
    // New Option Modal 초기화
    document.getElementById("NewOptionName").value = "";
    document.getElementById("ssd_selected1").checked = false;
    document.getElementById("csd_selected1").checked = false;
    document.getElementById("new-random").checked = true;
    document.getElementById("new_dbms").value = "mysql";
    document.getElementById("new_csdkind").value = "ngd";
    document.getElementById("newCsdCount").value = "";
    document.getElementById("newBlockCount").value = "";
    document.getElementById("new_using_index").checked = true;

    $(function() {
        $("#validator-newoption").modal("show");
        var modalDiv = $('#validator-newoption');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
}

// 새로운 옵션 입력 후 저장 버튼 클릭 시 동작
function addNewOption() {
    const option_name = document.getElementById("NewOptionName").value;
    var storage_type = '';
    var radios = document.getElementsByName('storage_type');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            storage_type = radios[i].parentNode.querySelector('.form-selectgroup-title').innerText;
            break;
        }
    }

    var dbms_type = document.getElementById("new_dbms").value;
    var csd_type = document.getElementById("new_csdkind").value;
    var csd_count = document.getElementById("newCsdCount").value;
    var block_count = document.getElementById("newBlockCount").value;
    var radioButtons = document.getElementsByName('btn-new-algo');
    var scheduling = '';
    var usingIndex = 0;

    if (document.getElementById("new-random").checked == true) {
        scheduling = "random";
    }
    else if (document.getElementById("new-dcs").checked == true) {
        scheduling = "dcs";
    }
    else if (document.getElementById("new-dsi").checked == true) {
        scheduling = "dsi";
    }
    else {
        scheduling = "auto";
    }
    
    if (document.getElementById("new_using_index").checked == true) {
        usingIndex = 1;
    }
    

    if(storage_type === "SSD") {
        csd_type = '';
        csd_count = '';
        block_count = '';
        scheduling = '';
        usingIndex = '';
    }

    var new_option = {
        option_name: option_name,
        user_id: storeduserInfo.workbench_user_id,
        dbms_type: dbms_type,
        storage_type: storage_type,
        csd_count: csd_count,
        csd_type: csd_type,
        block_count: block_count,
        scheduling_algorithm: scheduling,
        using_index: usingIndex
    }

    console.log(new_option)

    fetch('/validator/option/new', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(new_option)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        getOptionList();
    })
    .catch(error => {
        console.error('Fetch 오류: ', error);
    });
    
}

var new_selected_csdkind = $("#new_csdkind");
var new_SetCsdCount = $("#newCsdCount");
var new_SetBlockCount = $("#newBlockCount");
var new_scheduling_algorithm = $("#new_scheduling_algorithm");
var new_using_index = $("#new_using_index");

$("#csd_selected1").on("change", function() {
    if ($(this).is(":checked")){
        new_selected_csdkind.prop('disabled', false)
        new_SetCsdCount.prop('disabled', false)
        new_SetBlockCount.prop('disabled', false)
        new_using_index.prop('disabled', false)
        new_scheduling_algorithm.prop('disabled', false)
    }
});
$("#ssd_selected1").on("change", function() {
    if ($(this).is(":checked")){
        new_selected_csdkind.prop('disabled', true)
        new_SetCsdCount.prop('disabled', true)
        new_SetBlockCount.prop('disabled', true)
        new_using_index.prop('disabled', true)
        new_scheduling_algorithm.prop('disabled', true)
    }
});

var new_selected_csdkind = $("#new_csdkind");
var new_SetCsdCount = $("#newCsdCount");
var new_SetBlockCount = $("#newBlockCount");
var new_scheduling_algorithm = $("#new_scheduling_algorithm");
var new_using_index = $("#new_using_index");

$("#csd_selected1").on("change", function() {
    if ($(this).is(":checked")){
        new_selected_csdkind.prop('disabled', false)
        new_SetCsdCount.prop('disabled', false)
        new_SetBlockCount.prop('disabled', false)
        new_using_index.prop('disabled', false)
        new_scheduling_algorithm.prop('disabled', false)
    }
});
$("#ssd_selected1").on("change", function() {
    if ($(this).is(":checked")){
        new_selected_csdkind.prop('disabled', true)
        new_SetCsdCount.prop('disabled', true)
        new_SetBlockCount.prop('disabled', true)
        new_using_index.prop('disabled', true)
        new_scheduling_algorithm.prop('disabled', true)
    }
});


// 옵션 수정 버튼 클릭 시 모달
const optSettingButton = document.getElementById("optionSetButton");
const optSettingModal = document.getElementById("validator-optionSettingModal")
const modalContainer = document.getElementById('modalContainer');

optSettingButton.addEventListener('click', function() {
    console.log("Validation option setting")
    envSettingmodalLoad()
});

var selected_csdkind = $("#selected_csdkind");
var SetCsdCount = $("#val_SetCsdCount");
var SetBlockCount = $("#val_SetBlockCount");
var scheduling_algorithm = $("#scheduling_algorithm");
var using_index = $("#using_index");

$("#csd_selected").on("change", function() {
    if ($(this).is(":checked")){
        selected_csdkind.prop('disabled', false)
        SetCsdCount.prop('disabled', false)
        SetBlockCount.prop('disabled', false)
        using_index.prop('disabled', false)
        scheduling_algorithm.prop('disabled', false)
    }
});
$("#ssd_selected").on("change", function() {
    if ($(this).is(":checked")){
        selected_csdkind.prop('disabled', true)
        SetCsdCount.prop('disabled', true)
        SetBlockCount.prop('disabled', true)
        using_index.prop('disabled', true)
        scheduling_algorithm.prop('disabled', true)
    }
});

function envSettingmodalLoad(b){
    
    $(function() {
        var OptionName = $("#inputOptionname");
        var using_index = $("#using_index");
        var ssd_selected = $("#ssd_selected");
        var csd_selected = $("#csd_selected");

        if(selectedStorageType === "CSD" ) {
            csd_selected.prop("checked", true)
        }
        else {
            ssd_selected.prop("checked", true)
        }

        OptionName.val(selectedOptionName);
        $("#validator-optionSettingModal").modal("show");
        var modalDiv = $('#validator-optionSettingModal');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
}

// 옵션 수정 버튼 클릭 시
document.getElementById("optionModify").addEventListener('click', function() {

    const option_name = document.getElementById("inputOptionname").value;
    var storage_type = '';
    var radios = document.getElementsByName('report-type');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            storage_type = radios[i].parentNode.querySelector('.form-selectgroup-title').innerText;
            break;
        }
    }

    var dbms_type = document.getElementById("selected_dbms").value;
    var csd_type = document.getElementById("selected_csdkind").value;
    var csd_count = document.getElementById("val_SetCsdCount").value;
    var block_count = document.getElementById("val_SetBlockCount").value;
    var radioButtons = document.getElementsByName('scheduling_algorithm');
    var scheduling = '';
    var usingIndex = 0;

    if (document.getElementById("modi-random").checked == true) {
        scheduling = "random";
    }
    else if (document.getElementById("modi-dcs").checked == true) {
        scheduling = "dcs";
    }
    else if (document.getElementById("modi-dsi").checked == true) {
        scheduling = "dsi";
    }
    else {
        scheduling = "auto";
    }
    
    if (document.getElementById("using_index").checked == true) {
        usingIndex = 1;
    }
    

    if(storage_type === "SSD") {
        csd_type = '';
        csd_count = '';
        block_count = '';
        scheduling = '';
        usingIndex = '';
    }

    var update_option = {
        option_name: option_name,
        user_id: storeduserInfo.workbench_user_id,
        dbms_type: dbms_type,
        storage_type: storage_type,
        csd_count: csd_count,
        csd_type: csd_type,
        block_count: block_count,
        scheduling_algorithm: scheduling,
        using_index: usingIndex,
        option_id: optionID
    }

    console.log(update_option)

    fetch('/validator/option/update', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(update_option)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        getOptionList();
    })
    .catch(error => {
        console.error('Fetch 오류: ', error);
    });
})

// 옵션 삭제
document.getElementById("optionDelete").addEventListener('click', function() {
    console.log(optionID)
    
    fetch('/validator/option/delete', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            option_id: optionID
        })
    })
    .then(response => {
        console.log(response);
        getOptionList();
    })
    .catch(error => {
        console.error('Fetch 오류: ', error);
    });
})
