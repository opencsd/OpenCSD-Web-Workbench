/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
const Chart = require("chart.js");
//
// Chart extension for making the bars rounded
// Code from: https://codepen.io/jedtrow/full/ygRYgo
//

Chart.elements.Rectangle.prototype.draw = function () {
  var ctx = this._chart.ctx;
  var vm = this._view;
  var left, right, top, bottom, signX, signY, borderSkipped, radius;
  var borderWidth = vm.borderWidth;
  // Set Radius Here
  // If radius is large enough to cause drawing errors a max radius is imposed
  var cornerRadius = 0;

  if (!vm.horizontal) {
    // bar
    left = vm.x - vm.width / 2;
    right = vm.x + vm.width / 2;
    top = vm.y;
    bottom = vm.base;
    signX = 1;
    signY = bottom > top ? 1 : -1;
    borderSkipped = vm.borderSkipped || "bottom";
  } else {
    // horizontal bar
    left = vm.base;
    right = vm.x;
    top = vm.y - vm.height / 2;
    bottom = vm.y + vm.height / 2;
    signX = right > left ? 1 : -1;
    signY = 1;
    borderSkipped = vm.borderSkipped || "left";
  }

  // Canvas doesn't allow us to stroke inside the width so we can
  // adjust the sizes to fit if we're setting a stroke on the line
  if (borderWidth) {
    // borderWidth shold be less than bar width and bar height.
    var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
    borderWidth = borderWidth > barSize ? barSize : borderWidth;
    var halfStroke = borderWidth / 2;
    // Adjust borderWidth when bar top position is near vm.base(zero).
    var borderLeft = left + (borderSkipped !== "left" ? halfStroke * signX : 0);
    var borderRight =
      right + (borderSkipped !== "right" ? -halfStroke * signX : 0);
    var borderTop = top + (borderSkipped !== "top" ? halfStroke * signY : 0);
    var borderBottom =
      bottom + (borderSkipped !== "bottom" ? -halfStroke * signY : 0);
    // not become a vertical line?
    if (borderLeft !== borderRight) {
      top = borderTop;
      bottom = borderBottom;
    }
    // not become a horizontal line?
    if (borderTop !== borderBottom) {
      left = borderLeft;
      right = borderRight;
    }
  }

  ctx.beginPath();
  ctx.fillStyle = vm.backgroundColor;
  ctx.strokeStyle = vm.borderColor;
  ctx.lineWidth = borderWidth;

  // Corner points, from bottom-left to bottom-right clockwise
  // | 1 2 |
  // | 0 3 |
  var corners = [
    [left, bottom],
    [left, top],
    [right, top],
    [right, bottom],
  ];

  // Find first (starting) corner with fallback to 'bottom'
  var borders = ["bottom", "left", "top", "right"];
  var startCorner = borders.indexOf(borderSkipped, 0);
  if (startCorner === -1) {
    startCorner = 0;
  }

  function cornerAt(index) {
    return corners[(startCorner + index) % 4];
  }

  // Draw rectangle from 'startCorner'
  var corner = cornerAt(0);
  ctx.moveTo(corner[0], corner[1]);

  for (var i = 1; i < 4; i++) {
    corner = cornerAt(i);
    let nextCornerId = i + 1;
    if (nextCornerId === 4) {
      nextCornerId = 0;
    }

    // let nextCorner = cornerAt(nextCornerId);

    let width = corners[2][0] - corners[1][0];
    let height = corners[0][1] - corners[1][1];
    let x = corners[1][0];
    let y = corners[1][1];
    // eslint-disable-next-line
    var radius = cornerRadius;

    // Fix radius being too large
    if (radius > height / 2) {
      radius = height / 2;
    }
    if (radius > width / 2) {
      radius = width / 2;
    }

    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  ctx.fill();
  if (borderWidth) {
    ctx.stroke();
  }
};

var mode = "light"; //(themeMode) ? themeMode : 'light';
var fonts = {
  base: "Open Sans",
};

// Colors
var colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529",
  },
  theme: {
    gradient_primary: "linear-gradient(87deg, #5e72e4 0, #825ee4 100%)",
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340",
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent",
};

// Methods

