var hostServerCPUChartDataOption = {
    chart: {
        id:"hostServerCPUChart",
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
            name: "cpu",
            data: [],
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
        categories: [],
    },
    yaxis: {
        tickAmount: 6,
        min: 0,
        max: 100
    },
    legend: {
        show: false
    },
    stroke: {
        curve: 'straight' 
    },
}

var hostServerPowerChartDataOption = {
    chart: {
            id:"hostServerPowerChart",
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
                name: "power",
                data: [],
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
            categories: [],
        },
        yaxis: {
            tickAmount: 6,
            min: 0,
            max: 100
        },
        legend: {
            show: false
        },
        stroke: {
            curve: 'straight' 
        },
}
