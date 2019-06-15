const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/ttp-stocks', {
	logging: false
});

module.exports = db;
