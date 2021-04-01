const mongoose = require('mongoose');

const MCQSchema = mongoose.Schema({
	question: String,
	A: String,
	B: String,
	C: String,
	D: String,
	answer: String,
	type: String,
	explanation: String,
});

module.exports = mongoose.model('MCQSchema', MCQSchema);
