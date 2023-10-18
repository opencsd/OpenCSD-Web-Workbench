let intervalId;
var hostServerCPUChart, hostServerPowerChart;
var hostServerCPUChartData = [1.13,1.2,1.13,1,1.13,1.13,1.13,1.13,1.13,1.13];//초기값 임시 저장
var hostServerPowerChartData = [74,74,74,74,74,74,74,74,74,74,];
var hostServerCPUChartCategories = ['16:58:00', '16:58:10', '16:58:20', '16:58:30', '16:58:40', '16:58:50', '16:59:00', '16:59:10', '16:59:20', '16:59:30'];
var hostServerPowerChartCategories = ['16:58:00', '16:58:10', '16:58:20', '16:58:30', '16:58:40', '16:58:50', '16:59:00', '16:59:10', '16:59:20', '16:59:30'];

document.addEventListener("DOMContentLoaded", function () {
    //임시로 값 저장
    hostServerCPUChartDataOption.series[0].data = hostServerCPUChartData;
    hostServerPowerChartDataOption.series[0].data = hostServerPowerChartData;

    hostServerCPUChartDataOption.xaxis.categories = hostServerCPUChartCategories;
    hostServerPowerChartDataOption.xaxis.categories = hostServerPowerChartCategories;

    // getLatestChartData();//값 가져오는 코드

    hostServerCPUChart = new ApexCharts(document.getElementById("query_cache1"), hostServerCPUChartDataOption);
    hostServerPowerChart = new ApexCharts(document.getElementById("query_cache2"), hostServerPowerChartDataOption);

    hostServerCPUChart.render();
    hostServerPowerChart.render();

    startInterval();
});

function getLatestChartData(){
    //차트 값을 업데이트 하는 코드
    hostServerCPUChartData = hostServerCPUChart.w.globals.series[0];
    hostServerPowerChartData = hostServerPowerChart.w.globals.series[0];

    hostServerCPUChartCategories = hostServerCPUChart.w.globals.categoryLabels;
    hostServerPowerChartCategories = hostServerPowerChart.w.globals.categoryLabels;

    hostServerCPUChartData.push(Math.floor(Math.random() * 30));
    hostServerCPUChartData.shift();

    hostServerPowerChartData.push(Math.floor(Math.random() * 30));
    hostServerPowerChartData.shift();

    lastTime = hostServerCPUChartCategories[9];
    timeParts = lastTime.split(':');
    hours = parseInt(timeParts[0], 10);
    minutes = parseInt(timeParts[1], 10);
    seconds = parseInt(timeParts[2], 10);
    seconds += 5;
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
    seconds += 5;
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

function updateChart(){
    getLatestChartData();
    
    ApexCharts.exec("hostServerCPUChart", "updateOptions", {
        series: [{
            name: "cpu",
            data: hostServerCPUChartData
            }
        ],
        xaxis: {
            categories: hostServerCPUChartCategories
        }
    });

    ApexCharts.exec("hostServerPowerChart", "updateOptions", {
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
    intervalId = setInterval(updateChart,1000);
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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pushdownButton").addEventListener("click", function () {
        spinnerContainer.forEach((icon) => {
            icon.style.display = "flex";
        });
        resultContainer.style.display = "none";
        metricContainer.style.display = "none";  

        setTimeout(() => {
            spinnerContainer.forEach((icon) => {
                icon.style.display = "none";
            });
            resultContainer.style.display = "block";
            metricContainer.style.display = "block";

            const scannedtable1 = document.querySelector('td.qtable_1');
            const scannedtable2 = document.querySelector('td.qtable_2');
            const scannedtable3 = document.querySelector('td.qtable_3');
            const scannedtable4 = document.querySelector('td.qtable_4');
            const scannedtable5 = document.querySelector('td.qtable_5');

            scannedtable1.textContent = "101250 (line)";
            scannedtable2.textContent = "330 (line)";
            scannedtable3.textContent = "80 (%)";
            scannedtable4.textContent = "14.28 (sec)";
            scannedtable5.textContent = "8";

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
        }, 14000); 
        
    });
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
            queryTextArea.value = "SELECT\n\t ps_partkey,Sum(ps_supplycost * ps_availqty) AS value\n FROM\n\t   partsupp, supplier,nation\n WHERE\n\t  ps_suppkey = s_suppkey AND\n\t s_nationkey = n_nationkey AND\n\t n_name = 'MOZAMBIQUE'\n GROUP  BY\n\t ps_partkey\n HAVING\n\t Sum(ps_supplycost * ps_availqty) > (\n\tSELECT\n\t\t Sum(ps_supplycost * ps_availqty) * 0.0001000000\n\t FROM\n\t\t   partsupp, supplier, nation\n\t  WHERE\n\t\t  ps_suppkey = s_suppkey AND\n\t\t s_nationkey = n_nationkey AND\n\t\t n_name = 'MOZAMBIQUE'\n\t)\n ORDER  BY value DESC; ";
}); 
});
