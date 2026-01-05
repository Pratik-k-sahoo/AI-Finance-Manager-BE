require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = (req, res, next) => {
	try {
		let token = "";
		const header = req.headers.authorization || "";
		if (header)
			token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
		else token = req.cookies.token;
		if (!token)
			return res.status(401).json({
				message: "Authentication Required.",
			});

		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;

		return next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid or expired token." });
	}
};

module.exports = {
	authMiddleware,
};
