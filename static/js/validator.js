document.addEventListener("DOMContentLoaded", function () {  
    //웹서버 로그 요청 전송 (최초)
    // if(true/*response OK*/){
    //     addValidatorLog({}/*response*/);
    // }

    // tablePagenation();//table pagenation 함수 실행
    // $('#validatorLogTableBody').data();
    window.ApexCharts &&
        new ApexCharts(document.getElementById("validationCompareChart1"), validationCompareChart1Option).render();
    window.ApexCharts &&
        new ApexCharts(document.getElementById("validationCompareChart2"), validationCompareChart2Option).render();
    window.ApexCharts &&
        new ApexCharts(document.getElementById("validationCPUChart1"), validationCPUChart1Option).render();
    window.ApexCharts &&
        new ApexCharts(document.getElementById("validationCPUChart2"), validationCPUChart2Option).render();
    window.ApexCharts &&
        new ApexCharts(document.getElementById("validationPowerChart"), validationPowerChartOption).render();
    window.ApexCharts &&
        new ApexCharts(document.getElementById("validationNetworkChart"), validationNetworkChartOption).render();

});

document.getElementById("pushdownButton").addEventListener("click", function () {
    const queryText = document.getElementById("queryTextarea").value.trim();
    // const validatorOption;

    if(queryText){
        //웹서버 시뮬레이터 요청 전송 queryText + validatorOption
        if(true/*response OK*/){
            addValidatorLog(queryText,{}/*response*/);
        }
    }else{
        alert("Insert Query");
    }
});

let chart1Visible = false;
let chart2Visible = false;
let chart3Visible = false;
let chart4Visible = false;

const chart1Div = document.getElementById("validationCompareChart1");
const chart2Div = document.getElementById("validationCompareChart2");
const chart3Div = document.getElementById("validationCPUChart1");
const chart4Div = document.getElementById("validationCPUChart2");

const runButton = document.getElementById("pushdownButton");

let chart1 = null;
let chart2 = null;

runButton.addEventListener("click", function () {
    
    const selectedIDCell1 = document.querySelector(".data1:nth-child(1)");
    const optionNameCell1 = document.querySelector(".data1:nth-child(2)");
    const dbmsCell1 = document.querySelector(".data1:nth-child(3)");
    const storateTypeCell1 = document.querySelector(".data1:nth-child(4)");
    const csdKindCell1 = document.querySelector(".data1:nth-child(5)");
    const csdCountCell1 = document.querySelector(".data1:nth-child(6)");
    const blockCountCell1 = document.querySelector(".data1:nth-child(7)");
    const algorithmCell1 = document.querySelector(".data1:nth-child(8)");

    const selectedIDCell2 = document.querySelector(".data2:nth-child(1)");
    const optionNameCell2 = document.querySelector(".data2:nth-child(2)");
    const dbmsCell2 = document.querySelector(".data2:nth-child(3)");
    const storateTypeCell2 = document.querySelector(".data2:nth-child(4)");
    const csdKindCell2 = document.querySelector(".data2:nth-child(5)");
    const csdCountCell2 = document.querySelector(".data2:nth-child(6)");
    const blockCountCell2 = document.querySelector(".data2:nth-child(7)");
    const algorithmCell2 = document.querySelector(".data2:nth-child(8)");


    if (!chart1Visible && !chart3Visible) {
        chart1Visible = true;
        chart3Visible = true;

        chart1Div.style.display = "block";
        chart3Div.style.display = "block";
        chart2Div.style.display = "none";        
        chart4Div.style.display = "none";

        selectedIDCell1.textContent = "1";
        selectedIDCell1.style.backgroundColor = "#78b86fff";
        optionNameCell1.textContent = "Pushdown Option"
        dbmsCell1.textContent = "MySQL"; 
        storateTypeCell1.textContent = "CSD";
        csdKindCell1.textContent = "NGD";
        csdCountCell1.textContent = "8";
        blockCountCell1.textContent = "15";
        algorithmCell1.textContent = "CSD Metric Score";

    } else {
        chart1Visible = false;
        chart2Visible = true;
        chart3Visible = false;
        chart4Visible = true;

        chart2Div.style.display = "block";        
        chart4Div.style.display = "block";

        selectedIDCell2.textContent = "2";
        selectedIDCell2.style.backgroundColor = "#e6c333ff";
        optionNameCell2.textContent = "Non Pushdown Option"
        dbmsCell2.textContent = "MySQL"; 
        storateTypeCell2.textContent = "SSD";
        csdKindCell2.textContent = "-";
        csdCountCell2.textContent = "-";
        blockCountCell2.textContent = "-";
        algorithmCell2.textContent = "-";

        setTimeout(function () {
            chart1Div.style.display = "none";
            chart3Div.style.display = "none";
        }, 500);
    }
});

