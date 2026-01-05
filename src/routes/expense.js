const express = require("express");
const router = express.Router();

const {
	addExpense,
	getAllExpense,
	deleteExpense,
	downloadExpenseExcel,
} = require("../controllers/expense");
const { authMiddleware } = require("../middlewares/auth");

router.post("/add", authMiddleware, addExpense);
router.get("/get", authMiddleware, getAllExpense);
router.get("/downloadexcel", authMiddleware, downloadExpenseExcel);
router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;
