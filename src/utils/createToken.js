import jwt from "jsonwebtoken";

export const createToken = (res, _id) => {
	const token = jwt.sign({ _id }, process.env.JWT_REFRESH_TOKEN, {
		expiresIn: "1d",
	});

  res.cookie("token", token, {
		httpOnly: true,
		sameSite: "none",
		maxAge: 1 * 24 * 60 * 60 * 1000,
	});
};
