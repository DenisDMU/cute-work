import { useState } from "react";
import PropTypes from "prop-types";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Notes = ({ addNote, isTimerRunning }) => {
    const [note, setNote] = useState("");

    const handleChange = (e) => {
        setNote(e.target.value);
    };

    const handlePost = () => {
        if (note.trim()) {
            const currentTime = new Date().toLocaleTimeString();
            addNote({ text: note, time: currentTime });
            setNote("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handlePost();
        }
    };

    return (
        <div className="notes-container">
            <h2>Notes</h2>
            {isTimerRunning ? (
                <>
                    <textarea
                        value={note}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Write your notes here..."
                        maxLength={28}
                    />
                    <button className="button" onClick={handlePost}>
                        Post
                    </button>
                </>
            ) : (
                <DotLottieReact
                    src="https://lottie.host/24584c0c-089c-490c-92e0-b982fbf82d91/ykPuEvJHun.lottie"
                    loop
                    autoplay
                />
            )}
        </div>
    );
};

Notes.propTypes = {
    addNote: PropTypes.func.isRequired,
    isTimerRunning: PropTypes.bool.isRequired,
};

export default Notes;