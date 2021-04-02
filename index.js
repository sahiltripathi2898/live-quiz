const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// create express app
const app = express();

//cors
var cors = require('cors');
app.use(cors());

// Parse requests
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

//Using Promises instead of async await
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Successfully connected to the database !');
	})
	.catch((err) => {
		console.log('Could not connect to the database. Exiting now...', err);
		process.exit();
	});

// define a simple route
app.get('/', (req, res) => {
	res.json({
		message:
			'Welcome to Quiz application , you can test the API using postman or add /api/ at the end of the url',
	});
});

//Routes middleware
app.use('/api/', require('./app/routes/routes.js'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//Port Connection
const PORT = process.env.PORT || 2000;
// listen for requests
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
