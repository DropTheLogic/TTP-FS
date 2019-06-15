import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';

ReactDOM.render(
	<Router history={history}>
		<h1>True Trust Portfolio</h1>
	</Router>,
	document.getElementById('root')
);
