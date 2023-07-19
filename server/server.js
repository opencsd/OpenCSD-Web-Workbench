const express = require("express");
const cors = require("cors");
const axios = require("axios");
const csv = require("csv-parser");
const fs = require("fs");

const bodyParser = require("body-parser");
const main = require("./Router/main");
const workbench = require("./Router/workbenchRoute");
const assistant = require("./Router/assistantRoute");
const energy = require("./Router/energyRoute");
const pushdown = require("./Router/pushdownRoute");
const option = require("./Router/optionRoute");
/*
const app = express();


const port = 5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
*/

//DB Connector로부터 수신한 Snippet Analysis 관리
const analysisApp = express();
const csvWriter = require("csv-writer");
analysisApp.use("/", main);
analysisApp.use("/admin/workbench", workbench);
analysisApp.use("/admin/assistant", assistant);
analysisApp.use("/admin/energy", energy);
analysisApp.use("/admin/pushdown", pushdown);
analysisApp.use("/admin/option", option);
analysisApp.use(bodyParser.json()); //JSON 및 URL-encoded 데이터를 파싱하는 미들웨어
analysisApp.use(bodyParser.urlencoded({ extended: false }));
analysisApp.use(cors());

analysisApp.listen(40400, () => {
  console.log(`Listening on port 40400`);
});

analysisApp.post("/admin/workbench", (req, res) => {
  const { dbms, host, port, demo } = req.body;
  console.log(req.body);
  console.log(dbms, host, port);

  // 로그인 정보 유효성 검사 등 추가 로직 수행 가능

  // CSV 파일에 로그인 정보 추가
  const writer = csvWriter.createObjectCsvWriter({
    path: "logins.csv",
    header: [
      { id: "dbms", title: "DBMS" },
      { id: "host", title: "Host" },
      { id: "port", title: "Port" },
      { id: "demo", title: "Demo" },
    ],
    append: false,
  });
  writer
    .writeRecords([{ dbms: dbms, host: host, port: port, demo: demo }])
    .catch((error) => console.error(error));

  // 로그인 성공 응답
  res.status(200).json({ message: "로그인 성공" });
});

analysisApp.get("/login_data", (req, res) => {
  fs.createReadStream("logins.csv")
    .pipe(csv())
    .on("data", (data) => {
      res.json(data); // data를 바로 response로 보냄
    })
    .on("end", () => {
      res.end(); // response 종료
    });
});

