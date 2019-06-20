import React from 'react';
import { connect } from 'react-redux';
import { Segment, Divider, Form, Button, Message, Icon } from 'semantic-ui-react';
import { getOnePrice, getAllStocksThunk } from '../store/stocks';
import { setBuyError } from '../store/user';
import { makeTransactionThunk } from '../store/transactions';

const BuyStock = props => {
	const { buyError, setError, user, submitBuyOrder } = props;
	const { cashBalance: balance } = user;

	const validate = async (e) => {
		e.preventDefault();
		let symbol = e.target.symbol.value.toUpperCase();
		let quantity = +e.target.quantity.value;
		let stock = await getOnePrice(symbol);

		if (stock && quantity > 0) {
			let stockPrice = stock.latestPrice * 100; // Price in cents
			let hasEnoughMoney = balance - stockPrice * quantity >= 0;
			if (hasEnoughMoney) {
				submitBuyOrder({ symbol, quantity, buyPrice: stockPrice });
			}
			else {
				// Balance error
				let message = `Not enough cash on hand! You have $${balance / 100},` +
					`but ${quantity} shares of ${symbol} at $${stock.latestPrice}` +
					`would cost $${(stock.latestPrice * quantity).toFixed(2)}`;
				console.log(message);
				setError(message);
			}
		}
		else {
			// Validation error
			let message = 'Bad stock symbol or quantity, please try again';
			console.log(message);
			setError(message);
		}
	};
	return (
		<Segment padded>
			<h2>Buy Stocks</h2>
			<Divider />
			<h4>Current Cash Balance: ${(balance / 100).toFixed(2)}</h4>

			<Form className="attached fluid segment" onSubmit={validate}>
				<Form.Field>
					<label>Stock Symbol:</label>
					<input name="symbol" placeholder="Symbol, eg: AAPL" error={buyError} />
				</Form.Field>
				<Form.Field>
					<label>Quantity:</label>
					<input name="quantity" placeholder="Quantity to buy, eg: 1 or 32" error={buyError} />
				</Form.Field>
				<Button type="submit" color="green" size="huge">
					BUY
				</Button>
			</Form>
			{
				buyError &&
				<Message attached="bottom" error>
					<Icon name="x" />
					{buyError}
				</Message>
			}
		</Segment>
	);
};

const mapStateToProps = state => ({
	user: state.user,
	stocks: state.stocks,
	buyError: state.user.buyError
});

const mapDispatchToProps = dispatch => ({
	submitBuyOrder: buyData => dispatch(makeTransactionThunk(buyData)),
	setError: message => dispatch(setBuyError(message)),
	getAllStocks: symbols => dispatch(getAllStocksThunk(symbols))
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyStock);
