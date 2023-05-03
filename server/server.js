const express = require("express");
const app = express();
const main = require("./Router/main");
const workbench = require("./Router/workbenchRoute");
const assistant = require("./Router/assistantRoute");
const energy = require("./Router/energyRoute");
const pushdown = require("./Router/pushdownRoute");
const ssh = require("./Router/sshRoute");

app.use("/", main);
app.use("/admin/workbench", workbench);
app.use("/admin/assistant", assistant);
app.use("/admin/energy", energy);
app.use("/admin/pushdown", pushdown);
app.use("/admin/ssh", ssh);

const port = 5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
