import axios from 'axios';
import history from '../history';

const defaultUser = {};

// Actions
const GET_USER = 'GET_USER';
const SET_BUY_ERROR = 'SET_BUY_ERROR';

// Action Creators
const getUser = user => ({ type: GET_USER, user });
export const setBuyError = message => ({ type: SET_BUY_ERROR, message });

// Thunks
export const getMe = () => async dispatch => {
	try {
		const { data: me } = await axios.get(`/api/me`);
		dispatch(getUser(me || defaultUser));
	} catch (error) {
		console.error(error);
	}
};

export const authThunk = (userData, authType) => async dispatch => {
	try {
		const { data: user } = await axios.post(`/api/${authType}`, userData);
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
		case SET_BUY_ERROR:
			return { ...state, buyError: action.message };
		default:
			return state;
	}
};

export default user;
