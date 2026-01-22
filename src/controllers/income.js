const connectDB = require("../config/connectDB");
const Income = require("../models/income");
const User = require("../models/user.model");
const xlsx = require("xlsx");

exports.addIncome = async (req, res) => {
	const user = req.user;
	try {
		await connectDB();
		const { source, amount, date, description } = req.body;

		const income = await Income.create({
			userId: user?._id,
			source,
			amount,
			description,
			date: new Date(date),
		});

		res.status(200).json({
			income,
			message: "Income added successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Server Error",
		});
	}
};

exports.getAllIncome = async (req, res) => {
	const user = req.user;
	try {
		await connectDB();
		const incomes = await Income.find({
			userId: user?._id,
		}).sort({ date: -1 });
		res.status(200).json({
			incomes: { ...incomes, type: "income" },
			message: "Retrieved incomes successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
		});
	}
};

exports.deleteIncome = async (req, res) => {
	try {
		await connectDB();
		await Income.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: "Income deleted",
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
		});
	}
};

exports.updateIncome = async (req, res) => {
	try {
		await connectDB();
		const income = await Income.findById(req.params.id);
		const { source, amount, date, description } = req.body;
		income.source = source || income.source;
		income.amount = amount || income.amount;
		income.description = description || income.description;
		income.date = new Date(date);
		await Income.save();
		res.status(200).json({
			message: "Income Updated",
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
		});
	}
};

exports.downloadIncomeExcel = async (req, res) => {
	try {
		await connectDB();
		const user = req.user;
		const incomes = await Income.find({ userId: user?._id }).sort({ date: -1 });
		const data = incomes.map((item) => ({
			Type: "Income",
			Source: item.source,
			Amount: item.amount,
			Date: item.date,
		}));

		const wb = xlsx.utils.book_new();
		const ws = xlsx.utils.json_to_sheet(data);
		xlsx.utils.book_append_sheet(wb, ws, "Income");

		const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
		res.setHeader("Content-Disposition", "attachment; filename=income.xlsx");
		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		);

		return res.status(200).send(buffer);
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
		});
	}
};
