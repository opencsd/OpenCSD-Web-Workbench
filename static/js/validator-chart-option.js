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