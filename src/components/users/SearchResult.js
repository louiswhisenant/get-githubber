import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import PropTypes from 'prop-types';

export const SearchResult = ({ search }) => {
	const githubContext = useContext(GithubContext);
	const { users } = githubContext;

	return (
		search && (
			<div>
				<p>
					Displaying{users.length === 30 ? ' the first' : null}{' '}
					{users.length} result
					{users.length > 1 ? 's' : null} for{' '}
					<span>
						<strong>{search}</strong>
					</span>
					.
				</p>
			</div>
		)
	);
};

SearchResult.propTypes = {
	search: PropTypes.string.isRequired,
};
