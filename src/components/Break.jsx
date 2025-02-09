
import PropTypes from 'prop-types';

const Break = ({ toggleBreak }) => {
	return (
		<div className="break-container">
			<h2>Take a break!</h2>
			<p>Enjoy your rest!</p>
			<button className="button" onClick={toggleBreak}>
				Back to Work
			</button>
		</div>
	);
};

Break.propTypes = {
	toggleBreak: PropTypes.func.isRequired,
};

export default Break;

