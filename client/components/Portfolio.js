import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Divider } from 'semantic-ui-react';
import { getAllStocksThunk } from '../store/stocks';

import { BuyStock, StockTable } from './';

class Portfolio extends Component {
	componentDidMount() {
		this.props.getStocks();
	}

	render() {
		const { stocks } = this.props;
		const hasStocks = Object.keys(stocks).length > 0;
		let balance = 0;
		if (hasStocks) {
			balance = Object.values(stocks).reduce((total, stock) => {
				return total + (stock.latestPrice * stock.quantity);
			}, 0).toFixed(2);
		}

		return (
			<section id="portfolio">
				<h2>Portfolio</h2>
				<div className="portfolio-segments">
					<Segment placeholder>
						<Grid columns={2} relaxed stackable>
							<Grid.Column>
								<Segment padded>
									<h2>Current Holdings</h2>
									<Divider />
									<h4>Total Holdings Balance: ${balance}</h4>
									{
										hasStocks ?
										<StockTable stocks={stocks} />
										:
										<div>Nothing here yet. Buy something and it will show up!</div>
									}
								</Segment>
							</Grid.Column>

							<Grid.Column>
								<BuyStock />
							</Grid.Column>
						</Grid>
					</Segment>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => ({
	stocks: state.stocks
});

const mapDispatchToProps = dispatch => ({
	getStocks: () => dispatch(getAllStocksThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
