import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

const Login = () => {
	return (
		<section>
			<Message
				icon="money"
				header="Register Now for $5000!"
				content="Sign up now for a one-time gift to grow your porfolio." />
			<Form>
				<Form.Field>
					<label>Full Name:</label>
					<input placeholder="Full Name" />
				</Form.Field>
				<Form.Field>
					<label>Email:</label>
					<input placeholder="Email" />
				</Form.Field>
				<Form.Field>
					<label>Password:</label>
					<input placeholder="Password" />
				</Form.Field>
				<Button type="submit" color="green">Submit</Button>
			</Form>
		</section>
	);
};

export default Login;
