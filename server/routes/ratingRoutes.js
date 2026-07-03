const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  submitRating,
  updateRating
} = require("../controller/ratingController");



router.post(
  "/",
  authMiddleware,
  submitRating
);

router.put(
  "/:id",
  authMiddleware,
  updateRating
);

module.exports = router;