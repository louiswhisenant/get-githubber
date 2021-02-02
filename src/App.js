import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import { Alert } from './components/layout/Alert';
import { About } from './components/pages/About';
import User from './components/users/User';

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	};

	// On search submit, call async function to search github users
	searchUsers = async (text) => {
		// Set loading to true to display spinner
		this.setState({ loading: true, users: [] });

		// Await get request from github, passing the search term, secret, and key in the url using env variables and Search.js component state
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		// Set App.js component state of users to contain get response and display users matching search, set loading back to false to remove spinner.
		this.setState({ users: res.data.items, loading: false });
	};

	// Get a single GitHub user
	getUser = async (login) => {
		// Set loading to true to display spinner
		this.setState({ loading: true, user: {} });

		// Await get request from github, passing the login, secret, and key in the url using env variables and Search.js component state
		const res = await axios.get(
			`https://api.github.com/users/${login}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		// Set App.js component state of users to contain get response and display users matching search, set loading back to false to remove spinner.
		this.setState({ user: res.data, loading: false });
	};

	// Get user repos
	getUserRepos = async (login) => {
		// Set loading to true to display spinner
		this.setState({ loading: true, repos: [] });

		// Await get request from github, passing the login, secret, and key in the url using env variables and Search.js component state
		const res = await axios.get(
			`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		// Set App.js component state of users to contain get response and display users matching search, set loading back to false to remove spinner.
		this.setState({ repos: res.data, loading: false });
	};

	// Clear users from state
	clearUsers = () => this.setState({ users: [], loading: false });

	// Set Alert
	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => this.setState({ alert: null }), 3000);
	};

	// Clear Alert
	clearAlert = () => {
		this.setState({ alert: null });
	};

	render() {
		const { users, user, repos, loading, alert } = this.state;
		const {
			searchUsers,
			getUser,
			getUserRepos,
			clearUsers,
			setAlert,
			clearAlert,
		} = this;

		return (
			<Router>
				<div>
					<Navbar icon='fab fa-github' title='Github Finder' />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search
											users={users}
											searchUsers={searchUsers}
											clearUsers={clearUsers}
											showInfo={
												users.length > 0 ? true : false
											}
											setAlert={setAlert}
											clearAlert={clearAlert}
										/>
										<Users
											loading={loading}
											users={users}
										/>
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										{...props}
										getUser={getUser}
										getUserRepos={getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
