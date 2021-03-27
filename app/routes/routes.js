const express = require('express');
const router = express.Router();

const Quiz = require('../models/quizmodel.js');

// Retrieve and return all quiz from the database.
router.get('/', (req, res) => {
	Quiz.find()
		.then((quizes) => {
			res.send(quizes);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving quiz.',
			});
		});
});

// Create and Save a new quiz
router.post('/', (req, res) => {
	// Create a quiz
	const quiz = new Quiz({
		question: req.body.question,
		answer: req.body.answer,
		type: req.body.type,
		explanation: req.body.explanation,
	});

	// Save quiz in the database
	quiz
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the quiz.',
			});
		});
});

module.exports = router;
