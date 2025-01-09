const express = require("express");

const router = express.Router();
const lessonController = require("../controllers/lessonController");
const verifyJWT = require("../middlewares/verifyToken");

router.use(verifyJWT);
router.route("/").get(lessonController.getAllLessons);
router.route("/").post(lessonController.createLesson);
router.route("/:id").put(lessonController.updateLesson);

module.exports = router;
