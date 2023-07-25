const express = require("express");
const router = express.Router();

router.use(express.static("/root/workspace/hjh/KETI-Web-Workbench/client/build"));
router.get("/", (req, res) => {
  res.sendFile("index.html");
});

module.exports = router;
