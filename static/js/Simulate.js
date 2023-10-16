document.addEventListener("DOMContentLoaded", function () {
    const queryHistory = [];

    document.getElementById("pushdownButton").addEventListener("click", function () {
        const queryText = document.getElementById("queryTextarea").value.trim();

        const queryLogTableBody = document.getElementById("queryLogTableBody");

        if (queryText) {
            const shortenedQuery = queryText.length > 50 ? queryText.slice(0, 50) + "..." : queryText;
            queryHistory.push(shortenedQuery);

            const newRow = document.createElement("tr");

            const newCell = document.createElement("td");
            const progressBarCells = [];
            const dummyButtonCell = document.createElement("td");

            for (let i = 0; i < 5; i++) {
                const progressBarCell = document.createElement("td");
                progressBarCell.innerHTML = `
                    <div class="progress">
                        <div class="progress-bar" style="width: 38%" role="progressbar" aria-valuenow="38"
                            aria-valuemin="0" aria-valuemax="100" aria-label="38% Complete">
                            <span class="visually-hidden">38% Complete</span>
                        </div>
                    </div>
                `;
                progressBarCells.push(progressBarCell);
            }

            const dummyButton = document.createElement("td");
            dummyButton.innerHTML = `
                <a href="#" class="btn btn-icon bg-transparent" aria-label="Button"
                    data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right"
                    data-bs-content="Right popover">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical"
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                        <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                        <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    </svg>
                </a>
            `;

            newCell.textContent = `${shortenedQuery}`;
            newCell.style.backgroundColor = "#fcfdfe";

            newRow.appendChild(newCell);

            for (let i = 0; i < 5; i++) {
                newRow.appendChild(progressBarCells[i]);
            }

            newRow.appendChild(dummyButtonCell);
            dummyButtonCell.appendChild(dummyButton);

            queryLogTableBody.appendChild(newRow);
        } else {
            queryLogTableBody.textContent = "No query available.";
        }

        document.getElementById("queryTextarea").value = "";
    });
});



