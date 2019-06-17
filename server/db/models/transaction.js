const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
	quanitity: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	symbol: {
		type: Sequelize.STRING
	},
	buyPrice: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Transaction;