// Chart.js global options
function chartOptions() {
  // Options
  var options = {
    defaults: {
      global: {
        responsive: true,
        maintainAspectRatio: false,
        defaultColor: mode === "dark" ? colors.gray[700] : colors.gray[600],
        defaultFontColor: mode === "dark" ? colors.gray[700] : colors.black,
        defaultFontFamily: fonts.base,
        defaultFontSize: 15,
        layout: {
          padding: 0,
        },
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: false,
            padding: 15,
          },
        },
        elements: {
          point: {
            radius: 5,
            backgroundColor: colors.theme["info"],
          },
          line: {
            tension: 0,
            borderWidth: 5,
            borderColor: colors.theme["info"],
            backgroundColor: colors.transparent,
          },
          rectangle: {
            backgroundColor: colors.theme["primary"],
          },
          arc: {
            backgroundColor: colors.theme["primary"],
            borderColor: mode === "dark" ? colors.gray[800] : colors.white,
            borderWidth: 4,
          },
        },
        tooltips: {
          enabled: true,
          mode: "index",
          intersect: false,
        },
      },
      doughnut: {
        cutoutPercentage: 83,
        legendCallback: function (chart) {
          var data = chart.data;
          var content = "";

          data.labels.forEach(function (label, index) {
            var bgColor = data.datasets[0].backgroundColor[index];

            content += '<span class="chart-legend-item">';
            content +=
              '<i class="chart-legend-indicator" style="background-color: ' +
              bgColor +
              '"></i>';
            content += label;
            content += "</span>";
          });

          return content;
        },
      },
    },
  };

  // yAxes
  Chart.scaleService.updateScaleDefaults("linear", {
    gridLines: {
      borderDash: [2],
      borderDashOffset: [2],
      color: mode === "dark" ? colors.gray[900] : colors.gray[300],
      drawBorder: false,
      drawTicks: false,
      lineWidth: 0,
      zeroLineWidth: 0,
      zeroLineColor: mode === "dark" ? colors.gray[900] : colors.gray[300],
      zeroLineBorderDash: [2],
      zeroLineBorderDashOffset: [2],
    },
    ticks: {
      beginAtZero: true,
      padding: 10,
      callback: function (value) {
        if (!(value % 10)) {
          return value;
        }
      },
    },
  });

  // xAxes
  Chart.scaleService.updateScaleDefaults("category", {
    gridLines: {
      drawBorder: false,
      drawOnChartArea: false,
      drawTicks: false,
    },
    ticks: {
      padding: 20,
    },
  });

  return options;
}

// Parse global options
function parseOptions(parent, options) {
  for (var item in options) {
    if (typeof options[item] !== "object") {
      parent[item] = options[item];
    } else {
      parseOptions(parent[item], options[item]);
    }
  }
}

