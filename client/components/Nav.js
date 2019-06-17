import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<Menu pointing secondary>
			<Link to="/portfolio">
				<Menu.Item
					active={false}
					name="Portfolio" />
			</Link>
			<Link to="/transactions">
				<Menu.Item
					active={false}
					name="Transactions" />
			</Link>
			<Menu.Menu position="right">
				<Dropdown item text="Danny Marquez">
					<Dropdown.Menu>
						<Dropdown.Item
							text="Logout" />
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Menu>
		</Menu>
	);
};

export default Nav;
