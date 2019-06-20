import React from 'react';
import { connect } from 'react-redux';
import { Container, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logoutThunk } from '../store/user';

const Nav = ({ logout, userName, pathname }) => {
	return (
		<div className="nav">
			<Container>
				<Menu pointing secondary>
					<Link to="/portfolio">
						<Menu.Item
							active={pathname === '/portfolio'}
							name="Portfolio" />
					</Link>
					<Link to="/transactions">
						<Menu.Item
							active={pathname === '/transactions'}
							name="Transactions" />
					</Link>
					<Menu.Menu position="right">
						<Dropdown item text={userName}>
							<Dropdown.Menu>
								<Dropdown.Item
									text="Logout"
									onClick={() => logout()} />
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Menu>
				</Menu>
			</Container>
		</div>
	);
};

const mapStateToProps = state => ({
	userName: state.user.name
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
