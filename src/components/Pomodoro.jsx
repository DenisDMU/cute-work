import { useState, useEffect, useMemo, useCallback } from "react";
import jobsDoneSound from "../assets/sounds/jobsdone.mp3";
import zawarudoSound from "../assets/sounds/zawarudo.mp3";
import rewindSound from "../assets/sounds/rewind.mp3";
import startSound from "../assets/sounds/start.mp3";
import skyImage from "../assets/images/sky.png";
import pauseImage from "../assets/images/pause.png";
import oceanImage from "../assets/images/ocean.png";
import Popup from "./Popup";

const Pomodoro = () => {
    const [seconds, setSeconds] = useState(1500); // 25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(skyImage);
    const [showPopup, setShowPopup] = useState(false);
    const [duration, setDuration] = useState(25); // Duration in minutes
    const [durationSet, setDurationSet] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0); // Pour mesurer le temps travaillé

    const jobsDoneAudio = useMemo(() => new Audio(jobsDoneSound), []);
    const zawarudoAudio = useMemo(() => new Audio(zawarudoSound), []);
    const rewindAudio = useMemo(() => new Audio(rewindSound), []);
    const startAudio = useMemo(() => new Audio(startSound), []);

    const stopAllAudio = useCallback(() => {
        jobsDoneAudio.pause();
        jobsDoneAudio.currentTime = 0;
        zawarudoAudio.pause();
        zawarudoAudio.currentTime = 0;
        rewindAudio.pause();
        rewindAudio.currentTime = 0;
        startAudio.pause();
        startAudio.currentTime = 0;
    }, [jobsDoneAudio, zawarudoAudio, rewindAudio, startAudio]);

 useEffect(() => {
    let interval;
    if (isRunning) {
        interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    stopAllAudio();

                    // À la fin du temps de travail
                    if (!isBreak) {
                        jobsDoneAudio.play();
                        setShowPopup(true); // Affiche le popup
                        setSeconds(300); // 5 minutes de pause
                        setIsBreak(true);
                    } else {
                        // À la fin de la pause : pas de popup
                        setShowPopup(false);
                        setSeconds(duration * 60);
                        setIsBreak(false);
                    }
                    setElapsedTime(0); // Réinitialiser le temps de travail
                    return 0;
                }
                // Incrémente le temps travaillé seulement si on est en mode travail
                if (!isBreak) {
                    setElapsedTime((old) => old + 1);
                }
                return prev - 1;
            });
        }, 1000);
    }
    return () => clearInterval(interval);
}, [isRunning, isBreak, stopAllAudio, jobsDoneAudio, duration]);
    const startTimer = () => {
        setIsRunning(true);
        setIsPaused(false);
        setBackgroundImage(oceanImage);
        stopAllAudio();
        startAudio.play();
        setElapsedTime(0);
    };

   const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
    setBackgroundImage(pauseImage);
    stopAllAudio();
    zawarudoAudio.play();

    // Indique le temps travaillé avant la pause
    const mins = Math.floor(elapsedTime / 60);
    const secs = elapsedTime % 60;
    console.log(`You worked for ${mins} min(s) and ${secs} sec(s) before pausing.`);
    
    // Add pause entry
    addPauseEntry({ mins, secs });

    setElapsedTime(0);
};

    const resetTimer = () => {
        setIsRunning(false);
        setIsPaused(false);
        setIsBreak(false);
        setSeconds(duration * 60);
        setBackgroundImage(skyImage);
        stopAllAudio();
        rewindAudio.play();
        setDurationSet(false);
        setElapsedTime(0);
        setShowPopup(false);
    };

    const handleDurationChange = (e) => {
        setDuration(Number(e.target.value));
    };

    const handleDurationSubmit = () => {
        setSeconds(duration * 60);
        setDurationSet(true);
    };

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const displayText = isPaused
        ? "Pause"
        : isRunning
        ? isBreak
            ? "Break Time!"
            : "Work Time!"
        : "Let's get started!";

    return (
        <div
            className="timer-container"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <h1>{displayText}</h1>
            <div className={`timer ${isPaused ? 'paused' : ''}`}>
                {minutes}:{remainingSeconds < 10 ? "0" : ""}{remainingSeconds}
            </div>
            <div className="button-container">
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
            {!durationSet && (
                <div className="duration-container">
                    <label htmlFor="duration">Choose minutes :</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={handleDurationChange}
                        min="1"
                        onFocus={(e) => e.target.select()}
                    />
                    <button className="button" onClick={handleDurationSubmit}>
                        Sure ?
                    </button>
                </div>
            )}
            <Popup show={showPopup} onClose={() => setShowPopup(false)} />
        </div>
    );
};

export default Pomodoro;
