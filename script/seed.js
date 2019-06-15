'use strict';

const db = require('../server/db');
const { User } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced.');

	const users = await Promise.all([
		User.create({ name: 'Danny', email: 'danny@123.com', password: 'abc123' }),
		User.create({ name: 'Spot', email: 'spot@123.com', password: 'abc123' })
	]);

	console.log(`Seeded ${users.length} users.`);
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
	}
}

if (module === require.main) {
	runSeed();
}

module.exports = seed;
