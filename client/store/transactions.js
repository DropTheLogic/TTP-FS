import axios from 'axios';
import { getMe } from './user';
import { getAllStocksThunk } from './stocks';

const defaultTransactions = [];

// Actions
const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS';
const MAKE_TRANSACTION = 'MAKE_TRANSACTION';

// Action Creators
const getAllTransactions = transactions => ({ type: GET_ALL_TRANSACTIONS, transactions });
const makeTransaction = transaction => ({ type: MAKE_TRANSACTION, transaction });

// Thunks
export const getAllTransactionsThunk = () => async dispatch => {
	try {
		let { data: transactions } =
			await axios.get(`/api/transactions`);
		dispatch(getAllTransactions(transactions));
	} catch (error) {
		console.error(error);
	}
};

export const makeTransactionThunk = ({ symbol, buyPrice, quantity }) => async dispatch => {
	try {
		let { data: transaction } =
			await axios.post('/api/transaction', { symbol, buyPrice, quantity });
		dispatch(makeTransaction(transaction));
		dispatch(getMe());
		dispatch(getAllStocksThunk());
	} catch (error) {
		console.error(error);
	}
};

// Reducer
const transactions = (state = defaultTransactions, action) => {
	switch (action.type) {
		case GET_ALL_TRANSACTIONS:
			return action.transactions;
		case MAKE_TRANSACTION:
			return [...state, action.transaction ];
		default:
			return state;
	}
};

export default transactions;