analysisApp.post("/charts", (req, res) => {
  const requestData = req.body;
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
  const colorList = [
    "primary",
    "info",
    "success",
    "danger",
    "warning",
    "default",
  ];
  const csdColors = [
    colors.theme["danger"],
    colors.theme["success"],
    colors.theme["info"],
    colors.theme["warning"],
    colors.theme["primary"],
    "#ffd600",
    "#8965e0",
    "#f3a4b5",
  ];

  const jsonData = {
    line: {
      Total: {
        labels: ["CPU", "Net", "Power", "Time"],
        datasets: Array.from({ length: requestData.data.length }, (_, i) => ({
          label: `Query ${requestData.index[i] + 1}`,
          data: [
            requestData.data[i].effectCheck.reduce(
              (total, item) => total + item.cpuForcast,
              0
            ),
            requestData.data[i].effectCheck.reduce(
              (total, item) => total + item.netForcast,
              0
            ),
            requestData.data[i].effectCheck.reduce(
              (total, item) => total + item.powerForcast,
              0
            ),
            requestData.data[i].effectCheck.reduce(
              (total, item) => total + item.timeForcast,
              0
            ),
          ],
          pointBackgroundColor: colors.theme[colorList[i]],
          borderColor: colors.theme[colorList[i]],
        })),
      },
      SE: {
        labels: ["CPU", "Net", "Power", "Time"],
        datasets: Array.from({ length: requestData.data.length }, (_, i) => ({
          label: `Query ${requestData.index[i] + 1}`,
          data: [
            requestData.data[i].effectCheck[0].cpuForcast,
            requestData.data[i].effectCheck[0].netForcast,
            requestData.data[i].effectCheck[0].powerForcast,
            requestData.data[i].effectCheck[0].timeForcast,
          ],
          pointBackgroundColor: colors.theme[colorList[i]],
          borderColor: colors.theme[colorList[i]],
        })),
      },
      CSD: {
        labels: ["CPU", "Net", "Power", "Time"],
        datasets: Array.from({ length: requestData.data.length }, (_, i) => ({
          label: `Query ${requestData.index[i] + 1}`,
          data: [
            requestData.data[i].effectCheck
              .slice(1)
              .reduce((total, item) => total + item.cpuForcast, 0),
            requestData.data[i].effectCheck
              .slice(1)
              .reduce((total, item) => total + item.netForcast, 0),
            requestData.data[i].effectCheck
              .slice(1)
              .reduce((total, item) => total + item.powerForcast, 0),
            requestData.data[i].effectCheck
              .slice(1)
              .reduce((total, item) => total + item.timeForcast, 0),
          ],
          pointBackgroundColor: colors.theme[colorList[i]],
          borderColor: colors.theme[colorList[i]],
        })),
      },
    },
    bar: {
      CPU: {
        labels: requestData.index.map((item) => `Query ${item + 1}`),
        datasets: [
          {
            label: "Storage Engine",
            data: requestData.data.map(
              (item) => item.effectCheck[0].cpuForcast
            ),
            backgroundColor: colors.theme["primary"],
            pointBackgroundColor: colors.theme["primary"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          ...requestData.data[0].effectCheck.slice(1).map((_, index) => ({
            label: `CSD${index + 1}`,
            data: requestData.data.map(
              (item) => item.effectCheck[index + 1].cpuForcast
            ),
            backgroundColor: csdColors[index],
            pointBackgroundColor: csdColors[index],
            maxBarThickness: 25,
            stack: "CSD",
          })),
          {
            label: "User SSD",
            data: Array.from(
              { length: requestData.data.length },
              () => requestData.userSSD.userCPU
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "UserSSD",
          },
          ...requestData.userCSD.map((userCsd, index) => ({
            label: index === 0 ? "User Storage Engine" : `User CSD${index}`,
            data: Array.from(
              { length: requestData.data.length },
              () => userCsd.userCPU
            ),
            backgroundColor: csdColors[index],
            pointBackgroundColor: csdColors[index],
            maxBarThickness: 25,
            stack: "UserCSD",
          })),
        ],
      },
      Net: {
        labels: requestData.index.map((item) => `Query ${item + 1}`),
        datasets: [
          {
            label: "Storage Engine",
            data: requestData.data.map(
              (item) => item.effectCheck[0].netForcast
            ),
            backgroundColor: colors.theme["primary"],
            pointBackgroundColor: colors.theme["primary"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          ...requestData.data[0].effectCheck.slice(1).map((_, index) => ({
            label: `CSD${index + 1}`,
            data: requestData.data.map(
              (item) => item.effectCheck[index + 1].netForcast
            ),
            backgroundColor: csdColors[index],
            pointBackgroundColor: csdColors[index],
            maxBarThickness: 25,
            stack: "CSD",
          })),
          {
            label: "UserSSD",
            data: Array.from(
              { length: requestData.data.length },
              () => requestData.userSSD.userNet
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "UserSSD",
          },
          ...requestData.userCSD.map((userCsd, index) => ({
            label: index === 0 ? "User Storage Engine" : `User CSD${index}`,
            data: Array.from(
              { length: requestData.data.length },
              () => userCsd.userNet
            ),
            backgroundColor: csdColors[index],
            pointBackgroundColor: csdColors[index],
            maxBarThickness: 25,
            stack: "UserCSD",
          })),
        ],
      },
      Power: {
        labels: requestData.index.map((item) => `Query ${item + 1}`),
        datasets: [
          {
            label: "Storage Engine",
            data: requestData.data.map(
              (item) => item.effectCheck[0].powerForcast
            ),
            backgroundColor: colors.theme["primary"],
            pointBackgroundColor: colors.theme["primary"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          ...requestData.data[0].effectCheck.slice(1).map((_, index) => ({
            label: `CSD${index + 1}`,
            data: requestData.data.map(
              (item) => item.effectCheck[index + 1].powerForcast
            ),
            backgroundColor: csdColors[index],
            pointBackgroundColor: csdColors[index],
            maxBarThickness: 25,
            stack: "CSD",
          })),
          {
            label: "UserSSD",
            data: Array.from(
              { length: requestData.data.length },
              () => requestData.userSSD.userPower
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "UserSSD",
          },
          ...requestData.userCSD.map((userCsd, index) => ({
            label: index === 0 ? "User Storage Engine" : `User CSD${index}`,
            data: Array.from(
              { length: requestData.data.length },
              () => userCsd.userPower
            ),
            backgroundColor: csdColors[index],
            pointBackgroundColor: csdColors[index],
            maxBarThickness: 25,
            stack: "UserCSD",
          })),
        ],
      },
      Time: {
        labels: requestData.index.map((item) => `Query ${item + 1}`),
        datasets: [
          {
            label: "Storage Engine",
            data: requestData.data.map(
              (item) => item.effectCheck[0].timeForcast
            ),
            backgroundColor: colors.theme["primary"],
            pointBackgroundColor: colors.theme["primary"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          ...requestData.data[0].effectCheck.slice(1).map((_, index) => ({
            label: `CSD${index + 1}`,
            data: requestData.data.map(
              (item) => item.effectCheck[index + 1].timeForcast
            ),
            backgroundColor: csdColors[index],
            pointBackgroundColor: csdColors[index],
            maxBarThickness: 25,
            stack: "CSD",
          })),
          {
            label: "UserSSD",
            data: Array.from(
              { length: requestData.data.length },
              () => requestData.userSSD.userTime
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "UserSSD",
          },
          ...requestData.userCSD.map((userCsd, index) => ({
            label: index === 0 ? "User Storage Engine" : `User CSD${index}`,
            data: Array.from(
              { length: requestData.data.length },
              () => userCsd.userTime
            ),
            backgroundColor: csdColors[index],
            pointBackgroundColor: csdColors[index],
            maxBarThickness: 25,
            stack: "UserCSD",
          })),
        ],
      },
    },
  };
  const maxTotal = [
    Math.max(...jsonData.line.Total.datasets.map((item) => item.data[0])),
    Math.max(...jsonData.line.Total.datasets.map((item) => item.data[1])),
    Math.max(...jsonData.line.Total.datasets.map((item) => item.data[2])),
    Math.max(...jsonData.line.Total.datasets.map((item) => item.data[3])),
  ];
  const maxSE = [
    Math.max(...jsonData.line.SE.datasets.map((item) => item.data[0])),
    Math.max(...jsonData.line.SE.datasets.map((item) => item.data[1])),
    Math.max(...jsonData.line.SE.datasets.map((item) => item.data[2])),
    Math.max(...jsonData.line.SE.datasets.map((item) => item.data[3])),
  ];
  const maxCSD = [
    Math.max(...jsonData.line.CSD.datasets.map((item) => item.data[0])),
    Math.max(...jsonData.line.CSD.datasets.map((item) => item.data[1])),
    Math.max(...jsonData.line.CSD.datasets.map((item) => item.data[2])),
    Math.max(...jsonData.line.CSD.datasets.map((item) => item.data[3])),
  ];
  jsonData.line.Total.datasets = jsonData.line.Total.datasets.map((dataset) => {
    const modifiedValues = dataset.data.map((value, index) => {
      return Math.round((value / maxTotal[index]) * 100);
    });

    return {
      ...dataset,
      data: modifiedValues,
    };
  });
  jsonData.line.SE.datasets = jsonData.line.SE.datasets.map((dataset) => {
    const modifiedValues = dataset.data.map((value, index) => {
      return Math.round((value / maxSE[index]) * 100);
    });

    return {
      ...dataset,
      data: modifiedValues,
    };
  });
  jsonData.line.CSD.datasets = jsonData.line.CSD.datasets.map((dataset) => {
    const modifiedValues = dataset.data.map((value, index) => {
      return Math.round((value / maxCSD[index]) * 100);
    });

    return {
      ...dataset,
      data: modifiedValues,
    };
  });
  res.send(jsonData);
});

analysisApp.post("/resultChart", (req, res) => {
  const requestData = req.body;
  console.log(requestData);
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
  const effectCheckColors = [
    colors.theme["primary"],
    colors.theme["danger"],
    colors.theme["success"],
    colors.theme["info"],
    colors.theme["warning"],
    colors.theme["primary"],
    "#ffd600",
    "#8965e0",
    "#f3a4b5",
    colors.theme["primary"],
  ];

  const jsonData = {
    CPU: {
      labels: ["CPU"],
      datasets: [
        ...requestData.data.effectCheck.map((effectCheck, index) => ({
          label: index === 0 ? "Storage Engine" : `CSD${index}`,
          data: [effectCheck.cpuForcast],
          backgroundColor: effectCheckColors[index],
          pointBackgroundColor: effectCheckColors[index],
          maxBarThickness: 25,
          stack: "CSD",
        })),
        {
          label: "UserSSD",
          data: [requestData.userSSD.userCPU],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "UserSSD",
        },
        ...requestData.userCSD.map((userCsd, index) => ({
          label: index === 0 ? "User Storage Engine" : `User CSD${index}`,
          data: [userCsd.userCPU],
          backgroundColor: effectCheckColors[index + 1],
          pointBackgroundColor: effectCheckColors[index + 1],
          maxBarThickness: 25,
          stack: "UserCSD",
        })),
      ],
    },
    Net: {
      labels: ["Net"],
      datasets: [
        ...requestData.data.effectCheck.map((effectCheck, index) => ({
          label: index === 0 ? "Storage Engine" : `CSD${index}`,
          data: [effectCheck.netForcast],
          backgroundColor: effectCheckColors[index],
          pointBackgroundColor: effectCheckColors[index],
          maxBarThickness: 25,
          stack: "CSD",
        })),
        {
          label: "UserSSD",
          data: [requestData.userSSD.userNet],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "UserSSD",
        },
        ...requestData.userCSD.map((userCsd, index) => ({
          label: index === 0 ? "User Storage Engine" : `User CSD${index}`,
          data: [userCsd.userNet],
          backgroundColor: effectCheckColors[index + 1],
          pointBackgroundColor: effectCheckColors[index + 1],
          maxBarThickness: 25,
          stack: "UserCSD",
        })),
      ],
    },
    Power: {
      labels: ["Power"],
      datasets: [
        ...requestData.data.effectCheck.map((effectCheck, index) => ({
          label: index === 0 ? "Storage Engine" : `CSD${index}`,
          data: [effectCheck.powerForcast],
          backgroundColor: effectCheckColors[index],
          pointBackgroundColor: effectCheckColors[index],
          maxBarThickness: 25,
          stack: "CSD",
        })),
        {
          label: "UserSSD",
          data: [requestData.userSSD.userPower],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "UserSSD",
        },
        ...requestData.userCSD.map((userCsd, index) => ({
          label: index === 0 ? "User Storage Engine" : `User CSD${index}`,
          data: [userCsd.userPower],
          backgroundColor: effectCheckColors[index + 1],
          pointBackgroundColor: effectCheckColors[index + 1],
          maxBarThickness: 25,
          stack: "UserCSD",
        })),
      ],
    },
    Time: {
      labels: ["Time"],
      datasets: [
        ...requestData.data.effectCheck.map((effectCheck, index) => ({
          label: index === 0 ? "Storage Engine" : `CSD${index}`,
          data: [effectCheck.timeForcast],
          backgroundColor: effectCheckColors[index],
          pointBackgroundColor: effectCheckColors[index],
          maxBarThickness: 25,
          stack: "CSD",
        })),
        {
          label: "UserSSD",
          data: [requestData.userSSD.userTime],
          backgroundColor: colors.theme["warning"],
          pointBackgroundColor: colors.theme["warning"],
          maxBarThickness: 25,
          stack: "UserSSD",
        },
        ...requestData.userCSD.map((userCsd, index) => ({
          label: index === 0 ? "User Storage Engine" : `User CSD${index}`,
          data: [userCsd.userTime],
          backgroundColor: effectCheckColors[index + 1],
          pointBackgroundColor: effectCheckColors[index + 1],
          maxBarThickness: 25,
          stack: "UserCSD",
        })),
      ],
    },
  };
  res.send(jsonData);
});

analysisApp.post("/pushdown", (req, res) => {
  const requestData = req.body; // 요청으로 받은 JSON 데이터
  console.log(requestData);

  let jsonData = {
    effectCheck: [
      {
        cpuForcast: Math.floor(Math.random() * 300),
        netForcast: Math.floor(Math.random() * 300),
        powerForcast: Math.floor(Math.random() * 300),
        timeForcast: Math.floor(Math.random() * 300),
        resultScore: Math.floor(Math.random() * 300),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
      },
    ],
  };
  if ("environment" in requestData) {
    console.log("예외발생");
    if (requestData.environment.storage === "CSD") {
      jsonData = {
        userSSD: {
          userCPU: Math.floor(Math.random() * 300),
          userNet: Math.floor(Math.random() * 300),
          userPower: Math.floor(Math.random() * 300),
          userTime: Math.floor(Math.random() * 300),
        },
        userCSD: [
          {
            userCPU: Math.floor(Math.random() * 300),
            userNet: Math.floor(Math.random() * 300),
            userPower: Math.floor(Math.random() * 300),
            userTime: Math.floor(Math.random() * 300),
          },
          {
            userCPU: Math.floor(Math.random() * 10),
            userNet: Math.floor(Math.random() * 10),
            userPower: Math.floor(Math.random() * 10),
            userTime: Math.floor(Math.random() * 10),
          },
          {
            userCPU: Math.floor(Math.random() * 10),
            userNet: Math.floor(Math.random() * 10),
            userPower: Math.floor(Math.random() * 10),
            userTime: Math.floor(Math.random() * 10),
          },
          {
            userCPU: Math.floor(Math.random() * 10),
            userNet: Math.floor(Math.random() * 10),
            userPower: Math.floor(Math.random() * 10),
            userTime: Math.floor(Math.random() * 10),
          },
          {
            userCPU: Math.floor(Math.random() * 10),
            userNet: Math.floor(Math.random() * 10),
            userPower: Math.floor(Math.random() * 10),
            userTime: Math.floor(Math.random() * 10),
          },
          {
            userCPU: Math.floor(Math.random() * 10),
            userNet: Math.floor(Math.random() * 10),
            userPower: Math.floor(Math.random() * 10),
            userTime: Math.floor(Math.random() * 10),
          },
          {
            userCPU: Math.floor(Math.random() * 10),
            userNet: Math.floor(Math.random() * 10),
            userPower: Math.floor(Math.random() * 10),
            userTime: Math.floor(Math.random() * 10),
          },
          {
            userCPU: Math.floor(Math.random() * 10),
            userNet: Math.floor(Math.random() * 10),
            userPower: Math.floor(Math.random() * 10),
            userTime: Math.floor(Math.random() * 10),
          },
          {
            userCPU: Math.floor(Math.random() * 10),
            userNet: Math.floor(Math.random() * 10),
            userPower: Math.floor(Math.random() * 10),
            userTime: Math.floor(Math.random() * 10),
          },
        ],
        effectCheck: [
          {
            cpuForcast: Math.floor(Math.random() * 300),
            netForcast: Math.floor(Math.random() * 300),
            powerForcast: Math.floor(Math.random() * 300),
            timeForcast: Math.floor(Math.random() * 300),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
        ],
      };
    } else {
      jsonData = {
        userSSD: {
          userCPU: Math.floor(Math.random() * 300),
          userNet: Math.floor(Math.random() * 300),
          userPower: Math.floor(Math.random() * 300),
          userTime: Math.floor(Math.random() * 300),
        },
        effectCheck: [
          {
            cpuForcast: Math.floor(Math.random() * 300),
            netForcast: Math.floor(Math.random() * 300),
            powerForcast: Math.floor(Math.random() * 300),
            timeForcast: Math.floor(Math.random() * 300),
            resultScore: Math.floor(Math.random() * 300),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
          {
            cpuForcast: Math.floor(Math.random() * 10),
            netForcast: Math.floor(Math.random() * 10),
            powerForcast: Math.floor(Math.random() * 10),
            timeForcast: Math.floor(Math.random() * 10),
          },
        ],
      };
    }
  }
  console.log("gogo");
  res.send(jsonData);

  //  const url = "http://10.0.4.86:40101";
  //  axios
  //    .get(url, { params: requestData })
  //    .then((response) => {
  //      console.log("Response data:", response.data);
  //      // 원하는 동작 수행
  //      res.send(response.data);
  //    })
  //    .catch((error) => {
  //      console.error(error);
  //      // 오류 처리
  //    });
});
analysisApp.post("/query", (req, res) => {
  const requestData = req.body; // 요청으로 받은 JSON 데이터
  if (requestData.queryID) {
    if (requestData.queryID < 10)
      requestData.queryID = "TPC-H_0" + requestData.queryID;
    else requestData.queryID = "TPC-H_" + requestData.queryID;
  }

  const jsonData = {
    query: requestData.query,
    snippet: [
      {
        "Snippet Type": "Scan",
        "Projection Column": 5,
        "Filter Clause": 5,
        "Order by": 0,
        "Group by": 0,
      },
      {
        "Snippet Type": "Scan",
        "Projection Column": 3,
        "Filter Clause": 3,
        "Order by": 0,
        "Group by": 0,
      },
      {
        "Snippet Type": "Aggregation",
        "Projection Column": 5,
        "Filter Clause": 0,
        "Order by": 0,
        "Group by": 1,
      },
    ],
    SSDUsageForcast: 661,
    CSDUsageForcast: 285,
    ResourceConservationForcast: 232,
    pushdownUsage: 286,
    pushdownError: 0.28,
    PushdownConservationEffect: 231,
    EnergyUsageForcast1: 150,
    EnergyUsageForcast2: 130,
    conservationEffectForcast: 13.3,
    efficientOption: "Set 2",
    energyUsage: 130.24,
    error: 0.184,
    conservationEffect: 14,
  };
  res.send(jsonData);
});
