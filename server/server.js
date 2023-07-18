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
  const colorList = [
    "primary",
    "info",
    "success",
    "danger",
    "warning",
    "default",
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
          {
            label: "CSD1",
            data: requestData.data.map(
              (item) => item.effectCheck[1].cpuForcast
            ),
            backgroundColor: colors.theme["danger"],
            pointBackgroundColor: colors.theme["danger"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD2",
            data: requestData.data.map(
              (item) => item.effectCheck[2].cpuForcast
            ),
            backgroundColor: colors.theme["success"],
            pointBackgroundColor: colors.theme["success"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD3",
            data: requestData.data.map(
              (item) => item.effectCheck[3].cpuForcast
            ),
            backgroundColor: colors.theme["info"],
            pointBackgroundColor: colors.theme["info"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD4",
            data: requestData.data.map(
              (item) => item.effectCheck[4].cpuForcast
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD5",
            data: requestData.data.map(
              (item) => item.effectCheck[5].cpuForcast
            ),
            backgroundColor: colors.theme["primary"],
            pointBackgroundColor: colors.theme["primary"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD6",
            data: requestData.data.map(
              (item) => item.effectCheck[6].cpuForcast
            ),
            backgroundColor: "#ffd600",
            pointBackgroundColor: "#ffd600",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD7",
            data: requestData.data.map(
              (item) => item.effectCheck[7].cpuForcast
            ),
            backgroundColor: "#8965e0",
            pointBackgroundColor: "#8965e0",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD8",
            data: requestData.data.map(
              (item) => item.effectCheck[8].cpuForcast
            ),
            backgroundColor: "#f3a4b5",
            pointBackgroundColor: "#f3a4b5",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "SSD",
            data: Array.from(
              { length: requestData.data.length },
              () => requestData.ssd.userCPU
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "SSD",
          },
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
          {
            label: "CSD1",
            data: requestData.data.map(
              (item) => item.effectCheck[1].netForcast
            ),
            backgroundColor: colors.theme["danger"],
            pointBackgroundColor: colors.theme["danger"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD2",
            data: requestData.data.map(
              (item) => item.effectCheck[2].netForcast
            ),
            backgroundColor: colors.theme["success"],
            pointBackgroundColor: colors.theme["success"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD3",
            data: requestData.data.map(
              (item) => item.effectCheck[3].netForcast
            ),
            backgroundColor: colors.theme["info"],
            pointBackgroundColor: colors.theme["info"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD4",
            data: requestData.data.map(
              (item) => item.effectCheck[4].netForcast
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD5",
            data: requestData.data.map(
              (item) => item.effectCheck[5].netForcast
            ),
            backgroundColor: colors.theme["primary"],
            pointBackgroundColor: colors.theme["primary"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD6",
            data: requestData.data.map(
              (item) => item.effectCheck[6].netForcast
            ),
            backgroundColor: "#ffd600",
            pointBackgroundColor: "#ffd600",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD7",
            data: requestData.data.map(
              (item) => item.effectCheck[7].netForcast
            ),
            backgroundColor: "#8965e0",
            pointBackgroundColor: "#8965e0",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD8",
            data: requestData.data.map(
              (item) => item.effectCheck[8].netForcast
            ),
            backgroundColor: "#f3a4b5",
            pointBackgroundColor: "#f3a4b5",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "SSD",
            data: Array.from(
              { length: requestData.data.length },
              () => requestData.ssd.userNet
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "SSD",
          },
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
          {
            label: "CSD1",
            data: requestData.data.map(
              (item) => item.effectCheck[1].powerForcast
            ),
            backgroundColor: colors.theme["danger"],
            pointBackgroundColor: colors.theme["danger"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD2",
            data: requestData.data.map(
              (item) => item.effectCheck[2].powerForcast
            ),
            backgroundColor: colors.theme["success"],
            pointBackgroundColor: colors.theme["success"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD3",
            data: requestData.data.map(
              (item) => item.effectCheck[3].powerForcast
            ),
            backgroundColor: colors.theme["info"],
            pointBackgroundColor: colors.theme["info"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD4",
            data: requestData.data.map(
              (item) => item.effectCheck[4].powerForcast
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD5",
            data: requestData.data.map(
              (item) => item.effectCheck[5].powerForcast
            ),
            backgroundColor: colors.theme["primary"],
            pointBackgroundColor: colors.theme["primary"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD6",
            data: requestData.data.map(
              (item) => item.effectCheck[6].powerForcast
            ),
            backgroundColor: "#ffd600",
            pointBackgroundColor: "#ffd600",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD7",
            data: requestData.data.map(
              (item) => item.effectCheck[7].powerForcast
            ),
            backgroundColor: "#8965e0",
            pointBackgroundColor: "#8965e0",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD8",
            data: requestData.data.map(
              (item) => item.effectCheck[8].powerForcast
            ),
            backgroundColor: "#f3a4b5",
            pointBackgroundColor: "#f3a4b5",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "SSD",
            data: Array.from(
              { length: requestData.data.length },
              () => requestData.ssd.userPower
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "SSD",
          },
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
          {
            label: "CSD1",
            data: requestData.data.map(
              (item) => item.effectCheck[1].timeForcast
            ),
            backgroundColor: colors.theme["danger"],
            pointBackgroundColor: colors.theme["danger"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD2",
            data: requestData.data.map(
              (item) => item.effectCheck[2].timeForcast
            ),
            backgroundColor: colors.theme["success"],
            pointBackgroundColor: colors.theme["success"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD3",
            data: requestData.data.map(
              (item) => item.effectCheck[3].timeForcast
            ),
            backgroundColor: colors.theme["info"],
            pointBackgroundColor: colors.theme["info"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD4",
            data: requestData.data.map(
              (item) => item.effectCheck[4].timeForcast
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD5",
            data: requestData.data.map(
              (item) => item.effectCheck[5].timeForcast
            ),
            backgroundColor: colors.theme["primary"],
            pointBackgroundColor: colors.theme["primary"],
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD6",
            data: requestData.data.map(
              (item) => item.effectCheck[6].timeForcast
            ),
            backgroundColor: "#ffd600",
            pointBackgroundColor: "#ffd600",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD7",
            data: requestData.data.map(
              (item) => item.effectCheck[7].timeForcast
            ),
            backgroundColor: "#8965e0",
            pointBackgroundColor: "#8965e0",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "CSD8",
            data: requestData.data.map(
              (item) => item.effectCheck[8].timeForcast
            ),
            backgroundColor: "#f3a4b5",
            pointBackgroundColor: "#f3a4b5",
            maxBarThickness: 25,
            stack: "CSD",
          },
          {
            label: "SSD",
            data: Array.from(
              { length: requestData.data.length },
              () => requestData.ssd.userTime
            ),
            backgroundColor: colors.theme["warning"],
            pointBackgroundColor: colors.theme["warning"],
            maxBarThickness: 25,
            stack: "SSD",
          },
        ],
      },
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
        resultScore: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
        resultScore: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
        resultScore: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
        resultScore: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
        resultScore: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
        resultScore: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
        resultScore: Math.floor(Math.random() * 10),
      },
      {
        cpuForcast: Math.floor(Math.random() * 10),
        netForcast: Math.floor(Math.random() * 10),
        powerForcast: Math.floor(Math.random() * 10),
        timeForcast: Math.floor(Math.random() * 10),
        resultScore: Math.floor(Math.random() * 10),
      },
    ],
  };
  if ("environment" in requestData) {
    console.log("예외발생");
    jsonData = {
      userCPU: 200,
      userNet: 200,
      userPower: 200,
      userTime: 200,
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
          resultScore: Math.floor(Math.random() * 10),
        },
        {
          cpuForcast: Math.floor(Math.random() * 10),
          netForcast: Math.floor(Math.random() * 10),
          powerForcast: Math.floor(Math.random() * 10),
          timeForcast: Math.floor(Math.random() * 10),
          resultScore: Math.floor(Math.random() * 10),
        },
        {
          cpuForcast: Math.floor(Math.random() * 10),
          netForcast: Math.floor(Math.random() * 10),
          powerForcast: Math.floor(Math.random() * 10),
          timeForcast: Math.floor(Math.random() * 10),
          resultScore: Math.floor(Math.random() * 10),
        },
        {
          cpuForcast: Math.floor(Math.random() * 10),
          netForcast: Math.floor(Math.random() * 10),
          powerForcast: Math.floor(Math.random() * 10),
          timeForcast: Math.floor(Math.random() * 10),
          resultScore: Math.floor(Math.random() * 10),
        },
        {
          cpuForcast: Math.floor(Math.random() * 10),
          netForcast: Math.floor(Math.random() * 10),
          powerForcast: Math.floor(Math.random() * 10),
          timeForcast: Math.floor(Math.random() * 10),
          resultScore: Math.floor(Math.random() * 10),
        },
        {
          cpuForcast: Math.floor(Math.random() * 10),
          netForcast: Math.floor(Math.random() * 10),
          powerForcast: Math.floor(Math.random() * 10),
          timeForcast: Math.floor(Math.random() * 10),
          resultScore: Math.floor(Math.random() * 10),
        },
        {
          cpuForcast: Math.floor(Math.random() * 10),
          netForcast: Math.floor(Math.random() * 10),
          powerForcast: Math.floor(Math.random() * 10),
          timeForcast: Math.floor(Math.random() * 10),
          resultScore: Math.floor(Math.random() * 10),
        },
        {
          cpuForcast: Math.floor(Math.random() * 10),
          netForcast: Math.floor(Math.random() * 10),
          powerForcast: Math.floor(Math.random() * 10),
          timeForcast: Math.floor(Math.random() * 10),
          resultScore: Math.floor(Math.random() * 10),
        },
      ],
    };
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
