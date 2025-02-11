import { useState, useEffect } from 'react';
import Pomodoro from './components/Pomodoro.jsx';
import Notes from './components/Notes.jsx';
import Joke from './components/Joke.jsx';
import Drawer from './components/Drawer.jsx';
import Task from './components/Task.jsx';
import menuIcon from './assets/images/menu.png';
import './App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [pauseEntries, setPauseEntries] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const addNote = (note) => {
        setNotes((prevNotes) => {
            const newNotes = [note, ...prevNotes];
            if (newNotes.length > 10) {
                newNotes.pop(); // Remove the oldest note if there are more than 20 notes
            }
            return newNotes;
        });
    };

    const addPauseEntry = (entry) => {
        setPauseEntries((prevEntries) => [entry, ...prevEntries]);
    };

    const handleTaskInputChange = (e) => {
        setTaskInput(e.target.value);
    };

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        if (taskInput.trim() && tasks.length < 10) {
            setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
            setTaskInput("");
        }
    };

    const handleTaskComplete = (taskId) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
    };

    useEffect(() => {
        const intervals = [20, 15, 10, 5, 1];
        const messages = [
            "That's a good start",
            "Keep going",
            "Almost there",
            "You got it!",
            "Last minute, the best one!",
        ];

        const timers = intervals.map((interval, index) => {
            return setTimeout(() => {
                const id = Date.now();
                setNotifications((prevNotifications) => [
                    ...prevNotifications,
                    { message: messages[index], id },
                ]);
                setTimeout(() => {
                    setNotifications((prevNotifications) =>
                        prevNotifications.filter((notification) => notification.id !== id)
                    );
                }, 10000); // Remove notification after 10 seconds
            }, (25 - interval) * 60 * 1000);
        });

        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, []);

    return (
        <>
            {tasks.length === 0 && (
                <h1 className="big-title">
                    Hey !<span className="highlight">Ready to work ?</span>
                </h1>
            )}
            <div className="app-container">
                <div className="menu-burger" onClick={() => setDrawerOpen(true)}>
                    <img src={menuIcon} alt="Menu" className='menu-drawer'/>
                </div>
                <Drawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    pauseEntries={pauseEntries}
                />
                {tasks.length < 5 && (
                    <form onSubmit={handleTaskSubmit} className="task-input-form">
                        <input
                            type="text"
                            value={taskInput}
                            onChange={handleTaskInputChange}
                            placeholder="Enter your task"
                            className="task-input"
                            maxLength={40}
                        />
                    </form>
                )}
                {tasks.length > 0 && (
                    <div className="tasks-container">
                        {tasks.map(task => (
                            <Task key={task.id} task={task} onComplete={handleTaskComplete} />
                        ))}
                    </div>
                )}
                <div className="main-sections">
                    <div className="joke-section">
                        <Joke isBreak={isBreak} isTimerRunning={isTimerRunning} />
                    </div>
                    <div className="timer-section">
                        <Pomodoro addPauseEntry={addPauseEntry} setIsTimerRunning={setIsTimerRunning} setIsBreak={setIsBreak} />
                    </div>
                    <div className="notes-section">
                        <Notes addNote={addNote} isTimerRunning={isTimerRunning} />
                    </div>
                </div>
                <div className="posted-notes">
                    {notes.map((note, index) => (
                        <div key={index} className="note">
                            {note.text}
                            <div className="note-time">{note.time}</div>
                        </div>
                    ))}
                </div>
                {notifications.map((notification) => (
                    <div key={notification.id} className="notification">
                        {notification.message}
                    </div>
                ))}
            </div>
        </>
    );
};

export default App;