// Example 1 of Chart inside src/views/Index.js (Sales value - Card)
let pushdowneffectcheckchart = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900],
          },
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                return value;
              }
            },
          },
        },
      ],
    },
    centerAlign: true, // 가운데 정렬 스타일 추가
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1) {
            content += label;
          }

          if (data.datasets.length > 1) {
            content += " " + yLabel;
          }
          return content;
        },
      },
    },
  },
  powerData: (canvas) => {
    const pushdowndata = {
      labels: ["Query 1", "Query 2", "Query 3", "Query 4"],
      datasets: [
        {
          label: "Storage Engine",
          data: [300, 200, 200, 400],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD1",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["danger"],
          pointBackgroundColor: colors.theme["danger"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD2",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["success"],
          pointBackgroundColor: colors.theme["success"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD3",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["info"],
          pointBackgroundColor: colors.theme["info"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD4",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD5",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD6",
          data: [21, 21, 21, 21],
          backgroundColor: "#ffd600",
          pointBackgroundColor: "#ffd600",
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD7",
          data: [21, 21, 21, 21],
          backgroundColor: "#8965e0",
          pointBackgroundColor: "#8965e0",
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD8",
          data: [21, 21, 21, 21],
          backgroundColor: "#f3a4b5",
          pointBackgroundColor: "#f3a4b5",
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "SSD",
          data: [500, 600, 400, 800],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "SSD",
        },
      ],
    };
    return pushdowndata;
  },
  networkData: (canvas) => {
    const pushdowndata = {
      labels: ["Result", "Storage Engine", "CSD"],
      datasets: [
        {
          label: "Storage Engine",
          data: [90, 90, 0],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 10,
          stack: "network",
        },
        {
          label: "Total CSD",
          data: [24, 0, 0],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 10,
          stack: "network",
        },
        {
          label: "CSD1",
          data: [0, 0, 3],
          backgroundColor: colors.theme["danger"],
          pointBackgroundColor: colors.theme["danger"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD2",
          data: [0, 0, 3],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD3",
          data: [0, 0, 3],
          backgroundColor: colors.theme["success"],
          pointBackgroundColor: colors.theme["success"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD4",
          data: [0, 0, 3],
          backgroundColor: colors.theme["info"],
          pointBackgroundColor: colors.theme["info"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD5",
          data: [0, 0, 3],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD6",
          data: [0, 0, 3],
          backgroundColor: "#8965e0",
          pointBackgroundColor: "#8965e0",
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD7",
          data: [0, 0, 3],
          backgroundColor: "#ffd600",
          pointBackgroundColor: "#ffd600",
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD8",
          data: [0, 0, 3],
          backgroundColor: "#f3a4b5",
          pointBackgroundColor: "#f3a4b5",
          maxBarThickness: 10,
          stack: "CSD",
        },
      ],
    };
    return pushdowndata;
  },
  cpuData: (canvas) => {
    const pushdowndata = {
      labels: ["Result", "Storage Engine", "CSD"],
      datasets: [
        {
          label: "Storage Engine",
          data: [120, 120, 0],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 10,
          stack: "CPU",
        },
        {
          label: "Total CSD",
          data: [80, 0, 0],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 10,
          stack: "CPU",
        },
        {
          label: "CSD1",
          data: [0, 0, 5],
          backgroundColor: colors.theme["danger"],
          pointBackgroundColor: colors.theme["danger"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD2",
          data: [0, 0, 5],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD3",
          data: [0, 0, 5],
          backgroundColor: colors.theme["success"],
          pointBackgroundColor: colors.theme["success"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD4",
          data: [0, 0, 5],
          backgroundColor: colors.theme["info"],
          pointBackgroundColor: colors.theme["info"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD5",
          data: [0, 0, 5],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD6",
          data: [0, 0, 5],
          backgroundColor: "#8965e0",
          pointBackgroundColor: "#8965e0",
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD7",
          data: [0, 0, 5],
          backgroundColor: "#ffd600",
          pointBackgroundColor: "#ffd600",
          maxBarThickness: 10,
          stack: "CSD",
        },
        {
          label: "CSD8",
          data: [0, 0, 5],
          backgroundColor: "#f3a4b5",
          pointBackgroundColor: "#f3a4b5",
          maxBarThickness: 10,
          stack: "CSD",
        },
      ],
    };
    return pushdowndata;
  },
};
let energychart = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900],
          },
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                return value;
              }
            },
          },
        },
      ],
    },
    centerAlign: true, // 가운데 정렬 스타일 추가
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1) {
            content += label;
          }
          content += " " + yLabel;
          return content;
        },
      },
    },
  },
  data: (canvas) => {
    const energydata = {
      labels: ["CPU", "Net", "Power", "Time", "Result(Score)"],
      datasets: [
        {
          label: "Query 1",
          data: [90, 80, 60, 80, 95],
          pointBackgroundColor: colors.theme["primary"],
          borderColor: colors.theme["primary"],
        },
        {
          label: "Query 2",
          data: [45, 60, 50, 60, 55],
        },
        {
          label: "Query 3",
          data: [85, 80, 75, 90, 100],
          pointBackgroundColor: colors.theme["warning"],
          borderColor: colors.theme["warning"],
        },
        {
          label: "Query 4",
          data: [10, 20, 40, 20, 25],
          pointBackgroundColor: colors.theme["danger"],
          borderColor: colors.theme["danger"],
        },
      ],
    };
    return energydata;
  },
};

