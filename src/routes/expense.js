const express = require("express");
const router = express.Router();

const {
	addExpense,
	getAllExpense,
	deleteExpense,
	downloadExpenseExcel,
  updateExpense,
} = require("../controllers/expense");
const { authMiddleware } = require("../middlewares/auth");

router.post("/add", authMiddleware, addExpense);
router.get("/get", authMiddleware, getAllExpense);
router.get("/downloadexcel", authMiddleware, downloadExpenseExcel);
router.delete("/:id", authMiddleware, deleteExpense);
router.patch("/:id", authMiddleware, updateExpense);

module.exports = router;
