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
    document.cookie = `instance_name=keti-opencsd; path=/; samsite=lax`;
    const userId = getCookie("user_id");
    if (userId) {

        document.getElementById("user_info").textContent = userId;
    }
    // 드롭다운 항목과 컨테이너 엘리먼트 참조
    const detailMetricDropdown = document.querySelector("#detailMetricDropdown");
    const detailMetricDropdownItems = document.querySelectorAll(".detailMetricDropdownItem");

    // 차트 컨테이너 목록
    const chartContainers = {
        CPU: document.querySelector("#detailCPU"),
        Power: document.querySelector("#detailPower"),
        Network: document.querySelector("#detailNetwork"),
        Time: document.querySelector("#detailTime"),
    };

    // 드롭다운 항목 클릭 이벤트 리스너 추가
    detailMetricDropdownItems.forEach(function (item) {
        item.addEventListener("click", function () {
            // 드롭다운 버튼의 텍스트 변경
            detailMetricDropdown.textContent = item.textContent;

            // 모든 차트 숨기기
            Object.values(chartContainers).forEach(function (container) {
                container.style.display = "none";
            });

            // 선택된 차트만 보이기
            const selectedChart = chartContainers[item.textContent];
            if (selectedChart) {
                selectedChart.style.display = "block";
            } else {
                console.error("Unknown chart type:", item.textContent);
            }
            drawChart();
        });
    });

    metricCompareChart = new ApexCharts(document.getElementById("metricCompare"), metricCompareChartOption);
    detailCPUChart = new ApexCharts(document.getElementById("detailCPU"), detailCPUChartOption);
    detailPowerChart = new ApexCharts(document.getElementById("detailPower"), detailPowerChartOption);
    detailNetworkChart = new ApexCharts(document.getElementById("detailNetwork"), detailNetworkChartOption);
    detailTimeChart = new ApexCharts(document.getElementById("detailTime"), detailTimeChartOption);

    //detailChart = new ApexCharts(document.getElementById("detailChart"), detailChartOption);

    metricCompareChart.render();
    detailCPUChart.render();
    detailPowerChart.render();
    detailNetworkChart.render();
    detailTimeChart.render();
    //detailChart.render();
    //console.log(detailChart)

    drawLogTable();
    getOptionList();
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

// new query 버튼 누르면 쿼리입력창 초기화
const newQueryButton = document.getElementById("newQuery");
newQueryButton.addEventListener("click", function () {
    queryTextArea.value = "";
});

const runButton = document.getElementById("runButton");

runButton.addEventListener("click", function () {
    const user_id = getCookie("user_id");
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");
    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }
    var queryText = dropdownToggle.textContent;
    console.log(queryText);
    runButton.disabled = true;

    fetch('/validator/run', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            "User_ID": user_id,
            "Query_Statement": queryText,
            "Option_ID": optionID,
            node_ip,
            instance_name
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("run data", data);
            runButton.disabled = false;
            addValidatorLog(data);
            updateChartData(data[0]);
            drawChart();
            updateOptionTableData(data[0].validation_id, optionID);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('An error occurred while processing your request.');
            runButton.disabled = false;
        });
});

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


