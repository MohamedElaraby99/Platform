const express = require("express");
const {
  submitTest,
  getAllResults,
} = require("../controllers/studentResultController");
const router = express.Router();

router.post("/submit", submitTest);

router.get("/results", getAllResults);

module.exports = router;
