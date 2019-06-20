import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Table } from 'semantic-ui-react';
import { getAllTransactionsThunk } from '../store/transactions';

class Transactions extends Component {
	componentDidMount() {
		this.props.getTransactions();
	}
	render() {
		let { transactions } = this.props;
		return (
			<section id="portfolio">
				<h2>Transactions</h2>
				<Segment className="table-scroll">
					<Table selectable unstackable striped singleLine>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Type</Table.HeaderCell>
								<Table.HeaderCell>Symbol</Table.HeaderCell>
								<Table.HeaderCell width={4}>Quantity</Table.HeaderCell>
								<Table.HeaderCell textAlign="right">
									Buy Price
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
						{
							transactions &&
							transactions.map(trans => {
								return (
								<Table.Row key={trans.id}>
									<Table.Cell>BUY</Table.Cell>
									<Table.Cell>{trans.symbol}</Table.Cell>
									<Table.Cell>{trans.quantity} shares</Table.Cell>
									<Table.Cell
										textAlign="right">
										${(trans.buyPrice / 100).toFixed(2)}
									</Table.Cell>
								</Table.Row>
								);
							})
						}
						</Table.Body>
					</Table>
				</Segment>
			</section>
		);
	}
}

const mapStateToProps = state => ({
	transactions: state.transactions
});

const mapDispatchToProps = dispatch => ({
	getTransactions: () => dispatch(getAllTransactionsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
