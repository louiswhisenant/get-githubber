import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
	const alertContext = useContext(AlertContext);

	const onClick = () => {
		alertContext.clearAlert();
	};

	return (
		<div className='card text-center'>
			<img
				src={avatar_url}
				alt='avatar'
				className='round-img'
				style={{ width: '60px' }}
			/>
			<h3>{login}</h3>

			<div>
				<Link
					to={`/user/${login}`}
					className='btn btn-dark btn-sm my-1'
					onClick={onClick}>
					View
				</Link>
			</div>
		</div>
	);
};

UserItem.propTypes = {
	user: PropTypes.object.isRequired,
};

export default UserItem;
