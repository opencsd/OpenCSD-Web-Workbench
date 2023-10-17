let temp_id = 1;

document.addEventListener("DOMContentLoaded", function () {
    const queryHistory = [];

    document.getElementById("pushdownButton").addEventListener("click", function () {
        const queryText = document.getElementById("queryTextarea").value.trim();

        const queryLogTableBody = document.getElementById("queryLogTableBody");

        if (queryText) {
            const shortenedQuery = queryText.length > 40 ? queryText.slice(0, 40) + "..." : queryText;
            queryHistory.push(shortenedQuery);

            const newRow = document.createElement("tr");
            const checkboxCell = document.createElement("td");
            checkboxCell.style.width = "5%";
            const queryIDCell = document.createElement("td");
            queryIDCell.style.width = "1%";
            const queryCell = document.createElement("td");
            queryCell.style.width = "30%";
            const progressBarCells = [];
            const dummyButtonCell = document.createElement("td");
            dummyButtonCell.style.width = "5%";

            if(temp_id == 1){
                for (let i = 0; i < 4; i++) {
                    const progressBarCell = document.createElement("td");
                    progressBarCell.style.width = "12%";
                    let width;
                    let value;
                    let max;
                    let label;

                    if(i==0){
                        value = 2112;
                        max = 6000;
                    }else if(i==1){
                        value = 800;
                        max = 4000;
                    }else if(i==2){
                        value = 96;
                        max = 200;
                    }else{
                        value = 13;
                        max = 100;
                    }

                    label = value;
                    width = (value / max) * 100;
                    progressBarCell.innerHTML = `
                        <div class="progress">
                            <div class="progress-bar" style="width: ${width}%" role="progressbar" aria-valuenow="${value}"
                                aria-valuemin="0" aria-valuemax="${max}" aria-label="${label}% Complete">
                                
                            </div>
                        </div>
                        <div style="text-align:center">
                            <h6 style="margin-top:5px; margin-bottom:0px;">${value}</h6>
                        </div>
                    `;
                    progressBarCells.push(progressBarCell);
                }
            }else{
                for (let i = 0; i < 4; i++) {
                    const progressBarCell = document.createElement("td");
                    progressBarCell.style.width = "12%";
                    let width;
                    let value;
                    let max;
                    let label;

                    if(i==0){
                        value = 5963;
                        max = 6000;
                    }else if(i==1){
                        value = 3367;
                        max = 4000;
                    }else if(i==2){
                        value = 194;
                        max = 200;
                    }else{
                        value = 59;
                        max = 100;
                    }
                    
                    label = value;
                    width = (value / max) * 100;
                    progressBarCell.innerHTML = `
                        <div class="progress">
                            <div class="progress-bar" style="width: ${width}%" role="progressbar" aria-valuenow="${value}"
                                aria-valuemin="0" aria-valuemax="${max}" aria-label="${label}% Complete">
                                
                            </div>
                        </div>
                        <div style="text-align:center">
                            <h6 style="margin-top:5px; margin-bottom:0px;">${value}</h6>
                        </div>
                    `;
                    progressBarCells.push(progressBarCell);
                }
            }
            
            const dummyButton = document.createElement("td");
            dummyButton.innerHTML = `
                <button class="btn btn-link p-0 ssd_btn" id="queryLogDetail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                </button>
            `;
            
            checkboxCell.innerHTML = `<input type="checkbox" class="form-check-input" name="form-type[]" value="2">`;
            newRow.appendChild(checkboxCell);

            queryIDCell.textContent = temp_id;
            temp_id++;
            queryIDCell.style.textAlign = "center";
            newRow.appendChild(queryIDCell);

            queryCell.textContent = `${shortenedQuery}`;
            queryCell.style.backgroundColor = "#fcfdfe";
            newRow.appendChild(queryCell);

            for (let i = 0; i < 4; i++) {
                newRow.appendChild(progressBarCells[i]);
            }

            newRow.appendChild(dummyButtonCell);
            dummyButtonCell.appendChild(dummyButton);

            queryLogTableBody.appendChild(newRow);
        } else {
            queryLogTableBody.textContent = "No query available.";
        }

        // document.getElementById("queryTextarea").value = "";
    });
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
                    name: "ID 1",
                    data: [100, 100, 100, 100],
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
                categories: ["CPU", "Power", "Network", "Time"],
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
        name: "ID 1",
        data: [35, 23, 49, 22],
        color: "#78b86fff" 
    },
    {
        name: "ID 2",
        data: [100, 100, 100, 100],
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
        categories: ["CPU", "Power", "Network", "Time"],
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
                data: [2112],
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
                categories: ["ID 1"],

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
                stacked: false,
            },
            plotOptions: {
                bar: {
                    barHeight: "50%",
                    horizontal: true,
                },
            }, 
            series: [{
                name: "ID 1",
                data: [2112],
                color: "#78b86fff" 
            },
            {
                name: "ID 2",
                data: [5963],
                color: "#e6c333ff" 
            },
            ],
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
                    left: 0,
                    bottom: -4,
                },
                strokeDashArray: 4,
            },
            xaxis: {
                labels: {
                    margin : 5,
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
                categories: ["ID 1", "ID 2"],
            },
            yaxis: {
                labels: {
                    padding: 0,
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


const opt_dropdownMenu = document.querySelector(".opt_menu");
const opt_dropdownToggle = document.querySelector(".opt_toggle");

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

        } else if (opt_selectedOption === "Non Pushdown Option Set") {
            dbmsInfo.textContent = "MySQL"; 
            storageTypeInfo.textContent = "SSD";
            csdkindInfo.textContent = "-";
            csdCountInfo.textContent = "-";
            blockCountInfo.textContent = "-";
            algorithmInfo.textContent = "-";
        } else{

        }
    }
});