import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Message, Icon, Item } from 'semantic-ui-react';
import { authThunk } from '../store/user';

const Login = ({ authType, authError, handleSubmit }) => {
	return (
		<section id="auth">
			<h2>{authType === 'register' ? 'Register' : 'Sign In' }</h2>
			{
				authType === 'register' ?
				<Fragment>
					<Message
						icon="money"
						header="Register Now for $5000!"
						content="Sign up now for a one-time gift to grow your porfolio." />

					<Message attached>
						<Item>Already have an account?
							<Link to="/login"> Sign in here.</Link>
						</Item>
					</Message>
				</Fragment>
				:
				<Message attached>
					<Item>Need to register for a new account?
						<Link to="/register"> Register here.</Link>
					</Item>
				</Message>
			}

			<Form className="attached fluid segment" onSubmit={(e) => handleSubmit(e, authType)}>
				{ authType === 'register' &&
				<Fragment>
					<Form.Field>
						<label>Full Name:</label>
						<input name="name" placeholder="Full Name" />
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
	handleSubmit: (e, authType) => {
		e.preventDefault();
		let formData = {
			email: e.target.email.value,
			password: e.target.password.value,
		};
		if (authType === 'register') {
			formData.name = e.target.name.value;
		}
		dispatch(authThunk(formData, authType));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
