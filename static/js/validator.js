// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

var metricCompareChart, metricCompareChartSeries = [], metricCompareChartSeriesReal = [];
var detailCPUChart, detailCPUChartSeries = [];
var detailPowerChart, detailPowerChartSeries = [];
var detailNetworkChart, detailNetworkChartSeries = [];
var detailTimeChart, detailTimeChartSeries = [];
var detailChartCategories = [], optionTableData = [];

document.addEventListener("DOMContentLoaded", function () { 
    viewUserID();

    metricCompareChart = new ApexCharts(document.getElementById("metricCompare"), metricCompareChartOption);
    detailCPUChart = new ApexCharts(document.getElementById("detailCPU"), detailCPUChartOption);
    detailPowerChart = new ApexCharts(document.getElementById("detailPower"), detailPowerChartOption);
    detailNetworkChart = new ApexCharts(document.getElementById("detailNetwork"), detailNetworkChartOption);
    detailTimeChart = new ApexCharts(document.getElementById("detailTime"), detailTimeChartOption);

    metricCompareChart.render();
    detailCPUChart.render();
    detailPowerChart.render();
    detailNetworkChart.render();
    detailTimeChart.render();

    drawLogTable();
});

// 유저 아이디 
function viewUserID(){
    const user_id = document.getElementById("user_info");
    user_id.textContent = "User : " + storeduserInfo.workbench_user_id;
}

const detailMetricDropdown = document.querySelector("#detailMetricDropdown");
const detailMetricDropdownItems = document.querySelectorAll(".detailMetricDropdownItem");

detailMetricDropdownItems.forEach(function(item) {
    item.addEventListener("click", function() {
        detailMetricDropdown.text = item.textContent;

        //visibility:hidden 상태와 visibility:visible

        //보여지는거 해결좀

        // detailCPUChart.updateOptions({ chart: { foreColor: '#000000' } });
        // detailPowerChart.updateOptions({ chart: { foreColor: '#000000' } });

        detailCPU.style.display = "none"; 
        detailPower.style.display = "none"; 
        detailNetwork.style.display = "none"; 
        detailTime.style.display = "none"; 

        if(item.textContent == "Power"){
            detailPower.style.display = "block"; 
            detailPowerChart.render();
        }else if(item.textContent == "Network"){
            detailNetwork.style.display = "block"; 
            detailNetworkChart.render()
        }else if(item.textContent == "Time"){ 
            detailTime.style.display = "block"; 
            detailTimeChart.render()
        }else{//"CPU"
            detailCPU.style.display = "block"; 
            detailCPUChart.render()
        }
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


const runButton = document.getElementById("runButton");

runButton.addEventListener("click", function () {
    var queryText = dropdownToggle.textContent;
    console.log(queryText);

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
    var compareMetric, compareMetricReal, cpuMetric, powerMetric, networkMetric, executionTime;
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
    detailCPUChartSeries.push(cpuMetric);
    detailPowerChartSeries.push(powerMetric);
    detailNetworkChartSeries.push(networkMetric);
    detailTimeChartSeries.push(executionTime);
    detailChartCategories.push(id);

    if(metricCompareChartSeries.length == 3){
        metricCompareChartSeriesReal.shift();
        metricCompareChartSeries.shift();
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
        // console.log(queryCell.style.backgroundColor);
        queryCell.style.backgroundColor = "#f6f8fb";
        logDeactivateEvent(queryCell.id)
        // console.log(queryCell.style.backgroundColor);
    }else{
        // console.log(queryCell.style.backgroundColor);
        logActivateEvent(queryCell.id);
        queryCell.style.backgroundColor = "#fcfdfe";
        // console.log(queryCell.style.backgroundColor);
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

function deleteFromChart(validationID){
    var lookupID = "ID " + validationID;
    let index = detailChartCategories.indexOf(lookupID);
    metricCompareChartSeriesReal.splice(index, 1);
    metricCompareChartSeries.splice(index, 1);
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
        
        if (opt_selectedOption === "Pushdown Option Set") {
            optionID = 0;
        } else if (opt_selectedOption === "Non Pushdown Option Set") {
            optionID = 1;
        } else{
            // 새로운 옵션 추가 모달 창
            NewOptionmodalLoad();
        }

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
});

// 새로운 옵션 추가 모달
function NewOptionmodalLoad(b){
    $(function() {
        $("#validator-newoption").modal("show");
        var modalDiv = $('#validator-newoption');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
}
var new_selected_csdkind = $("#new_csdkind");
var new_SetCsdCount = $("#newCsdCount");
var new_SetBlockCount = $("#newBlockCount");
var new_scheduling_algorithm = $("#new_scheduling_algorithm");
var new_using_index = $("#new_using_index");

$("#csd_selected1").on("change", function() {
    if ($(this).is(":checked")){
        console.log("CSD Checked")
        new_selected_csdkind.prop('disabled', false)
        new_SetCsdCount.prop('disabled', false)
        new_SetBlockCount.prop('disabled', false)
        new_using_index.prop('disabled', false)
        new_scheduling_algorithm.prop('disabled', false)
    }
});
$("#ssd_selected1").on("change", function() {
    if ($(this).is(":checked")){
        console.log("SSD Checked")
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
        console.log("CSD Checked")
        new_selected_csdkind.prop('disabled', false)
        new_SetCsdCount.prop('disabled', false)
        new_SetBlockCount.prop('disabled', false)
        new_using_index.prop('disabled', false)
        new_scheduling_algorithm.prop('disabled', false)
    }
});
$("#ssd_selected1").on("change", function() {
    if ($(this).is(":checked")){
        console.log("SSD Checked")
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
        console.log("CSD Checked")
        selected_csdkind.prop('disabled', false)
        SetCsdCount.prop('disabled', false)
        SetBlockCount.prop('disabled', false)
        using_index.prop('disabled', false)
        scheduling_algorithm.prop('disabled', false)
    }
});
$("#ssd_selected").on("change", function() {
    if ($(this).is(":checked")){
        console.log("SSD Checked")
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
