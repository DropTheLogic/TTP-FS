const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const db = require('./db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({db});

const PORT = process.env.PORT || 8080;

const app = express();

// Passport user serialization registration
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.models.user.findByPk(id);
		done(null, user);
	} catch (error) {
		console.error(error);
		done(error);
	}
});

// Create server app
const createApp = () => {
	// Logging and middleware
	app.use(morgan('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(path.join(__dirname, '../public')));

	// User login session
	app.use(session({
		secret: process.env.SESSION_SECRET || 'Some super secret here',
		store: sessionStore,
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	// API routes
	app.use('/api', require('./api'));

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
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

// Kick off app after syncing db for session storage
db.sync().then(() => {
	createApp();
});
