let intervalId;
var hostServerCPUChart, hostServerCPUChartData, hostServerCPUChartCategories;
var hostServerPowerChart, hostServerPowerChartData, hostServerPowerChartCategories;

//임시값들----
var tempCPUUpdate = [1,3.1,3.2,3.1,3.1,3.1,3.1,3.1,3.3,3.1,3.2,3.1,3.1,3.2,3.1,3.2,3.2,3.2,3.2,3.2];
var tempPowerUpdate = [74,103,103,106,107,104,104,104,106,106,106,106,106,106,106,106,106,106,106,106];
var clicked = false;
let tempNum = 0;
let temp = true;
//------------

document.addEventListener("DOMContentLoaded", function () {
    // getLatestChartData();//값 가져오는 코드

    hostServerCPUChart = new ApexCharts(document.getElementById("queryHostServerCPU"), hostServerCPUChartOption);
    hostServerPowerChart = new ApexCharts(document.getElementById("queryHostServerPower"), hostServerPowerChartOption);

    hostServerCPUChart.render();
    hostServerPowerChart.render();

    updateLatestChart();

    startInterval();
});

function getLatestChartData(){
    //최신 차트 값을 가져오는 로직 (현재는 임시, 웹서버 요청 보내기)
    if(temp){
        hostServerCPUChartData = [1,1,1,1,1,1,1,1,1,1];//초기값 임시 저장
        hostServerPowerChartData = [74,74,74,74,74,74,74,74,74,74];
        hostServerCPUChartCategories = ['16:58:03', '16:58:06', '16:58:09', '16:58:12', '16:58:15', '16:58:18', '16:58:21', '16:58:24', '16:58:27', '16:58:30'];
        hostServerPowerChartCategories = ['16:58:03', '16:58:06', '16:58:09', '16:58:12', '16:58:15', '16:58:18', '16:58:21', '16:58:24', '16:58:27', '16:58:30'];
        
        hostServerCPUChartOption.series[0].data = hostServerCPUChartData;
        hostServerPowerChartOption.series[0].data = hostServerPowerChartData;
    
        hostServerCPUChartOption.xaxis.categories = hostServerCPUChartCategories;
        hostServerPowerChartOption.xaxis.categories = hostServerPowerChartCategories;

        temp = false;
    }else{
        hostServerCPUChartData = hostServerCPUChart.w.globals.series[0];
        hostServerCPUChartCategories = hostServerCPUChart.w.globals.categoryLabels; 

        hostServerPowerChartData = hostServerPowerChart.w.globals.series[0];
        hostServerPowerChartCategories = hostServerPowerChart.w.globals.categoryLabels;

        hostServerCPUChartData.push(tempCPUUpdate[tempNum]);
        hostServerCPUChartData.shift();

        hostServerPowerChartData.push(tempPowerUpdate[tempNum]);
        hostServerPowerChartData.shift();

        if(clicked){
            tempNum++;
        }

        lastTime = hostServerCPUChartCategories[9];
        timeParts = lastTime.split(':');
        hours = parseInt(timeParts[0], 10);
        minutes = parseInt(timeParts[1], 10);
        seconds = parseInt(timeParts[2], 10);
        seconds += 3;
        if (seconds >= 60) {
            seconds -= 60;
            minutes++;
            if (minutes >= 60) {
                minutes -= 60;
                hours++;
            }
        }
        updatedTime = hours.toString().padStart(2, '0') + ':' +
                        minutes.toString().padStart(2, '0') + ':' +
                        seconds.toString().padStart(2, '0');
        hostServerCPUChartCategories.push(updatedTime);
        hostServerCPUChartCategories.shift();

        lastTime = hostServerPowerChartCategories[9];
        timeParts = lastTime.split(':');
        hours = parseInt(timeParts[0], 10);
        minutes = parseInt(timeParts[1], 10);
        seconds = parseInt(timeParts[2], 10);
        seconds += 3;
        if (seconds >= 60) {
            seconds -= 60;
            minutes++;
            if (minutes >= 60) {
                minutes -= 60;
                hours++;
            }
        }
        updatedTime = hours.toString().padStart(2, '0') + ':' +
                        minutes.toString().padStart(2, '0') + ':' +
                        seconds.toString().padStart(2, '0');
        hostServerPowerChartCategories.push(updatedTime);
        hostServerPowerChartCategories.shift();
    }
}

function getQueryChartData(){
    //쿼리가 돌때의 시간에 해당하는 차트값만 가져오는 로직
    hostServerCPUChartData = [3.1,3.1,3.2,3.1,3.1,3.1,3.1,3.1,3.3,3.1,3.2,3.1,3.1,3.2,3.1,3.2,3.2,3.2,3.2,3.2];
    hostServerPowerChartData = [74,103,103,106,107,104,104,104,106,106,106,106,106,106,106,106,106,106,106,106];
    hostServerCPUChartCategories = ['16:58:45','16:58:48','16:58:51','16:58:54','16:58:57','16:59:00','16:59:03','16:59:06','16:59:09','16:59:12','16:59:15','16:59:18','16:59:21','16:59:24','16:59:27','16:59:30','16:59:33','16:59:36','16:59:39','16:59:42','16:59:45'];
    hostServerPowerChartCategories = ['16:58:45','16:58:48','16:58:51','16:58:54','16:58:57','16:59:00','16:59:03','16:59:06','16:59:09','16:59:12','16:59:15','16:59:18','16:59:21','16:59:24','16:59:27','16:59:30','16:59:33','16:59:36','16:59:39','16:59:42','16:59:45'];
}

