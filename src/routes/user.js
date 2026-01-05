const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/user");
const { authMiddleware } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
// router.post("/forget", forgetPassword);
// router.patch("/update", authMiddleware, updateUserDetails);
router.post("/logout", logout);
// router.get("/auth", authMiddleware, getMe);
// router.patch(
// 	"/threshold",
// 	authMiddleware,
// 	requireRole("admin", "counsellor"),
// 	updateAlertThreshold
// );

module.exports = router;
