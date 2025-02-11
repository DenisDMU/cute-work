import { useState, useEffect } from 'react';
import Pomodoro from './components/Pomodoro.jsx';
import Notes from './components/Notes.jsx';
import Joke from './components/Joke.jsx';
import Drawer from './components/Drawer.jsx';
import menuIcon from './assets/images/menu.png';
import './App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [pauseEntries, setPauseEntries] = useState([]);

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
            <h1 className="big-title">
               Hey !<span className="highlight">Ready to work ?</span>
            </h1>
            <div className="app-container">
                <div className="menu-burger" onClick={() => setDrawerOpen(true)}>
                    <img src={menuIcon} alt="Menu" className='menu-drawer'/>
                </div>
                <Drawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    pauseEntries={pauseEntries}
                />
                <div className="main-sections">
                    <div className="joke-section">
                        <Joke />
                    </div>
                    <div className="timer-section">
                        <Pomodoro addPauseEntry={addPauseEntry} />
                    </div>
                    <div className="notes-section">
                        <Notes addNote={addNote} />
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