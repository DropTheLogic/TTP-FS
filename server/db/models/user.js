const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
	name: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING
	},
	cashBalance: {
		type: Sequelize.INTEGER,
		defaultValue: 500000 // Balance is kept in USD cents
	}
});

module.exports = User;
