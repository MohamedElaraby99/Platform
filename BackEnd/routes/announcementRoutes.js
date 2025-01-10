const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");
const verifyJWT = require("../middlewares/verifyToken");

router.use(verifyJWT);
router.route("/").get(announcementController.getAnnouncements);
router.route("/").post(announcementController.createAnnouncement);
router.route("/:id").put(announcementController.updateAnnouncement);
router.route("/:id").delete(announcementController.deleteAnnouncement);

module.exports = router;
