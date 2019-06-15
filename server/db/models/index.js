const User = require('./user');
const UserStock = require('./userstock');
const Transaction = require('./transaction');

User.hasMany(UserStock);
UserStock.belongsTo(User);
User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = {
	User,
	UserStock,
	Transaction
};
