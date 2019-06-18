import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { getMe } from './store/user';

import {
	Header,
	Nav,
	Login,
	Portfolio,
	Transactions
} from './components';


class App extends Component {
	componentDidMount() {
		this.props.loadData();
	}

	render() {
		return (
			<Fragment>
				<Header />
				<Container>
				{
					this.props.isLoggedIn ?
					<Fragment>
						<Nav />
						<Switch>
							<Route path="/portfolio" component={Portfolio} />
							<Route path="/transactions" component={Transactions} />
							<Route component={Portfolio} />
						</Switch>
					</Fragment>
				:
					<Switch>
						<Route path="/register" render={props => <Login {...props} authType="register" />} />
						<Route path="/login" render={props => <Login {...props} authType="login" />} />
						{/** Default to registration */}
						<Route render={props => <Login {...props} authType="register" />} />
					</Switch>
				}
				</Container>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	isLoggedIn: !!state.user.id,
	state: state
});

const mapDispatchToProps = dispatch => ({
	loadData: () => dispatch(getMe())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