// 옵션 드롭다운 리스트 불러오기
function getOptionList() {
    clearOptionDropdown();
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");
    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }

    fetch('/validator/option/get-all', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            instance_name,
            node_ip
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("getOptionList() ", data);
            var dropdown = document.querySelector(".opt_menu");

            data.forEach(function (item) {
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

function clearOptionDropdown() {
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
let selected_option = {}

function updateOptionTableData(validationID, optionID) {
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");

    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }
    fetch('/validator/option/get-one', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            'option_id': optionID,
            node_ip,
            instance_name
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("updateOptionTableData ", data);
            selected_option = {
                selected_id: validationID,
                option_name: data[0].option_name,
                dbms: data[0].dbms_type,
                storage_type: data[0].storage_type,
                csd_type: data[0].csd_type,
                csd_count: data[0].csd_count,
                block_count: data[0].block_count,
                scheduling_algorithm: data[0].scheduling_algorithm,


            }

            optionTableData.push(selected_option);

            if (optionTableData.length == 3) {
                optionTableData.shift();
            }

            drawOptionTable();
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        })
}

// 옵션 드롭다운 선택 시 동작
const opt_dropdownMenu = document.querySelector(".opt_menu");
const opt_dropdownToggle = document.querySelector(".opt_toggle");
var selectedOptionName = "";
var selectedStorageType = "";

const dbName = document.getElementById("dbName");
const dbmsInfo = document.getElementById("dbmsInfo");
const storageTypeInfo = document.getElementById("storageTypeInfo");
const csdkindInfo = document.getElementById("csdkindInfo");
const csdCountInfo = document.getElementById("csdCountInfo");
const blockCountInfo = document.getElementById("blockCountInfo");
const algorithmInfo = document.getElementById("algorithmInfo");
const index = document.getElementById("index");

var optionID = 0;
opt_dropdownMenu.addEventListener("click", function (e) {
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");
    const db_name = getCookie("db_name");
    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }
    if (e.target && e.target.classList.contains("opt_item")) {
        const opt_selectedOption = e.target.textContent;
        opt_dropdownToggle.textContent = opt_selectedOption;
        const opt_selectedOptionID = e.target.value;

        optionID = opt_selectedOptionID;

        if (optionID) {
            fetch('/validator/option/get-one', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                body: JSON.stringify({
                    option_id: optionID,
                    node_ip,
                    instance_name,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("dropdown data ", data);
                    selected_option = {
                        db_name: db_name,
                        dbms_info: data[0].dbms_type,
                        storage_type_info: data[0].storage_type,
                        csd_kind_info: data[0].csd_type,
                        csd_count_info: data[0].csd_count,
                        block_count_info: data[0].block_count,
                        scheduling_algorithm: data[0].scheduling_algorithm,

                    }
                    dbName.textContent = db_name.toUpperCase();
                    dbmsInfo.textContent = data[0].dbms_type.toUpperCase();
                    storageTypeInfo.textContent = data[0].storage_type.toUpperCase();
                    csdkindInfo.textContent = data[0].csd_type ? data[0].csd_type.toUpperCase() : "-";
                    csdCountInfo.textContent = data[0].csd_count ? data[0].csd_count : "-";
                    blockCountInfo.textContent = data[0].block_count ? data[0].block_count : "-";
                    algorithmInfo.textContent = data[0].scheduling_algorithm ? data[0].scheduling_algorithm.toUpperCase() : "-";
                    selectedOptionName = opt_selectedOption;
                    selectedStorageType = data[0].storage_type.toUpperCase();
                    index.textContent = data[0].using_index ? "Use" : "Not Use";
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
function NewOptionmodalLoad() {
    // New Option Modal 초기화
    document.getElementById("NewOptionName").value = "";
    document.getElementById("ssd_selected1").checked = false;
    document.getElementById("csd_selected1").checked = false;
    document.getElementById("new-dcs").checked = true;
    document.getElementById("new_dbms").value = "mysql";
    document.getElementById("new_csdkind").value = "NGD";
    document.getElementById("newCsdCount").value = "";
    document.getElementById("newBlockCount").value = "";

    $(function () {
        $("#validator-newoption").modal("show");
        var modalDiv = $('#validator-newoption');
        modalDiv.modal({
            backdrop: true,
            show: true
        });
    });
}
let envData = {};

function getEnvironmentInfo() {

    //get
    const userId = getCookie("user_id");
    const nodeIp = getCookie("node_ip");
    //env info
    const dbName = getCookie("db_name"); //tpch_origin
    const dbmsType = getCookie("instance_type"); //opencsd
    const storageType = getCookie("storage_type"); //csd

    let accessPort = getCookie("access_port");
    // node_ip와 access_port 값이 없을 경우 예외 처리
    if (!accessPort) {
        accessPort = 30100;
    }
    if (!nodeIp || !accessPort) {
        console.error("node_ip 또는 access_port가 쿠키에서 누락되었습니다.");
        return;
    }
    if (userId) {
        document.getElementById("user_info").textContent = userId;
    }
    const apiUrl = `http://${nodeIp}:${accessPort}/metadata/environment?db-name=` + dbName;

    fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => { //block_count, db_size, scheduling_algorithm, using_index; ++csd_count, csd_vendor
            // 쿠키 데이터를 DOM에 설정
            console.log("env data ", data);
            envData = {
                dbName: dbName,
                dbmsType: dbmsType,
                storageType: storageType,
                csdCount: data.csd_count || 8,
                csdVendor: data.csd_vendor || "NGD System",
                dbsize: data.db_size ? Math.trunc(data.db_size) + " (MB)" : "-",
                blockCount: data.block_count || "-",
                schedulingAlgorithm: data.scheduling_algorithm || "-",
                usingIndex: data.using_index
            };

        })
        .catch(error => {
            console.error('Fetch 오류: ', error);
        });
}
// 새로운 옵션 입력 후 저장 버튼 클릭 시 동작
function addNewOption() {
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");
    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }
    const option_name = document.getElementById("NewOptionName").value;
    var storage_type = '';
    var radios = document.getElementsByName('storage_type');

    // SSD/CSD 선택 여부 확인
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
    getEnvironmentInfo();
    var usingIndex = envData.usingIndex ? true : false;
    console.log("usingIndex ", envData.usingIndex);
    if (document.getElementById("new-auto").checked == true) {
        scheduling = "auto";
    }
    else if (document.getElementById("new-dcs").checked == true) {
        scheduling = "dcs";
    }
    else if (document.getElementById("new-dsi").checked == true) {
        scheduling = "dsi";
    }
    else {
        scheduling = "dfa";
    }

    if (storage_type === "SSD") {
        csd_type = '';
        csd_count = '';
        block_count = '';
        scheduling = '';
    }

    var new_option = {
        option_name: option_name,
        dbms_type: dbms_type,
        storage_type: storage_type,
        csd_count: csd_count,
        csd_type: csd_type,
        block_count: block_count,
        scheduling_algorithm: scheduling,
        using_index: usingIndex,
        instance_name: instance_name,
        node_ip: node_ip,
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
            console.log("option post ", data);
            getOptionList();
        })
        .catch(error => {
            console.error('Fetch 오류: ', error);
        });

}


// 옵션 수정 버튼 클릭 시 모달
const optSettingButton = document.getElementById("optionSetButton");
const optSettingModal = document.getElementById("validator-optionSettingModal")
const modalContainer = document.getElementById('modalContainer');

optSettingButton.addEventListener('click', function () {
    console.log("Validation option setting")
    envSettingmodalLoad()
});

var selected_csdkind = $("#selected_csdkind");
var SetCsdCount = $("#val_SetCsdCount");
var SetBlockCount = $("#val_SetBlockCount");
var scheduling_algorithm = $("#scheduling_algorithm");

$("#csd_selected").on("change", function () {
    if ($(this).is(":checked")) {
        selected_csdkind.prop('disabled', false)
        SetCsdCount.prop('disabled', false)
        SetBlockCount.prop('disabled', false)
        scheduling_algorithm.prop('disabled', false)
    }
});
$("#ssd_selected").on("change", function () {
    if ($(this).is(":checked")) {
        selected_csdkind.prop('disabled', true)
        SetCsdCount.prop('disabled', true)
        SetBlockCount.prop('disabled', true)
        scheduling_algorithm.prop('disabled', true)
    }
});
var new_dbms = $("#new_csdkind");
var new_csdkind = $("#new_csdkind");
var newCsdCount = $("#newCsdCount");
var newBlockCount = $("#newBlockCount");
var new_scheduling_algorithm = $("#new_scheduling_algorithm");
$("#csd_selected1").on("change", function () {
    if ($(this).is(":checked")) {
        new_csdkind.prop('disabled', false).val("1")
        new_csdkind.prop('disabled', false)
        newCsdCount.prop('disabled', false)
        newBlockCount.prop('disabled', false)
        $("#scheduling_label").css("display", "block");
        new_scheduling_algorithm.prop('disabled', false).css("display", "flex");
        $("#new_dbms option[value='1']").hide();
        $("#new_dbms option[value='2']").hide();
        $("#new_dbms option[value='3']").show();

    }
});
$("#ssd_selected1").on("change", function () {
    if ($(this).is(":checked")) {
        new_csdkind.prop('disabled', false).val("2")
        new_csdkind.prop('disabled', true)
        newCsdCount.prop('disabled', true)
        newBlockCount.prop('disabled', true)
        $("#scheduling_label").css("display", "none");
        new_scheduling_algorithm.prop('disabled', true).css("display", "none");
        $("#new_dbms option[value='1']").show();
        $("#new_dbms option[value='2']").show();
        $("#new_dbms option[value='3']").hide();
    }
});

function envSettingmodalLoad(b) {

    $(function () {
        var OptionName = $("#inputOptionname");


        if (selectedStorageType === "CSD") {
            setCSDOption();

        } else {
            setSSDOption();

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
function setCSDOption() {
    const selected_csdkind_element = document.getElementById("selected_csdkind");
    const selected_dbms_element = document.getElementById("selected_dbms");
    const val_SetCsdCount_element = document.getElementById("val_SetCsdCount");
    const val_SetBlockCount_element = document.getElementById("val_SetBlockCount");
    const scheduling_label_div = document.getElementById("scheduling_label");
    const scheduling_algorithm_div = document.getElementById("scheduling_algorithm");
    let algo_radio;
    if (selected_option.scheduling_algorithm == "dfa") {
        algo_radio = document.getElementById("modi-dfa");
        algo_radio.checked = true;
    } else if (selected_option.scheduling_algorithm == "dsi") {
        algo_radio = document.getElementById("modi-dsi");
        algo_radio.checked = true;
    } else if (selected_option.scheduling_algorithm == "auto") {
        algo_radio = document.getElementById("modi-auto");
        algo_radio.checked = true;
    } else {
        algo_radio = document.getElementById("modi-dcs");
        algo_radio.checked = true;
    }

    selected_csdkind_element.value = "NGD";
    document.getElementById("csd_selected").checked = true; // 체크 선택
    const ssd_selected_element = document.getElementById("ssd_selected");
    ssd_selected_element.disabled = true; // 비활성화
    ssd_selected_element.closest('.form-selectgroup-item').querySelector('.form-selectgroup-label').style.backgroundColor = "#f6f8fb";
    selected_dbms_element.value = 3;
    selected_dbms_element.disabled = true;
    val_SetCsdCount_element.value = 8;
    val_SetCsdCount_element.disabled = false;
    val_SetBlockCount_element.value = 15;
    val_SetBlockCount_element.disabled = false;

    scheduling_label_div.style.display = "block";
    scheduling_algorithm_div.style.display = "flex";

}
function setSSDOption() {
    const selected_csdkind_element = document.getElementById("selected_csdkind");
    const selected_dbms_element = document.getElementById("selected_dbms");
    const val_SetCsdCount_element = document.getElementById("val_SetCsdCount");
    const val_SetBlockCount_element = document.getElementById("val_SetBlockCount");
    const scheduling_label_div = document.getElementById("scheduling_label");
    const scheduling_algorithm_div = document.getElementById("scheduling_algorithm");

    selected_csdkind_element.value = "Samsung";
    document.getElementById("ssd_selected").checked = true;
    const csd_selected_element = document.getElementById("csd_selected");
    csd_selected_element.disabled = true;
    selected_dbms_element.disabled = false;
    csd_selected_element.closest('.form-selectgroup-item').querySelector('.form-selectgroup-label').style.backgroundColor = "#f6f8fb";
    selected_dbms_element.value = 1;

    val_SetCsdCount_element.value = 0;
    val_SetCsdCount_element.disabled = true;

    val_SetBlockCount_element.value = 0;
    val_SetBlockCount_element.disabled = true;

    scheduling_label_div.style.display = "none";
    scheduling_algorithm_div.style.display = "none";

    const openCSDOption = selected_dbms_element.querySelector('option[value="3"]');
    if (openCSDOption) {
        openCSDOption.style.display = "none"; // 선택지는 남겨두되 숨김
    }
}
// 옵션 수정 버튼 클릭 시
document.getElementById("optionModify").addEventListener('click', function () {
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");
    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }
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

    if (document.getElementById("modi-dfa").checked == true) {
        scheduling = "dfa";
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


    if (storage_type === "SSD") {
        csd_type = '';
        csd_count = '';
        block_count = '';
        scheduling = '';
        usingIndex = '';
    }
    var update_option = {
        option_name: option_name,
        dbms_type: dbms_type,
        storage_type: storage_type,
        csd_count: csd_count,
        csd_type: csd_type,
        block_count: block_count,
        scheduling_algorithm: scheduling,
        using_index: usingIndex,
        option_id: optionID,
        instance_name: instance_name,
        node_ip: node_ip
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
document.getElementById("optionDelete").addEventListener('click', function () {
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");
    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }
    console.log(optionID)

    fetch('/validator/option/delete', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            option_id: optionID,
            node_ip,
            instance_name
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





function drawLogTable() {
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");
    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }
    fetch('/validator/log/get-all', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            instance_name,
            node_ip
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

function updateChartData(data) {
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

    if (metricCompareChartSeries.length == 0) {
        color = "#78b86fff";
        compareMetric = {
            name: id,
            data: [100, 100, 100, 100],
            color: color
        }
    } else {
        if (metricCompareChartSeries[metricCompareChartSeries.length - 1].color == "#e6c333ff") {
            color = "#78b86fff";
        } else {
            color = "#e6c333ff";
        }

        var compareMetricDataFirst = [], compareMetricDataSecond = [];

        for (let i = 0; i < 4; i++) {
            let first = metricCompareChartSeriesReal[metricCompareChartSeriesReal.length - 1].data[i];
            let second = compareMetricReal.data[i];

            if (first > second) {
                let ratio = Math.round((second / first) * 100);
                compareMetricDataFirst.push(100);
                compareMetricDataSecond.push(ratio);
            } else if (first < second) {
                let ratio = Math.round((first / second) * 100);
                compareMetricDataFirst.push(ratio);
                compareMetricDataSecond.push(100);
            } else {
                compareMetricDataFirst.push(100);
                compareMetricDataSecond.push(100);
            }

            compareMetric = {
                name: id,
                data: compareMetricDataSecond,
                color: color
            }
            metricCompareChartSeries[metricCompareChartSeries.length - 1].data = compareMetricDataFirst;
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
    if (metricCompareChartSeries.length == 3) {
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

function drawChart() {
    metricCompareChart.updateOptions({
        series: metricCompareChartSeries
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

    console.log("Charts updated successfully.");
}

function logClickEvent(queryCell) {
    if (queryCell.clicked) {
        queryCell.style.backgroundColor = "#fcfdfe";
        logDeactivateEvent(queryCell.parentNode.id);
    } else {
        queryCell.style.backgroundColor = "#f6f8fb";
        logActivateEvent(queryCell.parentNode.id);
    }
    queryCell.clicked = !queryCell.clicked;
}

function logActivateEvent(validationID) {
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");
    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }

    fetch('/validator/log/get-one', { //html 화면 내에서 가져올 수 있을듯
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            instance_name,
            node_ip,
            'validation_id': validationID
        })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            updateChartData(data[0]);
            drawChart();
            updateOptionTableData(validationID, data[0].option_id);
            queryTextArea.value = data[0].query_statement;
            // console.log(data[0])
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        })
}

function logDeactivateEvent(validationID) {
    deleteFromChart(validationID);
    drawChart();
    drawOptionTable();
}

function deleteFromChart(validationID) {
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

    if (metricCompareChartSeries.length == 1) {
        metricCompareChartSeries[0].data = [100, 100, 100, 100];
    }
}

function drawOptionTable() {
    var tbody = document.querySelector('.simul_tbody');
    var allTdElements = tbody.querySelectorAll('td');

    allTdElements.forEach(function (td) {
        document.querySelector(".firstCol:nth-child(1)").style.backgroundColor = "rgb(252, 253, 254)";
        document.querySelector(".secondCol:nth-child(1)").style.backgroundColor = "rgb(252, 253, 254)";
        td.textContent = '-';
    });
    for (var i = 0; i < optionTableData.length; i++) {
        if (i == 0) {
            document.querySelector(".firstCol:nth-child(1)").style.backgroundColor = metricCompareChartSeries[i].color;
            document.querySelector(".firstCol:nth-child(1)").textContent = optionTableData[i].selected_id;
            document.querySelector(".firstCol:nth-child(2)").textContent = optionTableData[i].option_name;
            document.querySelector(".firstCol:nth-child(3)").textContent = optionTableData[i].dbms;
            document.querySelector(".firstCol:nth-child(4)").textContent = optionTableData[i].storage_type;
            document.querySelector(".firstCol:nth-child(5)").textContent = optionTableData[i].csd_type ? optionTableData[i].csd_type : '-';
            document.querySelector(".firstCol:nth-child(6)").textContent = optionTableData[i].csd_count ? optionTableData[i].csd_count : '-';
            document.querySelector(".firstCol:nth-child(7)").textContent = optionTableData[i].block_count ? optionTableData[i].block_count : '-';
            document.querySelector(".firstCol:nth-child(8)").textContent = optionTableData[i].scheduling_algorithm ? optionTableData[i].scheduling_algorithm : '-';
        } else {
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


const logDeleteButton = document.getElementById("logDelete");

logDeleteButton.addEventListener("click", function () {
    var instance_name = getCookie("instance_name");
    const node_ip = getCookie("node_ip");
    if (instance_name === "keti-opencsd") {
        instance_name = "keti_opencsd";
    }
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
            "validation_id": checkedCheckboxIds,
            instance_name,
            node_ip
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