let querychart = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900],
          },
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                return value;
              }
            },
          },
        },
      ],
    },
    centerAlign: true, // 가운데 정렬 스타일 추가
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1 && item.yLabel > 0) {
            content += label;
          }

          if (data.datasets.length > 1 && item.yLabel > 0) {
            content += " " + yLabel;
          }
          return content;
        },
      },
    },
  },
  data: (canvas) => {
    const pushdowndata = {
      labels: ["CPU", "Net", "Power", "Time"],
      datasets: [
        {
          label: "SSD",
          data: [500, 600, 400, 800],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "SSD",
        },
        {
          label: "Storage Engine",
          data: [300, 200, 200, 400],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD1",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["danger"],
          pointBackgroundColor: colors.theme["danger"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD2",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["success"],
          pointBackgroundColor: colors.theme["success"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD3",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["info"],
          pointBackgroundColor: colors.theme["info"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD4",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD5",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD6",
          data: [21, 21, 21, 21],
          backgroundColor: "#ffd600",
          pointBackgroundColor: "#ffd600",
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD7",
          data: [21, 21, 21, 21],
          backgroundColor: "#8965e0",
          pointBackgroundColor: "#8965e0",
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD8",
          data: [21, 21, 21, 21],
          backgroundColor: "#f3a4b5",
          pointBackgroundColor: "#f3a4b5",
          maxBarThickness: 25,
          stack: "power",
        },
      ],
    };
    return pushdowndata;
  },
};

let pushdownchart = {
  options: {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900],
          },
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                return value;
              }
            },
          },
        },
      ],
    },
    centerAlign: true, // 가운데 정렬 스타일 추가
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1 && item.yLabel > 0) {
            content += label;
          }

          if (data.datasets.length > 1 && item.yLabel > 0) {
            content += " " + yLabel;
          }
          return content;
        },
      },
    },
  },
  data: (canvas) => {
    const pushdowndata = {
      labels: ["CPU", "Net", "Power", "Time"],
      datasets: [
        {
          label: "SSD",
          data: [500, 600, 400, 800],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "SSD",
        },
        {
          label: "Storage Engine",
          data: [300, 200, 200, 400],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD1",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["danger"],
          pointBackgroundColor: colors.theme["danger"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD2",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["success"],
          pointBackgroundColor: colors.theme["success"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD3",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["info"],
          pointBackgroundColor: colors.theme["info"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD4",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD5",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD6",
          data: [21, 21, 21, 21],
          backgroundColor: "#ffd600",
          pointBackgroundColor: "#ffd600",
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD7",
          data: [21, 21, 21, 21],
          backgroundColor: "#8965e0",
          pointBackgroundColor: "#8965e0",
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "CSD8",
          data: [21, 21, 21, 21],
          backgroundColor: "#f3a4b5",
          pointBackgroundColor: "#f3a4b5",
          maxBarThickness: 25,
          stack: "power",
        },
        {
          label: "Storage Engine",
          data: [300, 200, 200, 400],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 25,
          stack: "real",
        },
        {
          label: "CSD1",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["danger"],
          pointBackgroundColor: colors.theme["danger"],
          maxBarThickness: 25,
          stack: "real",
        },
        {
          label: "CSD2",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["success"],
          pointBackgroundColor: colors.theme["success"],
          maxBarThickness: 25,
          stack: "real",
        },
        {
          label: "CSD3",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["info"],
          pointBackgroundColor: colors.theme["info"],
          maxBarThickness: 25,
          stack: "real",
        },
        {
          label: "CSD4",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "real",
        },
        {
          label: "CSD5",
          data: [21, 21, 21, 21],
          backgroundColor: colors.theme["primary"],
          pointBackgroundColor: colors.theme["primary"],
          maxBarThickness: 25,
          stack: "real",
        },
        {
          label: "CSD6",
          data: [21, 21, 21, 21],
          backgroundColor: "#ffd600",
          pointBackgroundColor: "#ffd600",
          maxBarThickness: 25,
          stack: "real",
        },
        {
          label: "CSD7",
          data: [21, 21, 21, 21],
          backgroundColor: "#8965e0",
          pointBackgroundColor: "#8965e0",
          maxBarThickness: 25,
          stack: "real",
        },
        {
          label: "CSD8",
          data: [21, 21, 21, 21],
          backgroundColor: "#f3a4b5",
          pointBackgroundColor: "#f3a4b5",
          maxBarThickness: 25,
          stack: "real",
        },
      ],
    };
    return pushdowndata;
  },
};

// Example 2 of Chart inside src/views/Index.js (Total orders - Card)
let energy2chart = {
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                //return '$' + value + 'k'
                return value;
              }
            },
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            font: {
              weight: "bold", // 레이블을 굵은 글씨로 설정
            },
            afterTickToLabelConversion: function (data) {
              // 마지막 눈금의 레이블을 가져와서 설정
              var xLabels = data.ticks;
              xLabels[xLabels.length - 1].fontStyle = "bold";
            },
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";
          if (data.datasets.length > 1) {
            content += label;
          }
          content += yLabel;
          return content;
        },
      },
    },
  },
  data: (canvas) => {
    return {
      labels: [
        "16:17:30",
        "16:17:40",
        "16:17:50",
        "16:18:00",
        "16:18:10",
        "16:18:20",
        "16:18:30",
        "16:18:40",
      ],
      datasets: [
        {
          label: "CPU",
          data: [60, 10, 35, 35, 20, 15, 20, 5],
        },
        {
          label: "Memory",
          data: [60, 20, 35, 35, 20, 15, 20, 5],
        },
        {
          label: "Disk",
          data: [60, 30, 35, 35, 20, 15, 20, 5],
        },
        {
          label: "Network",
          data: [60, 40, 35, 35, 20, 15, 20, 5],
        },
        {
          label: "Block Count",
          data: [60, 50, 35, 35, 20, 15, 20, 5],
        },
      ],
    };
  },
  data1: (canvas) => {
    let energyData = energychart.data();
    return {
      labels: energyData.labels,
      datasets: [
        {
          label: "CPU",
          data: energyData.datasets[0].data,
          maxBarThickness: 10,
        },
      ],
    };
  },
  data2: (canvas) => {
    let energyData = energychart.data();
    return {
      labels: energyData.labels,
      datasets: [
        {
          label: "Memory",
          data: energyData.datasets[1].data,
          maxBarThickness: 10,
        },
      ],
    };
  },
  data3: (canvas) => {
    let energyData = energychart.data();
    return {
      labels: energyData.labels,
      datasets: [
        {
          label: "Disk",
          data: energyData.datasets[2].data,
          maxBarThickness: 10,
        },
      ],
    };
  },
  data4: (canvas) => {
    let energyData = energychart.data();
    return {
      labels: energyData.labels,
      datasets: [
        {
          label: "Network",
          data: energyData.datasets[3].data,
          maxBarThickness: 10,
        },
      ],
    };
  },
  data5: (canvas) => {
    let energyData = energychart.data();
    return {
      labels: energyData.labels,
      datasets: [
        {
          label: "Block Count",
          data: energyData.datasets[4].data,
          maxBarThickness: 10,
        },
      ],
    };
  },
};

