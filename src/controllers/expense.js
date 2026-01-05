const Expense = require("../models/expense");
const User = require("../models/user.model");
const xlsx = require("xlsx");

exports.addExpense = async (req, res) => {
	const user = req.user;
	try {
		const { category, amount, date, description } = req.body;

		const expense = await Expense.create({
			userId: user?._id,
			category,
			amount,
			description,
			date: new Date(date),
		});

		res.status(200).json({
			expense,
			message: "Expense added",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Server Error",
		});
	}
};

exports.getAllExpense = async (req, res) => {
	const user = req.user;
	try {
		const expenses = await Expense.find({
			userId: user?._id,
		}).sort({ date: -1 });
		res.status(200).json({
			expenses: { ...expenses, type: "expense" },
			message: "Retrieved expenses",
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
		});
	}
};

exports.deleteExpense = async (req, res) => {
	try {
		await Expense.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: "Expense deleted",
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
		});
	}
};

exports.downloadExpenseExcel = async (req, res) => {
	try {
		const user = req.user;
		const expenses = await Expense.find({ userId: user?._id }).sort({
			date: -1,
		});
		const data = expenses.map((item) => ({
			Type: "Expense",
			Category: item.category,
			Amount: item.amount,
			Date: item.date,
		}));

		const wb = xlsx.utils.book_new();
		const ws = xlsx.utils.json_to_sheet(data);
		xlsx.utils.book_append_sheet(wb, ws, "Expense");

		const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
		res.setHeader(
			"Content-Disposition",
			"attachment; filename=transactions.xlsx"
		);
		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		);

		return res.status(200).send(buffer);
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
		});
	}
};
