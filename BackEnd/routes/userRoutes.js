const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middlewares/verifyToken");

router.use(verifyJWT);
router.route("/").get(userController.getAllUsers);
router.route("/user").get(userController.getUser);
router.route("/:id").put(userController.updateUser);
router.route("/:id").delete(userController.deleteUser);

module.exports = router;
