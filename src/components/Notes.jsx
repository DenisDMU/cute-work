import { useState } from "react";
import PropTypes from "prop-types";

const Notes = ({ addNote }) => {
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
            <textarea
                value={note}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Write your notes here..."
            />
            <button className="button" onClick={handlePost}>
                Post
            </button>
        </div>
    );
};

Notes.propTypes = {
    addNote: PropTypes.func.isRequired,
};

export default Notes;