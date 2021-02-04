import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Components
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import { About } from './components/pages/About';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';
// Context
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
// Styling
import './App.css';

const App = () => {
	return (
		<GithubState>
			<AlertState>
				<Router>
					<div>
						<Navbar icon='fab fa-github' title='Github Finder' />
						<div className='container'>
							<Switch>
								<Route exact path='/' component={Home} />
								<Route exact path='/about' component={About} />
								<Route
									exact
									path='/user/:login'
									component={User}
								/>
								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
};

export default App;
