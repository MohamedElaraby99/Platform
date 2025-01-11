const express = require("express");
const router = express.Router();
const {
  getExamsWithScores,
  submitExam,
  addExam,
  updateExam,
  deleteExam
} = require("../controllers/examController");
const { verifyJWT, verifyAdmin } = require("../middlewares/verifyToken");

router.use(verifyJWT); // Protect routes
router.get("/", verifyJWT, getExamsWithScores);
router.post("/", verifyJWT, verifyAdmin, addExam);
router.put("/:id", verifyJWT, verifyAdmin, updateExam);
router.delete("/:id", verifyJWT, verifyAdmin, deleteExam);
router.post("/submit", verifyJWT, submitExam); // Submit an exam

module.exports = router;
