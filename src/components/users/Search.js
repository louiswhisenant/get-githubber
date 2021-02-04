import React, { useState, useContext } from 'react';
import { SearchResult } from './SearchResult';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const { users, search } = githubContext;

	const [text, setText] = useState('');

	const onChange = (e) => setText(e.target.value);

	const onSubmit = (e) => {
		e.preventDefault();
		// Set alert
		if (text === '') {
			// Set empty field alert
			alertContext.setAlert('Search field is empty', 'light');
		} else {
			// Clear alert
			alertContext.clearAlert();
			// Pass search term to app level state
			githubContext.searchUsers(text);
			// Display search term below search button
			githubContext.setSearch(text);
			// Clear input
			setText('');
		}
	};

	return (
		<div>
			<form className='form' onSubmit={onSubmit}>
				<input
					type='text'
					name='text'
					value={text}
					onChange={onChange}
					placeholder='Search Users...'
				/>
				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
			</form>
			{users.length > 0 && (
				<div>
					<button
						className='btn btn-light btn-block'
						onClick={githubContext.clearUsers}>
						Clear
					</button>
					<SearchResult search={search} />
				</div>
			)}
		</div>
	);
};

export default Search;
