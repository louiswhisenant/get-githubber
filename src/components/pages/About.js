import React, { Fragment } from 'react';

export const About = () => {
	return (
		<Fragment>
			<h1>About this App</h1>
			<p>App to search GitHub users</p>
			<p>Version: 1.0.0</p>
			<br />
			<p>
				View the{' '}
				<a
					href='https://github.com/louiswhisenant/get-githubber'
					target='blank'>
					Github Repository
				</a>
				.
			</p>
		</Fragment>
	);
};