function updateLatestChart(){
    //그래프 실시간 업데이트 하는 함수
    getLatestChartData();

    hostServerCPUChart.updateOptions({
        series: [{
            name: "cpu",
            data: hostServerCPUChartData
            }
        ],
        xaxis: {
            categories: hostServerCPUChartCategories
        }
    });

    hostServerPowerChart.updateOptions({
        series: [{
            name: "power",
            data: hostServerPowerChartData
        }
        ],
        xaxis: {
        categories: hostServerPowerChartCategories
        }
    });
}

function updateQueryChart(){
   //쿼리 수행 완료 후 쿼리 도는동안의 차트값 그래프 보여주는 함수
    getQueryChartData();

    hostServerCPUChart.updateOptions({
        series: [{
            name: "cpu",
            data: hostServerCPUChartData
            }
        ],
        xaxis: {
            categories: hostServerCPUChartCategories
        }
    });

    hostServerPowerChart.updateOptions({
        series: [{
            name: "power",
            data: hostServerPowerChartData
        }
        ],
        xaxis: {
        categories: hostServerPowerChartCategories
        }
    });
}

function startInterval(){
    intervalId = setInterval(updateLatestChart,3000);
}

const environmentInfoTab = document.getElementById("environmentInfoTab");
const dbSchemaTab = document.getElementById("dbSchemaTab");

const environmentInfoContainer = document.getElementById("environmentInfoContainer");
const dbSchemaContainer = document.getElementById("dbSchemaContainer");
const envSetting = document.getElementById("envSetting");

environmentInfoTab.addEventListener("click", function() {
    environmentInfoTab.classList.add("active");
    dbSchemaTab.classList.remove("active");

    environmentInfoContainer.style.display = "block";
    dbSchemaContainer.style.display = "none";
    envSetting.style.display = "block";
});

dbSchemaTab.addEventListener("click", function() {
    environmentInfoTab.classList.remove("active");
    dbSchemaTab.classList.add("active");

    environmentInfoContainer.style.display = "none";
    dbSchemaContainer.style.display = "block";
    envSetting.style.display = "none";
});

const metricViewBtn = document.getElementById('metricViewBtn');
const metricViewPlayIcon = document.getElementById('metricViewPlayIcon');
const metricViewPauseIcon = document.getElementById('metricViewPauseIcon');
let isMetricViewBtnClicked = true;

metricViewBtn.addEventListener('click', () => {    
    if (isMetricViewBtnClicked) {
        metricViewPlayIcon.style.display = 'inline';
        metricViewPauseIcon.style.display = 'none';
        clearInterval(intervalId);
    } else {
        metricViewPlayIcon.style.display = 'none';
        metricViewPauseIcon.style.display = 'inline';
        startInterval();
    }
    isMetricViewBtnClicked = !isMetricViewBtnClicked;
});

const resultContainer = document.getElementById("resultContainer");
const metricContainer = document.getElementById("metricContainer");
const spinnerContainer = document.querySelectorAll(".spinnerContainer");

document.getElementById("pushdownButton").addEventListener("click", function () {
    //Query 수행 및 결과 획득 (웹서버 연동 필요)
    spinnerContainer.forEach((icon) => {
        icon.style.display = "flex";
    });
    resultContainer.style.display = "none";
    metricContainer.style.display = "none";  

    clicked = true;//임시

    spinnerContainer.forEach((icon) => {
        icon.style.display = "none";
    });
    resultContainer.style.display = "block";
    metricContainer.style.display = "block";

    const scannedtable1 = document.querySelector('td.qtable_1');
    const scannedtable2 = document.querySelector('td.qtable_2');

    scannedtable1.textContent = "101255 (line)";
    scannedtable2.textContent = "62.39 (sec)";
    var result = "+-----------------------------------+\n" +
        "|ps_partkey      |value                        |\n" +
        "+-----------------------------------+\n" +
        "|4877                |18980009.120000   |\n" +
        "|198585            |16694701.690000   |\n" +
        "|78280              |15889749.480000   |\n" +
        "|89702              |15676712.640000   |\n" +
        "|15055              |15452319.200000   |\n" +
        "+-----------------------------------+";
    document.getElementById("queryResult").value = result;

    metricViewPlayIcon.style.display = 'inline';
    metricViewPauseIcon.style.display = 'none';

    isMetricViewBtnClicked = false;

    clearInterval(intervalId);
    updateQueryChart();
});


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
            fetch('/query_ssd/get_tpchQuery', {
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
document.getElementById("newQuery").addEventListener("click", function() {
    queryTextArea.value = "";
});