let chartExample3 = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900],
          },
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                return value;
              }
            },
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1) {
            content += label;
          }

          content += " " + yLabel;
          return content;
        },
      },
    },
  },
  data: (canvas) => {
    return {
      labels: [
        "16:17:30",
        "16:17:40",
        "16:17:50",
        "16:18:00",
        "16:18:10",
        "16:18:20",
        "16:18:30",
        "16:18:40",
      ],
      datasets: [
        {
          label: "CSD-CPU",
          data: [0, 15, 10, 25, 40, 60, 65, 80],
          borderColor: colors.theme["danger"],
          pointBackgroundColor: colors.theme["danger"],
        },
        {
          label: "CSD-Memory",
          data: [0, 10, 5, 15, 30, 50, 70, 90],
          borderColor: colors.theme["success"],
          pointBackgroundColor: colors.theme["success"],
        },
      ],
    };
  },
};
let chartExample4 = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900],
          },
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                return value;
              }
            },
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1) {
            content += label;
          }

          content += " " + yLabel + "%";
          return content;
        },
      },
    },
  },
  data: (canvas) => {
    return {
      labels: [
        "CPU\nUsage",
        "Memory\nUsage",
        "Network\nRx\nByte",
        "Network\nTx\nByte",
        "Time",
        "Effect Percent",
      ],
      datasets: [
        {
          label: "CSD",
          data: [40, 86, 100, 100, 28],
          maxBarThickness: 15,
        },
        {
          label: "SSD",
          data: [60, 14, 0, 0, 72],
          maxBarThickness: 15,
          backgroundColor: colors.theme["warning"],
        },
        {
          label: "Effect Percent",
          data: [0, 0, 0, 0, 0, 155],
          maxBarThickness: 15,
          backgroundColor: colors.theme["danger"],
        },
      ],
    };
  },
};
let chartExample5 = {
  options: {
    legend: {
      position: "right",
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.labels[item.index] || "";
          var content = "";

          if (data.labels.length > 1) {
            content += label;
          }
          content += " " + data.datasets[0].data[item.index] + "%";
          return content;
        },
      },
    },
  },
  data: (canvas) => {
    return {
      labels: ["Aggregation", "Join", "SubQuery", "GroupBy", "OrderBy"],
      datasets: [
        {
          data: [10, 25, 25, 30, 10],
          backgroundColor: [
            colors.theme["danger"],
            colors.theme["warning"],
            colors.theme["success"],
            colors.theme["info"],
            colors.theme["primary"],
          ],
        },
      ],
    };
  },
};
module.exports = {
  chartOptions, // used inside src/views/Index.js
  parseOptions, // used inside src/views/Index.js
  pushdowneffectcheckchart, // used inside src/views/Index.js
  energychart, // used inside src/views/Index.js
  querychart,
  pushdownchart,
  chartExample3, // used inside src/views/Index.js
  chartExample4, // used inside src/views/Index.js
  chartExample5, // used inside src/views/Index.js
};
