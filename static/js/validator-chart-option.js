
var metricCompareChartOption = {
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
    series: [
        // {
        //     name: "ID 1",
        //     data: [35, 23, 49, 22],
        //     color: "#78b86fff" 
        // },
        // {
        //     name: "ID 2",
        //     data: [100, 100, 100, 100],
        //     color: "#e6c333ff" 
        // },
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

var detailChartOption = {
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
    series: [
        // {
        //     name: "ID 1",
        //     data: [2112],
        //     color: "#78b86fff" 
        // },
        // {
        //     name: "ID 2",
        //     data: [5963],
        //     color: "#e6c333ff" 
        // },
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
        // categories: ["ID 1", "ID 2"],
        categories: [],
    },
    yaxis: {
        title: {
            text: "ID"
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

var detailCPUChartOption = {
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
    series: [
        // {
        //     name: "ID 1",
        //     data: [2112],
        //     color: "#78b86fff" 
        // },
        // {
        //     name: "ID 2",
        //     data: [5963],
        //     color: "#e6c333ff" 
        // },
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
        // categories: ["ID 1", "ID 2"],
        categories: [],
    },
    yaxis: {
        title: {
            text: "ID"
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

var detailPowerChartOption = {
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
    series: [
        // {
        //     name: "ID 1",
        //     data: [2112],
        //     color: "#78b86fff" 
        // },
        // {
        //     name: "ID 2",
        //     data: [5963],
        //     color: "#e6c333ff" 
        // },
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
        // categories: ["ID 1", "ID 2"],
        categories: [],
    },
    yaxis: {
        title: {
            text: "ID"
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

var detailNetworkChartOption = {
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
    series: [
        // {
        //     name: "ID 1",
        //     data: [2112],
        //     color: "#78b86fff" 
        // },
        // {
        //     name: "ID 2",
        //     data: [5963],
        //     color: "#e6c333ff" 
        // },
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
            text: "Network (MB/S)"
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
        // categories: ["ID 1", "ID 2"],
        categories: [],
    },
    yaxis: {
        title: {
            text: "ID"
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

var detailTimeChartOption = {
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
    series: [
        // {
        //     name: "ID 1",
        //     data: [2112],
        //     color: "#78b86fff" 
        // },
        // {
        //     name: "ID 2",
        //     data: [5963],
        //     color: "#e6c333ff" 
        // },
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
            text: "Time (sec)"
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
        // categories: ["ID 1", "ID 2"],
        categories: [],
    },
    yaxis: {
        title: {
            text: "ID"
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

var HostCSDCPUChartOption = {
    chart: {
        type: "bar",
        fontFamily: 'inherit',
        height: 150,
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
        name: "CPU",
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
        'Host CPU(tick)', 'CSD Total CPU(tick)'
    ],
    colors: [tabler.getColor("primary")],
    legend: {
        show: false,
    },
};

var HostCSDPowerChartOption = {
    chart: {
        type: "bar",
        fontFamily: 'inherit',
        height: 150,
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
        name: "Power",
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
        'Host Power(W)', 'CSD Total Power(W)'
    ],
    colors: [tabler.getColor("primary")],
    legend: {
        show: false,
    },
};

var CSDCpuPowerChartOption = {
    chart: {
        type: "bar",
        fontFamily: 'inherit',
        height: 338,
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
            columnWidth: '50%',
        }
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        opacity: 1,
    },
    series: [{
        name: "CSD CPU(tick)",
        data: []
    },{
        name: "CSD Power(W)",
        data: []
    }],
    tooltip: {
        theme: 'dark'
    },
    grid: {
        padding: {
            top: -20,
            right: 0,
            left: -4,
            bottom: -4
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
        'CSD1', 'CSD2', 'CSD3', 'CSD4', 'CSD5', 'CSD6', 'CSD7', 'CSD8'
    ],
    colors: [tabler.getColor("primary"), tabler.getColor("red")],
    legend: {
        show: false,
    },
}