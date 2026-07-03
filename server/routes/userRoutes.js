const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  updatePassword
} = require("../controller/userController");



router.put(
  "/update-password",
  authMiddleware,
  updatePassword
);

module.exports = router;