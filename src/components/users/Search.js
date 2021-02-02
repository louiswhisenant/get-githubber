import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchResult } from './SearchResult';

export class Search extends Component {
	state = {
		text: '',
		search: '',
	};

	static propTypes = {
		users: PropTypes.array.isRequired,
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		showInfo: PropTypes.bool.isRequired,
		setAlert: PropTypes.func.isRequired,
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = (e) => {
		e.preventDefault();
		// Set alert
		if (this.state.text === '') {
			// Set empty field alert
			this.props.setAlert('Search field is empty', 'light');
		} else {
			// Clear alert
			this.props.clearAlert();
			// Pass search term to app level state
			this.props.searchUsers(this.state.text);
			// Display search term below search button
			this.setState({ search: this.state.text });
			// Clear input
			this.setState({ text: '' });
		}
	};

	render() {
		const { users, showInfo, clearUsers } = this.props;
		const { text, search } = this.state;
		const { onSubmit, onChange } = this;

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
				{showInfo && search && (
					<div>
						<button
							className='btn btn-light btn-block'
							onClick={clearUsers}>
							Clear
						</button>
						<SearchResult users={users} search={search} />
					</div>
				)}
			</div>
		);
	}
}

export default Search;
