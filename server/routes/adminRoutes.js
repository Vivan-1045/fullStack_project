const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {
  createUser,
  createStore,
  getDashboard,
  getUsers,
  getStores
} = require("../controller/adminController");


router.post(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createUser
);

router.post(
  "/stores",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createStore
);

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getDashboard
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

router.get(
  "/stores",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getStores
);

module.exports = router;