const express = require('express');
const morgan = require('morgan');
const path = require('path');

const db = require('./db');

const PORT = process.env.PORT || 8080;

const app = express();

// Logging and middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Send index.html
app.use('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error Handling
app.use((error, req, res, next) => {
	console.error(error);
	console.error(error.stack);
	res.status(500).send(error.message || '500: Internal Error');
});

// Start server listeng
db.sync()
	.then(() => {
		app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
	});
