const router = require('express').Router();
const { User, UserStock, Transaction } = require('../db/models');

/******************************
 * Auth and user routes
 ******************************/

router.post('/register', async (req, res, next) => {
	try {
		let { name, email, password } = req.body;
		const user = await User.create({ name, email, password });
		req.login(user, err => {
			if (err) next(err);
			else res.json(user);
		});
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

router.post('/login', async (req, res, next) => {
	try {
		let { email, password } = req.body;
		let user = await User.findOne({
			where: { email, password }
		});
		if (user) {
			req.login(user, err => {
				if (err) next(err);
				else res.json(user);
			});
		}
		else {
			res.status(401).send('Bad email or password!');
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

router.get('/me', (req, res) => {
	res.json(req.user);
});

/******************************
 * Stock and transaction routes
 ******************************/

// Get logged-in user's portfolio items
router.get('/portfolio', async (req, res, next) => {
	if (!req.user) {
		res.status(403).json('No user logged in!');
	}
	else {
		try {
			let userId = req.user.id;
			let portfolio = await UserStock.findAll({
				where: { userId }
			});
			// Convert to object by symbol
			portfolio = portfolio.reduce((obj, stock) => {
				obj[stock.symbol] = stock;
				return obj;
			}, {});

			res.send(portfolio);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
});

// Make new transaction
router.post('/transaction', async (req, res, next) => {
	if (!req.user) {
		res.status(403).json('No user logged in!');
	}
	else {
		try {
			let userId = req.user.id;
			let { symbol, buyPrice, quantity } = req.body;

			// Create Transaction
			let transaction = await Transaction.create({
				userId, symbol, buyPrice, quantity
			});

			// Update UserStock
			let stock = await UserStock.findOne({
				where: { userId, symbol }
			});
			if (stock) {
				UserStock.update({ quantity: stock.quantity + (+quantity) },
					{ where: { userId, symbol } });
			}
			else {
				UserStock.create({ symbol, quantity, userId });
			}

			// Update User cash balance (in cents)
			let user = await User.findByPk(userId);
			User.update({ cashBalance: user.cashBalance - buyPrice },
				{ where: { id: userId } });

			res.send(transaction);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
});


/******************************
 * Error handling
 ******************************/
router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

module.exports = router;
