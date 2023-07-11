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

analysisApp.post("/pushdown", (req, res) => {
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
