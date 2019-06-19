'use strict';

const db = require('../server/db');
const { User, UserStock } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced.');

	const users = await Promise.all([
		User.create({ name: 'Danny', email: 'danny@123.com', password: 'abc123' }),
		User.create({ name: 'Spot', email: 'spot@123.com', password: 'abc123' })
	]);

	const userStocks = await Promise.all([
		UserStock.create({ userId: users[0].id, symbol: 'AAPL', quantity: 25 }),
		UserStock.create({ userId: users[0].id, symbol: 'FB', quantity: 20 })
	]);

	console.log(`Seeded ${users.length} users.`);
	console.log(`Seeded ${userStocks.length} user-stocks.`);
	console.log(`Seeded successfully.`);
}

async function runSeed() {
	console.log('Seeding...');
	try {
		await seed();
	} catch (error) {
		console.error(error);
	} finally {
		console.log('Closing connection to db.');
		await db.close();
		console.log('db connection closed. Have a great day!');
		process.exit();
	}
}

if (module === require.main) {
	runSeed();
}

module.exports = seed;
