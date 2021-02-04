import React, { Fragment } from 'react';
import { Alert } from '../layout/Alert';
import Search from '../users/Search';
import Users from '../users/Users';

export const Home = () => (
	<Fragment>
		<Alert />
		<Search />
		<Users />
	</Fragment>
);
