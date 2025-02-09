import PropTypes from 'prop-types';
import githubIcon from '../assets/images/github.png'; // Assurez-vous que le chemin est correct

const Drawer = ({ open, onClose, pauseEntries }) => {
    return (
        <div className={`drawer ${open ? 'open' : ''}`}>
            <button className="button close-button" onClick={onClose}>Close</button>
            <h2>Pause History</h2>
            {pauseEntries.map((entry, index) => (
                <div key={index} className="pause-entry">
                    {entry}
                </div>
            ))}
            <div className="drawer-footer">
                <a href="https://github.com/denisDMU" target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" className="github-icon" />
                    DenisDMU
                </a>
            </div>
        </div>
    );
};

Drawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    pauseEntries: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Drawer;