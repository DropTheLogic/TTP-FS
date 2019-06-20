import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
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
				{
					this.props.isLoggedIn &&
					<Nav pathname={history.location.pathname} />
				}
				<Container style={{marginTop: '10px'}}>
				{
					this.props.isLoggedIn ?
					<Switch>
						<Route path="/portfolio" component={Portfolio} />
						<Route path="/transactions" component={Transactions} />
						<Redirect to="/portfolio" />
					</Switch>
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
