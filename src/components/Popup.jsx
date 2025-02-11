import Confetti from 'react-confetti';
import '../Popup.css';
import skyImage from '../assets/images/sky.png';
import PropTypes from 'prop-types';

const Popup = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="popup-overlay">
            <Confetti />
            <div className="popup-content" style={{ backgroundImage: `url(${skyImage})` }}>
                <h2>Good job!</h2>
                <p className='text-popup'>You earned that <span className='pop-min'>5 (Five) min</span> break ! 🐰</p>
                <button className="button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

Popup.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Popup;