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
        var query = document.getElementById("queryTextarea").value;
        var result = "+---------------+\n" +
            "|    promo_revenue   |\n" +
            "+---------------+\n" +
            "|   16.6781923715   |\n" +
            "+---------------+";
        document.getElementById("queryResult").value = result;
    });
});
