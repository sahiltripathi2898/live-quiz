const mongoose = require('mongoose');

const OneWordSchema = mongoose.Schema({
	question: String,
	answer: String,
	type: String,
	explanation: String,
});

module.exports = mongoose.model('OneWordSchema', OneWordSchema);
