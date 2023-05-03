const express = require("express");
const router = express.Router();

router.use(express.static("/root/Web/web-simul/client/build"));
router.get("/", (req, res) => {
  res.sendFile("Admin.js");
});

module.exports = router;
