const router = require('express').Router();
const { User, UserStock, Transaction } = require('../db/models');

/******************************
 * Auth and user routes
 ******************************/

router.post('/signup', async (req, res, next) => {
	try {
		let { name, email, password } = req.body;
		const user = await User.create({ name, email, password });
		res.json(user);
	} catch (error) {
		if (error.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('User already exists!');
		}
		else {
			console.error(error);
			next(error);
		}
	}
});

router.post('/login');
router.post('/logout');
router.get('/me');

/******************************
 * Stock and transaction routes
 ******************************/

// Get logged-in user's portfolio items
router.get('/portfolio', (req, res, next) => {

});

// Make new transaction
router.post('/transaction', (req, res, next) => {

});


/******************************
 * Error handling
 ******************************/
router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status(404);
	next(error);
});

module.exports = router;
