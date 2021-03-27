const mongoose = require('mongoose');

const Quizschema = mongoose.Schema({
	question: String,
	answer: String,
	type: String,
	explanation: String,
});

module.exports = mongoose.model('usermodel', Quizschema);
