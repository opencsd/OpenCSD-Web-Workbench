var hostServerCPUChartOption = {
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
        // max: 100,
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

var hostServerPowerChartOption = {
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
        min: 80000000000,
        max: 120000000000
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


var ScanFilterChartOption = {
    chart: {
        type: "bar",
        fontFamily: 'inherit',
        height: 240,
        parentHeightOffset: 0,
        toolbar: {
            show: false,
        },
        animations: {
            enabled: false
        },
    },
    plotOptions: {
        bar: {
            barHeight: '50%',
             horizontal: true,
        }
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        opacity: 1,
    },
    series: [{
        name: "Rows",
        data: [],
    }],
    tooltip: {
        theme: 'dark'
    },
    grid: {
        padding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        strokeDashArray: 4,
    },
    xaxis: {
        labels: {
            padding: 0,
        },
        tooltip: {
            enabled: false
        },
        axisBorder: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            padding: 4
        },
    },
    labels: [
        'Scaned Rows', 'Filtered Rows'
    ],
    colors: [tabler.getColor("primary")],
    legend: {
        show: false,
    },
};

var validationCompareChart1Option = {
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
            left: 10,
            bottom: 0,
        },
        strokeDashArray: 4,
    },
    xaxis: {
        title: {
            text: "COMPARE METRIC"
        },
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            show: false,
        },
        labels: {
            margin: 5,
            padding: 0,
        },
        categories: ["CPU", "Power", "Network", "Time"],
    },
    yaxis: {
        title: {
            text: "PERCENTAGE"
        },
        labels: {
            padding: 20,
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
}
var validationCompareChart2Option = {
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
        left: 10,
        bottom: 0,
    },
    strokeDashArray: 4,
},
xaxis: {
    title: {
        text: "COMPARE METRIC"
    },
    tooltip: {
        enabled: false,
    },
    axisBorder: {
        show: false,
    },
    categories: ["CPU", "Power", "Network", "Time"],
},
yaxis: {
    title: {
        text: "PERCENTAGE"
    },
    labels: {
        padding: 20,
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
}
var validationCPUChart1Option = {
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
            left: 5,
            bottom: -10,
        },
        strokeDashArray: 4,
    },
    xaxis: {
        title: {
            text: "CPU (tick)"
        },
        labels: {
            padding: 0,
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
        title: {
            text: "LOG ID"
        },
        labels: {
            padding: 0,
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
}
var validationCPUChart2Option = {
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
            left: 5,
            bottom: -10,
        },
        strokeDashArray: 4,
    },
    xaxis: {
        title: {
            text: "CPU (tick)"
        },
        labels: {
            padding: 0,
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
        title: {
            text: "LOG ID"
        },
        labels: {
            padding: 20,
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
}
var validationPowerChartOption = {
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
            left: 5,
            bottom: -10,
        },
        strokeDashArray: 4,
    },
    xaxis: {
        title: {
            text: "Power (W)"
        },
        labels: {
            padding: 0,
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
        title: {
            text: "LOG ID"
        },
        labels: {
            padding: 20,
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
}
var validationNetworkChartOption = {
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
            left: 5,
            bottom: -10,
        },
        strokeDashArray: 4,
    },
    xaxis: {
        title: {
            text: "Network (MB/s)"
        },
        labels: {
            padding: 0,
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
        title: {
            text: "LOG ID"
        },
        labels: {
            padding: 20,
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
}