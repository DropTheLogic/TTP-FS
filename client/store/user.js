import axios from 'axios';
import history from '../history';

const defaultUser = {};

// Actions
const GET_USER = 'GET_USER';

// Action Creators
const getUser = user => ({ type: GET_USER, user });

// Thunks
export const getMe = () => async dispatch => {
	try {
		const { data: me } = await axios.get(`/api/me`);
		dispatch(getUser(me || defaultUser));
	} catch (error) {
		console.error(error);
	}
};

export const signInThunk = ({ email, password }) => async dispatch => {
	try {
		const { data: user } = await axios.post(`/api/login`, { email, password });
		dispatch(getUser(user));
		history.push('/');
	} catch (error) {
		console.error(error);
		dispatch(getUser({authError: error}));
	}
};

export const logoutThunk = () => async dispatch => {
	try {
		await axios.post('/api/logout');
		dispatch(getUser(defaultUser));
	} catch (error) {
		console.error(error);
	}
};

// Reducer
const user = (state = defaultUser, action) => {
	switch (action.type) {
		case GET_USER: {
			return action.user;
		}
		default:
			return state;
	}
};

export default user;
