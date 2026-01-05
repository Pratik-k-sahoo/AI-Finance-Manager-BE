const express = require("express");
const router = express.Router();
const { getDashboardData, downloadTransactionExcel } = require("../controllers/dashboard");
const { authMiddleware } = require("../middlewares/auth");

router.get("/", authMiddleware, getDashboardData);
router.get("/downloadexcel", authMiddleware, downloadTransactionExcel);

module.exports = router;
