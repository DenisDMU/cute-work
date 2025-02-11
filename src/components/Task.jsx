import PropTypes from 'prop-types';

const Task = ({ task, onComplete }) => {
    return (
        <div className="task">
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
            </span>
            <button
                className={`complete-button ${task.completed ? 'completed' : ''}`}
                onClick={() => onComplete(task.id)}
            ></button>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onComplete: PropTypes.func.isRequired,
};

export default Task;