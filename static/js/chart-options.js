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
            // enabled: true,
            // easing: 'linear',
            // dynamicAnimation: {
            //     speed: 1000
            // }
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
            bottom: 0,
        },
        strokeDashArray: 4,
    },
    xaxis: {
        title: {
            text: "Timeline",
            offsetX: 0,
            offsetY: 0,
        },
        labels: {
            padding: -10,
            rotate: -45,
            rotateAlways: true,
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
        title: {
            text: "Host CPU (%)"
        },
        tickAmount: 10,
        forceNiceScale: true,
        min: 0,
        max: 100,
        labels: {
            formatter: function(val) {
                return val.toFixed(0);
            }
        }
    },
    legend: {
        show: false
    },
    stroke: {
        curve: 'straight',
        width: 2,
    },
    // dataLabels: {
    //     enabled: true,
    // },
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
            bottom: 0,
        },
        strokeDashArray: 4,
    },
    xaxis: {
        title: {
            text: "Timeline"
        },
        labels: {
            padding: -50,
            rotate: -45,
            rotateAlways: true,
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
        title: {
            text: "Host Power (W)"
        },
        tickAmount: 10,
        forceNiceScale: true,
        min: 0,
        max: 200
    },
    legend: {
        show: false
    },
    stroke: {
        curve: 'straight',
        width: 2,
    },
    // dataLabels: {
    //     enabled: true,
    // },
}