// TPC-H 쿼리 드롭다운 반응
const queryNumbers = Array.from({ length: 22 }, (_, i) => i + 1);
const dropdownMenu = document.querySelector(".dropdown-menu");
const queryTextArea = document.getElementById("queryTextarea");
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

            // 선택한 쿼리 서버로부터 GET
            fetch('/validator/get_tpchQuery', {
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

opt_dropdownMenu.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("opt_item")) {
        const opt_selectedOption = e.target.textContent;
        opt_dropdownToggle.textContent = opt_selectedOption;

        if (opt_selectedOption === "Pushdown Option Set") {
            dbmsInfo.textContent = "MySQL"; 
            storageTypeInfo.textContent = "CSD";
            csdkindInfo.textContent = "NGD";
            csdCountInfo.textContent = "8";
            blockCountInfo.textContent = "15";
            algorithmInfo.textContent = "CSD Metric Score";
            selectedOptionName = opt_selectedOption;
            selectedStorageType = "CSD";

        } else if (opt_selectedOption === "Non Pushdown Option Set") {
            dbmsInfo.textContent = "MySQL"; 
            storageTypeInfo.textContent = "SSD";
            csdkindInfo.textContent = "-";
            csdCountInfo.textContent = "-";
            blockCountInfo.textContent = "-";
            algorithmInfo.textContent = "-";
            selectedOptionName = opt_selectedOption;
            selectedStorageType = "SSD";
        } else{
            // 새로운 옵션 추가 모달 창
            NewOptionmodalLoad();
        }
    }
});

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



// 옵션 수정 버튼 클릭 시 동작
const optSettingButton = document.getElementById("optionSetButton");
const optSettingModal = document.getElementById("validator-optionSettingModal")
const modalContainer = document.getElementById('modalContainer');

optSettingButton.addEventListener('click', function() {
    envSettingmodalLoad()
});

var selected_csdkind = $("#selected_csdkind");
var SetCsdCount = $("#SetCsdCount");
var SetBlockCount = $("#SetBlockCount");
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





const validationCPUChartBtn = document.getElementById("validationCPUChartBtn");
const validationPowerChartBtn = document.getElementById("validationPowerChartBtn");
const validationNetworkChartBtn = document.getElementById("validationNetworkChartBtn");

const validationCPUChartContainer = document.getElementById("validationCPUChartContainer");
const validationPowerChartContainer = document.getElementById("validationCPUChartContainer");
const validationNetworkChartContainer = document.getElementById("validationCPUChartContainer");

validationCPUChartBtn.addEventListener("click", function () {
    validationCPUChartContainer.style.display = "block";        
    validationPowerChartContainer.style.display = "none";
    validationNetworkChartContainer.style.display = "none";
});

validationPowerChartBtn.addEventListener("click", function () {
    validationCPUChartContainer.style.display = "none";        
    validationPowerChartContainer.style.display = "block";
    validationNetworkChartContainer.style.display = "none";
});

validationNetworkChartBtn.addEventListener("click", function () {
    validationCPUChartContainer.style.display = "none";        
    validationPowerChartContainer.style.display = "none";
    validationNetworkChartContainer.style.display = "block";
});
