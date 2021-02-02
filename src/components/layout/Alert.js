import React from 'react';

export const Alert = ({ alert }) => {
	return (
		alert && (
			<div className={`alert alert-${alert.type}`}>
				<i className='fas fa-info-circle' /> {alert.msg}
			</div>
		)
	);
};
