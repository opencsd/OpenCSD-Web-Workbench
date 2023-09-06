var i;
document.addEventListener("DOMContentLoaded", function () {
  for (i = 0; i < 12; i++) {
    new ApexCharts(document.getElementById("chart-summary" + i), {
      chart: {
        type: "line",
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
      series: [
        {
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
    new ApexCharts(document.getElementById("chart-demo-bar"), {
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
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      series: [
        {
          name: "Container for a Fanta",
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: "Strange sunglasses",
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: "Pen Pineapple Apple Pen",
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: "Binoculars",
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: "Magical notebook",
          data: [25, 12, 19, 32, 25, 24, 10],
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
      },
      xaxis: {
        labels: {
          padding: 0,
          formatter: function (val) {
            return val + "K";
          },
        },
        tooltip: {
          enabled: false,
        },
        axisBorder: {
          show: false,
        },
        categories: ["2008", "2009", "2010", "2011", "2012", "2013", "2014"],
      },
      yaxis: {
        labels: {
          padding: 4,
        },
      },
      colors: [
        tabler.getColor("purple"),
        tabler.getColor("green"),
        tabler.getColor("yellow"),
        tabler.getColor("red"),
        tabler.getColor("primary"),
      ],
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
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      series: [
        {
          name: "Container for a Fanta",
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: "Strange sunglasses",
          data: [53, 32, 33, 52, 13, 43, 32],
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
      },
      xaxis: {
        labels: {
          padding: 0,
          formatter: function (val) {
            return val + "K";
          },
        },
        tooltip: {
          enabled: false,
        },
        axisBorder: {
          show: false,
        },
        categories: ["2008", "2009", "2010", "2011", "2012", "2013", "2014"],
      },
      yaxis: {
        labels: {
          padding: 4,
        },
      },
      colors: [tabler.getColor("azure"), tabler.getColor("primary")],
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