var i;
document.addEventListener("DOMContentLoaded", function () {
    for (i = 0; i < 12; i++) {
        new ApexCharts(document.getElementById("chart-summary" + i), {
            chart: {
                type: "bar",
                fontFamily: "inherit",
                height: 200,
                parentHeightOffset: 0,
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: false,
                },
            },
            fill: {
                opacity: 1,
            },
            stroke: {
                width: 2,
                lineCap: "round",
                curve: "smooth",
            },
            series: [{
                    name: "SELECT  *  FROM  Sessions  WHERE  User_id  =  ? ",
                    data: [
                        13281, 8521, 15038, 9983, 15417, 8888, 7052, 14270, 5214, 9587,
                        5950, 16852, 17836, 12217, 17406, 12262, 9147, 14961, 18292, 15230,
                        13435, 10649, 5140, 13680, 4508, 13271, 13413, 5543, 18727, 18238,
                        18175, 6246, 5864, 17847, 9170, 6445, 12945, 8142, 8980, 10422,
                        15535, 11569, 10114, 17621, 16138, 13046, 6652, 9906, 14100, 16495,
                        6749,
                    ],
                },
                {
                    name: "SELECT  *  FROM  Sessions  WHERE  Token  =  ?",
                    data: [
                        3680, 1862, 3070, 2252, 5348, 3091, 3000, 3984, 5176, 5325, 2420,
                        5474, 3098, 1893, 3748, 2879, 4197, 5186, 4213, 4334, 2807, 1594,
                        4863, 2030, 3752, 4856, 5341, 3954, 3461, 3097, 3404, 4949, 2283,
                        3227, 3630, 2360, 3477, 4675, 1901, 2252, 3347, 2954, 5029, 2079,
                        2830, 3292, 4578, 3401, 4104, 3749, 4457, 3734,
                    ],
                },
                {
                    name: "SELECT  *  FROM  Sessions  WHERE  Expires_at  <  ?  AND  User_id  =  ? ",
                    data: [
                        722, 1866, 961, 1108, 1110, 561, 1753, 1815, 1985, 776, 859, 547,
                        1488, 766, 702, 621, 1599, 1372, 1620, 963, 759, 764, 739, 789,
                        1696, 1454, 1842, 734, 551, 1689, 1924, 1875, 908, 1675, 1541, 1953,
                        534, 502, 1524, 1867, 719, 1472, 1608, 1025, 889, 1150, 654, 1695,
                        1662, 1285, 1787,
                    ],
                },
            ],
            tooltip: {
                theme: "dark",
            },
            grid: {
                padding: {
                    top: -20,
                    right: 0,
                    left: -4,
                    bottom: -4,
                },
                strokeDashArray: 4,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
            },
            xaxis: {
                labels: {
                    padding: 0,
                },
                tooltip: {
                    enabled: false,
                },
                type: "datetime",
            },
            yaxis: {
                labels: {
                    padding: 4,
                },
            },
            labels: [
                "2020-06-20",
                "2020-06-21",
                "2020-06-22",
                "2020-06-23",
                "2020-06-24",
                "2020-06-25",
                "2020-06-26",
                "2020-06-27",
                "2020-06-28",
                "2020-06-29",
                "2020-06-30",
                "2020-07-01",
                "2020-07-02",
                "2020-07-03",
                "2020-07-04",
                "2020-07-05",
                "2020-07-06",
                "2020-07-07",
                "2020-07-08",
                "2020-07-09",
                "2020-07-10",
                "2020-07-11",
                "2020-07-12",
                "2020-07-13",
                "2020-07-14",
                "2020-07-15",
                "2020-07-16",
                "2020-07-17",
                "2020-07-18",
                "2020-07-19",
                "2020-07-20",
                "2020-07-21",
                "2020-07-22",
                "2020-07-23",
                "2020-07-24",
                "2020-07-25",
                "2020-07-26",
                "2020-07-27",
                "2020-07-28",
                "2020-07-29",
                "2020-07-30",
                "2020-07-31",
                "2020-08-01",
                "2020-08-02",
                "2020-08-03",
                "2020-08-04",
                "2020-08-05",
                "2020-08-06",
                "2020-08-07",
                "2020-08-08",
                "2020-08-09",
            ],
            colors: [
                tabler.getColor("facebook"),
                tabler.getColor("twitter"),
                tabler.getColor("dribbble"),
            ],
            legend: {
                show: false,
                position: "bottom",
                offsetY: 12,
                markers: {
                    width: 10,
                    height: 10,
                    radius: 100,
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
        }).render();
    }
});

document.addEventListener("DOMContentLoaded", function () {  
    window.ApexCharts &&
        new ApexCharts(document.getElementById("chart-demo-bar1"), {
                chart: {
                type: "bar",
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
                enabled: true,
                style: {
                    colors: ["#fff"]
                }
            },
                        fill: {
                opacity: 1,
            },
            series: [{
                    name: "1",
                    data: [100, 100, 100, 100, 100],
                    color: "#78b86fff" 
                }
            ],
            grid: {
                padding: {
                    top: -20,
                    right: 0,
                    left: -4,
                    bottom: -4,
                },
                strokeDashArray: 4,
            },
            xaxis: {
                tooltip: {
                    enabled: false,
                },
                axisBorder: {
                    show: false,
                },
                categories: ["20:05", "23:05", "02:05", "05:05", "08:05"],
            },
            yaxis: {
                labels: {
                    padding: 4,
                },
                tickAmount: 5,
                max: 100
            },
            legend: {
                show: true,
                position: "bottom",
                offsetY: 12,
                markers: {
                    width: 10,
                    height: 10,
                    radius: 100,
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
        }).render();
});

document.addEventListener("DOMContentLoaded", function () {  
    window.ApexCharts &&
        new ApexCharts(document.getElementById("chart-demo-bar2"), {
        chart: {
        type: "bar",
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
        enabled: true,
        style: {
            colors: ["#fff"]
        }
    },
                fill: {
        opacity: 1,
    },
    series: [{
        name: "1",
        data: [100, 100, 100, 100, 100],
        color: "#78b86fff" 
    },
    {
            name: "2",
            data: [20, 60, 40, 50, 70],
            color: "#e6c333ff" 
        },
    ],
    grid: {
        padding: {
            top: -20,
            right: 0,
            left: -4,
            bottom: -4,
        },
        strokeDashArray: 4,
    },
    xaxis: {
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            show: false,
        },
        categories: ["20:05", "23:05", "02:05", "05:05", "08:05"],
    },
    yaxis: {
        labels: {
            padding: 4,
        },
        tickAmount: 5,
        max: 100
    },
    legend: {
        show: true,
        position: "bottom",
        offsetY: 12,
        markers: {
            width: 10,
            height: 10,
            radius: 100,
        },
        itemMargin: {
            horizontal: 8,
            vertical: 8,
        },
    },
}).render();
});


document.addEventListener("DOMContentLoaded", function () {
    window.ApexCharts &&
        new ApexCharts(document.getElementById("chart-demo-bar3"), {
            chart: {
                type: "bar",
                fontFamily: "inherit",
                height: 240,
                parentHeightOffset: 0,
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: false,
                },
                stacked: true,
            },
            plotOptions: {
                bar: {
                    barHeight: "50%",
                    horizontal: true,
                },
            },
            dataLabels: {
                enabled: true,
            },
            fill: {
                opacity: 1,
            },
            series: [{
                data: [3400],
            }, ],
            tooltip: {
                theme: "dark",
            },
            grid: {
                padding: {
                    top: -20,
                    right: 0,
                    left: -4,
                    bottom: -4,
                },
                strokeDashArray: 4,
            },
            xaxis: {
                labels: {
                    padding: 0,
                    formatter: function (val) {
                        return val;
                    },
                },
                tooltip: {
                    enabled: false,
                },
                axisBorder: {
                    show: false,
                },
                categories: ["ID1"],

            },
            yaxis: {
                labels: {
                    padding: 10,
                },
                max: 4000
            },
            fill: {
                type:'color' ,
                colors: "#78b86fff"
            },
            legend: {
                show: true,
                position: "bottom",
                offsetY: 12,
                markers: {
                    width: 10,
                    height: 10,
                    radius: 100,
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
        }).render();
});

document.addEventListener("DOMContentLoaded", function () {
    window.ApexCharts &&
        new ApexCharts(document.getElementById("chart-demo-bar4"), {
            chart: {
                type: "bar",
                fontFamily: "inherit",
                height: 240,
                parentHeightOffset: 0,
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: false,
                },
                stacked: true,
            },
            plotOptions: {
                bar: {
                    barHeight: "50%",
                    horizontal: true,
                },
            }, 
            series: [{
                data: [3400, 2704],
            }],
            colors: ['#78b86fff', '#546E7A'],
            dataLabels: {
                enabled: true,
            },
            tooltip: {
                theme: "dark",
            },
            grid: {
                padding: {
                    top: -20,
                    right: 0,
                    left: -4,
                    bottom: -4,
                },
                strokeDashArray: 4,
            },
            xaxis: {
                labels: {
                    padding: 0,
                    formatter: function (val) {
                        return val;
                    },
                },
                tooltip: {
                    enabled: false,
                },
                axisBorder: {
                    show: false,
                },
                categories: ["ID1", "ID2"],
            },
            yaxis: {
                labels: {
                    padding: 4,
                },
            },
            legend: {
                show: true,
                position: "bottom",
                offsetY: 12,
                markers: {
                    width: 10,
                    height: 10,
                    radius: 100,
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
        }).render();
});






let chart1Visible = false;
let chart2Visible = false;
let chart3Visible = false;
let chart4Visible = false;

const chart1Div = document.getElementById("chart-demo-bar1");
const chart2Div = document.getElementById("chart-demo-bar2");
const chart3Div = document.getElementById("chart-demo-bar3");
const chart4Div = document.getElementById("chart-demo-bar4");

const runButton = document.getElementById("pushdownButton");

let chart1 = null;
let chart2 = null;

runButton.addEventListener("click", function () {
    
    const selectedIDCell = document.querySelector(".data1:nth-child(1)");
    const optionNameCell = document.querySelector(".data1:nth-child(2)");
    const dbmsCell = document.querySelector(".data1:nth-child(3)");
    const storageTypeCell = document.querySelector(".data1:nth-child(4)");
    const csdCountCell = document.querySelector(".data1:nth-child(5)");
    const csdKindCell = document.querySelector(".data1:nth-child(6)");

    const selectedIDCell2 = document.querySelector(".data2:nth-child(1)");
    const optionNameCell2 = document.querySelector(".data2:nth-child(2)");
    const dbmsCell2 = document.querySelector(".data2:nth-child(3)");
    const storageTypeCell2 = document.querySelector(".data2:nth-child(4)");
    const csdCountCell2 = document.querySelector(".data2:nth-child(5)");
    const csdKindCell2 = document.querySelector(".data2:nth-child(6)");


    if (!chart1Visible && !chart3Visible) {
        chart1Visible = true;
        chart3Visible = true;

        chart1Div.style.display = "block";
        chart3Div.style.display = "block";
        chart2Div.style.display = "none";        
        chart4Div.style.display = "none";

        selectedIDCell.textContent = "1";
        selectedIDCell.style.backgroundColor = "#78b86fff";
        optionNameCell.textContent = "Non Pushdown Option Set";
        dbmsCell.textContent = "MySQL";
        storageTypeCell.textContent = "SSD";
        csdCountCell.textContent = "-";
        csdKindCell.textContent = "-";

    } else {
        chart1Visible = false;
        chart2Visible = true;
        chart3Visible = false;
        chart4Visible = true;

        chart2Div.style.display = "block";        
        chart4Div.style.display = "block";

        selectedIDCell2.textContent = "2";
        selectedIDCell2.style.backgroundColor = "#e6c333ff";
        optionNameCell2.textContent = "Pushdown Option Set";
        dbmsCell2.textContent = "MySQL";
        storageTypeCell2.textContent = "CSD";
        csdCountCell2.textContent = "8";
        csdKindCell2.textContent = "NGD";

        setTimeout(function () {
            chart1Div.style.display = "none";
            chart3Div.style.display = "none";
        }, 500);
    }
});

const queryNumbers = Array.from({ length: 22 }, (_, i) => i + 1);
const dropdownMenu = document.querySelector(".dropdown-menu");

queryNumbers.forEach((number) => {
    const dropdownItem = document.createElement("a");
    dropdownItem.className = "dropdown-item";
    dropdownItem.href = "#";
    dropdownItem.textContent = `Q${number}`;
    dropdownMenu.appendChild(dropdownItem);
});


const opt_dropdownMenu = document.querySelector(".opt_menu");
const opt_dropdownToggle = document.querySelector(".opt_toggle");

const dbmsInfo = document.getElementById("dbmsInfo");
const csdkindInfo = document.getElementById("csdkindInfo");
const csdcountInfo = document.getElementById("csdcountInfo");
const blockInfo = document.getElementById("blockInfo");
const algorithmInfo = document.getElementById("algorithmInfo");


opt_dropdownMenu.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("opt_item")) {
        const opt_selectedOption = e.target.textContent;
        opt_dropdownToggle.textContent = opt_selectedOption;

        if (opt_selectedOption === "Pushdown Option Set") {
            dbmsInfo.textContent = "-"; 
            csdkindInfo.textContent = "-";
            csdcountInfo.textContent = "8";
            blockInfo.textContent = "4096";
            algorithmInfo.textContent = "CSD Metric Score";

        } else if (opt_selectedOption === "Non Pushdown Option Set") {
            dbmsInfo.textContent = "non option set";
            csdkindInfo.textContent = "-";
            csdcountInfo.textContent = "-";
            blockInfo.textContent = "-";
            algorithmInfo.textContent = "-";
        } else{

        }
    }
});