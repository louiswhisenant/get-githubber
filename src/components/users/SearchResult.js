import React from 'react';
import PropTypes from 'prop-types';

export const SearchResult = ({ users, search }) => {
	return (
		<div>
			<p>
				Displaying {users.length} result{users.length > 1 ? 's' : null}{' '}
				for{' '}
				<span>
					<strong>{search}</strong>
				</span>
				.
			</p>
		</div>
	);
};

SearchResult.propTypes = {
	users: PropTypes.array.isRequired,
	search: PropTypes.string.isRequired,
};
