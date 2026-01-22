const express = require("express");
const router = express.Router();

const {
	addIncome,
	getAllIncome,
	deleteIncome,
	downloadIncomeExcel,
  updateIncome,
} = require("../controllers/income");
const { authMiddleware } = require("../middlewares/auth");

router.post("/add", authMiddleware, addIncome)
router.get("/get", authMiddleware, getAllIncome)
router.get("/downloadexcel", authMiddleware, downloadIncomeExcel)
router.delete("/:id", authMiddleware, deleteIncome)
router.patch("/:id", authMiddleware, updateIncome)

module.exports = router;
