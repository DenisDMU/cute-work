import PropTypes from 'prop-types';

const Buttons = ({ startTimer, stopTimer, resetTimer, isRunning }) => {
	return (
		<div className="buttons-container">
			{!isRunning ? (
				<button className="button" onClick={startTimer}>
					Start
				</button>
			) : (
				<button className="button" onClick={stopTimer}>
					Pause
				</button>
			)}
			<button className="button" onClick={resetTimer}>
				Reset
			</button>
		</div>
	);
};

Buttons.propTypes = {
	startTimer: PropTypes.func.isRequired,
	stopTimer: PropTypes.func.isRequired,
	resetTimer: PropTypes.func.isRequired,
	isRunning: PropTypes.bool.isRequired,
};

export default Buttons;
