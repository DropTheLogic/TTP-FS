import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message, Icon, Item } from 'semantic-ui-react';
import { signInThunk } from '../store/user';

const Login = ({ authType, authError, handleSubmit }) => {
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
			<Form className="attached fluid segment" onSubmit={handleSubmit}>
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
					<input name="email" placeholder="Email" />
				</Form.Field>
				<Form.Field>
					<label>Password:</label>
					<input name="password" placeholder="Password" type="password" />
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

const mapStateToProps = state => ({
	authError: state.user.authError
});

const mapDispatchToProps = dispatch => ({
	handleSubmit: (e) => {
		e.preventDefault();
		let email = e.target.email.value;
		let password = e.target.password.value;
		dispatch(signInThunk({email, password}));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
