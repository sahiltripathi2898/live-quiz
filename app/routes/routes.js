const express = require('express');
const router = express.Router();

const OneWordSchema = require('../models/oneword.js');
const MCQSchema = require('../models/mcq.js');

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

// Retrieve and return one word quiz from the database.
router.get('/oneword', (req, res) => {
	OneWordSchema.find()
		.then((quizes) => {
			let oneWordArray = [];
			quizes.forEach((quiz) => {
				if (quiz.type === 'OneWord') oneWordArray.push(quiz);
			});

			// Send any one quiz from the oneWordArray
			//console.log(oneWordArray);
			var selectedQuiz =
				oneWordArray[Math.floor(Math.random() * oneWordArray.length)];
			console.log(selectedQuiz.question);
			res.send(selectedQuiz);
			setTimeout(() => {
				console.log(selectedQuiz.explanation);
			}, 4000);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving quiz.',
			});
		});
});

// Create and Save a new oneword quiz
router.post('/oneword', (req, res) => {
	// Create a quiz
	const quiz = new OneWordSchema({
		question: req.body.question,
		answer: req.body.answer,
		type: req.body.type,
		explanation: req.body.explanation,
	});

	// Save quiz in the database
	quiz
		.save()
		.then((data) => {
			res.send('One Word Quiz added');
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the One Word quiz.',
			});
		});
});

// Create and Save a new mcq quiz
router.post('/mcq', (req, res) => {
	// Create a quiz
	const quiz = new MCQSchema({
		question: req.body.question,
		A: req.body.A,
		B: req.body.B,
		C: req.body.C,
		D: req.body.D,
		answer: req.body.answer,
		type: req.body.type,
		explanation: req.body.explanation,
	});

	// Save quiz in the database
	quiz
		.save()
		.then((data) => {
			res.send('MCQ Quiz added');
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while creating the MCQ quiz.',
			});
		});
});

module.exports = router;
