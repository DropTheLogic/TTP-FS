import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import {
	Header,
	Nav,
	Login,
	Portfolio,
	Transactions
} from './components';


class App extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<Container>
				{
					this.props.isLoggedIn && (
					<Fragment>
						<Nav />
						<Switch>
							<Route path="/portfolio" component={Portfolio} />
							<Route path="/transactions" component={Transactions} />
						</Switch>
					</Fragment>
				)}
					<Switch>
						<Route path="/register" render={props => <Login {...props} authType="register" />} />
						<Route path="/login" render={props => <Login {...props} authType="login" />} />
						{/** Default to registration */}
						<Route render={props => <Login {...props} authType="register" />} />
					</Switch>
				</Container>
			</Fragment>
		);
	}
}

export default App;
