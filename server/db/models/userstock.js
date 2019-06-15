const Sequelize = require('sequelize');
const db = require('../db');

const UserStock = db.define('userStock', {
	symbol: {
		type: Sequelize.STRING,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = UserStock;
