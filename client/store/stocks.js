import axios from 'axios';
import { IEX_PUB_KEY } from '../../secrets';
const iexBaseUrl = `https://cloud.iexapis.com/stable`;
const token = `token=${IEX_PUB_KEY}`;
const filter = 'filter=symbol,open,latestPrice,';

let defaultStocks = {};

// Actions
const GET_ALL_STOCKS = 'GET_ALL_STOCKS';

// Action Creators
const getAllStocks = stocks => ({ type: GET_ALL_STOCKS, stocks });

// Thunks
export const getAllStocksThunk = () => async dispatch => {
	try {
		// Get my current portfolio of stocks
		let { data: portfolio } = await axios.get('/api/portfolio');
		let symbols = Object.keys(portfolio);

		if (symbols.lenth > 0) {
			// Get prices for stocks
			const baseUrl = `${iexBaseUrl}/stock/market/batch`;
			const symbolArg = `symbols=${symbols.join(',')}`;
			const types = 'types=quote';
			const url = `${baseUrl}?${symbolArg}&${types}&${filter}&${token}`;
			let { data: stocks } = await axios.get(url);

			// Transform API response shape
			let stockSymbols = Object.keys(stocks);
			let transformedStocks = stockSymbols.reduce((obj, symbol) => {
				obj[symbol] = { ...stocks[symbol].quote, quantity: portfolio[symbol].quantity } ;
				return obj;
			}, {});

			dispatch(getAllStocks(transformedStocks));
		}
		else {
			dispatch(getAllStocks({}));
		}
	} catch (error) {
		console.error(error);
	}
};

// Reducer
const stocks = (state = defaultStocks, action) => {
	switch (action.type) {
		case GET_ALL_STOCKS:
			return action.stocks;
		default:
			return state;
	}
};

export default stocks;


// Stand-alone price check function, calls API for price info
export const getOnePrice = async symbol => {
	try {
		let url = `${iexBaseUrl}/stock/${symbol}/quote?${token}&${filter}`;
		let { data: stock } = await axios.get(url);
		return stock;
	} catch (error) {
		console.error(error);
	}
};
