import React, { Fragment } from 'react';
import { Form, Button, Message, Icon, Item } from 'semantic-ui-react';

const Login = ({ authType, authError }) => {
	return (
		<section id="auth">
			<h2>{authType === 'register' ? 'Register' : 'Sign In' }</h2>
			{
				authType === 'register' &&
				<Message
					attached
					icon="money"
					header="Register Now for $5000!"
					content="Sign up now for a one-time gift to grow your porfolio." />
			}
			<Form className="attached fluid segment">
				{ authType === 'register' &&
				<Fragment>
					<Item>Already have an account? Log in here.</Item>
					<Form.Field>
						<label>Full Name:</label>
						<input placeholder="Full Name" />
					</Form.Field>
				</Fragment>

				}
				<Form.Field>
					<label>Email:</label>
					<input placeholder="Email" />
				</Form.Field>
				<Form.Field>
					<label>Password:</label>
					<input placeholder="Password" type="password" />
				</Form.Field>
				<Button type="submit" color="green">
					{ authType === 'register' ? 'Register' : 'Log In' }
				</Button>
			</Form>
			{
				authError &&
				<Message attached="bottom" error>
					<Icon name="x" />
					Invalid email or password, please try again.
				</Message>
			}
		</section>
	);
};

export default Login;
