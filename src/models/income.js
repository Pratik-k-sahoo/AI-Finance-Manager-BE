const { Schema, model } = require("mongoose");

const IncomeSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		source: { type: String, required: true },
		amount: { type: Number, required: true },
		date: { type: Date, default: Date.now },
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("Income", IncomeSchema);
