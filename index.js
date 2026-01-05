require("module-alias/register.js");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const connectDB = require("./src/config/connectDB.js");
const userRouter = require("./src/routes/user.js");
const incomeRouter = require("./src/routes/income.js");
const expenseRouter = require("./src/routes/expense.js");
const dashboardRouter = require("./src/routes/dashboard.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(
	cors({
		origin: [""],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
	res.send("OK ✅");
});

app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(PORT, async () => {
	await connectDB();
	console.log(`App is running at port ${PORT}`);
});
