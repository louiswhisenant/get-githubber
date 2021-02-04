import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
	SET_SEARCH,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		search: '',
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Users
	// On search submit, call async function to search github users
	const searchUsers = async (text) => {
		// Set loading to true to display spinner
		setLoading();
		// Clear users from state so showInfo doesn't display
		clearUsers();

		// Await get request from github, passing the search term, secret, and key in the url using env variables and Search.js component state
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		// dispatch to reducer the action type of SEARCH_USERS, and a payload of res.data.items, so that the reducer will:
		// 1. return the state
		// 2. append the payload (res.data.items) to users
		// 3. set loading back to false
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		});
	};

	// Get User
	// Get a single GitHub user
	const getUser = async (login) => {
		// Set loading to true to display spinner
		setLoading();
		// Clear user from state?

		// Await get request from github, passing the login, secret, and key in the url using env variables and Search.js component state
		const res = await axios.get(
			`https://api.github.com/users/${login}?&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		// dispatch to reducer the action type of GET_USERS, and a payload of res.data, so that the reducer will:
		// 1. return the state
		// 2. append the payload (res.data) to user
		// 3. set loading back to false
		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	};

	// Get Repos
	// Get user repos
	const getUserRepos = async (login) => {
		// Set loading to true to display spinner
		setLoading();
		// Clear repos from state?

		// Await get request from github, passing the login, secret, and key in the url using env variables and Search.js component state
		const res = await axios.get(
			`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	};

	// Clear Users
	// Clear users from state
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set Search
	const setSearch = (name) => dispatch({ type: SET_SEARCH, payload: name });

	// Set Loading
	// dispatch type of SET_LOADING to the reducer, which will instruct the state to turn loading to true
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				search: state.search,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos,
				setSearch,
			}}>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
