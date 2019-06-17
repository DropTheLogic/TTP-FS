import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import {
	Header,
	Nav,
	Login
} from './components';


class App extends Component {
	render() {
		return (
			<Container>
				<Header />
				<Nav />
				<Login />
			</Container>
		);
	}
}

export default App;
