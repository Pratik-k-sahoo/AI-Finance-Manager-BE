const connectDB = require("../config/connectDB");
const Expense = require("../models/expense");
const Income = require("../models/income");
const { isValidObjectId, Types } = require("mongoose");
const xlsx = require("xlsx");

exports.getDashboardData = async (req, res) => {
	try {
		await connectDB();
		const user = req.user;
		const userObjectId = new Types.ObjectId(String(user?._id));
		const incomes = await Income.find({ userId: user?._id }).sort({ date: -1 });
		const expenses = await Expense.find({ userId: user?._id }).sort({
			date: -1,
		});
		const totalIncome = await Income.aggregate([
			{ $match: { userId: userObjectId } },
			{ $group: { _id: null, total: { $sum: "$amount" } } },
		]);
		const totalExpense = await Expense.aggregate([
			{ $match: { userId: userObjectId } },
			{ $group: { _id: null, total: { $sum: "$amount" } } },
		]);

		const last60DaysIncomeTransaction = await Income.find({
			userId: user?._id,
			date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
		}).sort({ date: -1 });

		const totalIncomeLast60Days = last60DaysIncomeTransaction.reduce(
			(sum, transaction) => sum + transaction.amount,
			0
		);

		const last30DaysExpenseTransaction = await Expense.find({
			userId: user?._id,
			date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
		}).sort({ date: -1 });

		const totalExpenseLast30Days = last30DaysExpenseTransaction.reduce(
			(sum, transaction) => sum + transaction.amount,
			0
		);

		const lastTransactions = [
			...(
				await Income.find({ userId: user?._id }).sort({ date: -1 }).limit(5)
			).map((txn) => ({
				...txn.toObject(),
				type: "income",
			})),
			...(
				await Expense.find({ userId: user?._id }).sort({ date: -1 }).limit(5)
			).map((txn) => ({
				...txn.toObject(),
				type: "expense",
			})),
		].sort((a, b) => b.date - a.date);
		let incomeList = incomes.map((inc) => ({
			...inc._doc,
			type: "income",
		}));
		let expenseList = expenses.map((inc) => ({
			...inc._doc,
			type: "expense",
		}));
		const data = {
			incomes: incomeList,
			expenses: expenseList,
			totalBalance:
				(totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
			totalIncome: totalIncome[0]?.total || 0,
			totalExpense: totalExpense[0]?.total || 0,
			last30DaysExpenses: {
				total: totalExpenseLast30Days,
				transactions: last30DaysExpenseTransaction,
			},
			last60DaysIncome: {
				total: totalIncomeLast60Days,
				transactiion: last60DaysIncomeTransaction,
			},
			recentTransaction: lastTransactions,
		};
		res.status(200).json({
			data,
			message: "Data retrieved",
		});
	} catch (error) {
		res.status(500).json({
			message: "Server error",
			error,
		});
	}
};

exports.downloadTransactionExcel = async (req, res) => {
	try {
		await connectDB();
		const user = req.user;
		const incomes = await Income.find({ userId: user?._id }).sort({ date: -1 });
		const expenses = await Expense.find({ userId: user?._id }).sort({
			date: -1,
		});
		const dataIncome = incomes.map((item) => ({
			Type: "Income",
			Category: item.source,
			Amount: item.amount,
			Date: item.date,
		}));
		const dataExpense = expenses.map((item) => ({
			Type: "Expense",
			Category: item.category,
			Amount: item.amount,
			Date: item.date,
		}));

		const data = [...dataIncome, ...dataExpense].sort(
			(a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
		);

		const wb = xlsx.utils.book_new();
		const ws = xlsx.utils.json_to_sheet(data);
		xlsx.utils.book_append_sheet(wb, ws, "Transaction");

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
		console.log(error);
		res.status(500).json({
			message: "Server Error",
		});
	}
};
