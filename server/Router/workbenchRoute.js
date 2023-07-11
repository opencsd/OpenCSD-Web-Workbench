const express = require("express");
const router = express.Router();

router.use(express.static("/root/Web/workbench/client/build"));
router.get("/", (req, res) => {
  res.sendFile("Workbench.js");
});

module.exports = router;
