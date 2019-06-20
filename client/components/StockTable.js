import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const StockTable = ({ stocks }) => {
	return (
		<div id="stock-table-container" className="table-scroll">
			<Table selectable unstackable singleLine>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Symbol</Table.HeaderCell>
						<Table.HeaderCell width={4}>QTY.</Table.HeaderCell>
						<Table.HeaderCell textAlign="right">
							Latest Price
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
				{
					stocks &&
					Object.keys(stocks).map(symbol => {
						const { latestPrice, open } = stocks[symbol];
						const stockIsRising = latestPrice > open;
						const stockIsFalling = latestPrice < open;
						const stockIcon = stockIsRising ? 'angle up' :
							stockIsFalling ? 'angle down' : 'minus';
						return (
						<Table.Row key={symbol}>
							<Table.Cell>{symbol}</Table.Cell>
							<Table.Cell>{stocks[symbol].quantity}</Table.Cell>
							<Table.Cell
								textAlign="right"
								positive={stockIsRising}
								negative={stockIsFalling}>
								<Icon name={stockIcon} />
								${stocks[symbol].latestPrice}
							</Table.Cell>
						</Table.Row>
						);
					})
				}
				</Table.Body>
			</Table>
		</div>
	);
};

export default StockTable;
