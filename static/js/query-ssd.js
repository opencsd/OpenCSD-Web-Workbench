const environmentInfoTab = document.querySelector("#environmentInfoTab.ssd_btn");
const dbSchemaTab = document.querySelector("#dbSchemaTab.ssd_btn");

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


document.addEventListener("DOMContentLoaded", function () {
    window.ApexCharts &&
        new ApexCharts(document.getElementById("query_cache1"), {
            chart: {
                type: "area",
                fontFamily: "inherit",
                height: 240,
                parentHeightOffset: 0,
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: false,
                },
                stacked: false,
            },
            plotOptions: {
                bar: {
                    barHeight: "50%",
                    horizontal: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                opacity: 1,
            },
            series: [{
                    name: "Strange sunglasses",
                    data: [11, 13, 10, 12, 11, 15, 19, 12, 11, 15, 17, 12],
                }
            ],
            colors: ["#77c13d"],
            tooltip: {
                theme: "dark",
            },
            grid: {
                padding: {
                    top: -20,
                    right: 0,
                    left: 20,
                    bottom: -4,
                },
                strokeDashArray: 4,
            },
            xaxis: {
                labels: {
                    padding: 0,
                },
                tooltip: {
                    enabled: false,
                },
                axisBorder: {
                    show: false,
                },
                categories: [
                    "15:00",
                    "",
                    "15:10",
                    "",
                    "15:20",
                    "",
                    "15:30",
                    "",
                    "15:40",
                    "",
                    "15:50",
                    "",
                ],
            },
            yaxis: {
                tickAmount: 6,
                min: 0,
                max: 30
            },
            legend: {
                show: false
            },
            stroke: {
                curve: 'straight' 
            },
        }).render();
});

document.addEventListener("DOMContentLoaded", function () {
    window.ApexCharts &&
        new ApexCharts(document.getElementById("query_cache2"), {
            chart: {
                type: "area",
                fontFamily: "inherit",
                height: 240,
                parentHeightOffset: 0,
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: false,
                },
                stacked: false,
            },
            plotOptions: {
                bar: {
                    barHeight: "50%",
                    horizontal: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                opacity: 1,
            },
            series: [{
                    name: "Strange sunglasses",
                    data: [11, 13, 10, 12, 11, 15, 10, 12, 17, 11, 15, 12],
                }
            ],
            colors: ["#77c13d"],
            tooltip: {
                theme: "dark",
            },
            grid: {
                padding: {
                    top: -20,
                    right: 0,
                    left: 20,
                    bottom: -4,
                },
                strokeDashArray: 4,
            },
            xaxis: {
                labels: {
                    padding: 0,
                },
                tooltip: {
                    enabled: false,
                },
                axisBorder: {
                    show: false,
                },
                categories: [
                    "15:00",
                    "",
                    "15:10",
                    "",
                    "15:20",
                    "",
                    "15:30",
                    "",
                    "15:40",
                    "",
                    "15:50",
                    "",
                ],
            },
            yaxis: {
                tickAmount: 6,
                min: 0,
                max: 30
            },
            legend: {
                show: false
            },
            stroke: {
                curve: 'straight' 
            },
        }).render();
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pushdownButton").addEventListener("click", function () {

        const scannedtable1 = document.querySelector('td.qtable_1');
        const scannedtable2 = document.querySelector('td.qtable_2');
        const scannedtable3 = document.querySelector('td.qtable_3');

        scannedtable1.textContent = "300 (line)";
        scannedtable2.textContent = "20 (sec)";
        scannedtable3.textContent = "4";

        var query = document.getElementById("queryTextarea").value;
        var result = "+-------------------------------------+\n" +
            "|ps_partkey        |value             |\n" +
            "+-------------------------------------+\n" +
            "|4877              |18980009.120000   |\n" +
            "|198585            |16694701.690000   |\n" +
            "|78280             |15889749.480000   |\n" +
            "|89702             |15676712.640000   |\n" +
            "|15055             |15452319.200000   |\n" +
            "+-------------------------------------+";
        document.getElementById("queryResult").value = result;
    });
});

const queryNumbers = Array.from({ length: 22 }, (_, i) => i + 1);
const dropdownMenu = document.querySelector(".dropdown-menu");

queryNumbers.forEach((number) => {
    const dropdownItem = document.createElement("a");
    dropdownItem.className = "dropdown-item";
    dropdownItem.href = "#";
    dropdownItem.textContent = `Q${number}`;
    dropdownMenu.appendChild(dropdownItem);

    const dropdownToggle = document.getElementById("dropdownToggle");
const dropdownItems = document.querySelectorAll(".dropdown-item");

    dropdownItems.forEach((dropdownItem) => {
    dropdownItem.addEventListener("click", function (event) {
        event.preventDefault(); 
                dropdownToggle.textContent = dropdownItem.textContent;
    }); 
    });
});
