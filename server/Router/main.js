const express = require("express");
const router = express.Router();

router.use(express.static("/root/Web/workbench/client/build"));
router.get("/", (req, res) => {
  res.sendFile("index.html");
});

module.exports = router;
