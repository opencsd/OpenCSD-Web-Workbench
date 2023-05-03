const express = require("express");
const router = express.Router();

router.use(express.static("/root/Web/web-simul/client/build"));
router.get("/", (req, res) => {
  res.sendFile("Energy.js");
});

module.exports = router;
