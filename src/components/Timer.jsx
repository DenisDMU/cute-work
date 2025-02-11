import { useState, useEffect } from "react";

const Pomodoro = () => {
	const [seconds, setSeconds] = useState(1500); // 25 minutes in sec
	const [isRunning, setIsRunning] = useState(false);
	const [isBreak, setIsBreak] = useState(false);

	useEffect(() => {
		let interval;
		if (isRunning) {
			interval = setInterval(() => {
				setSeconds((prev) => {
					if (prev <= 0) {
						clearInterval(interval);
						if (isBreak) {
							setSeconds(1500); // Reset to 25 minutes
							setIsBreak(false); // Switch back to work
						} else {
							setSeconds(300); // 5 minutes break
							setIsBreak(true); // Switch to break
						}
					}
					return prev - 1;
				});
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isRunning, isBreak]);

	const startTimer = () => setIsRunning(true);
	const stopTimer = () => setIsRunning(false);
	const resetTimer = () => {
		setIsRunning(false);
		setSeconds(1500); // Reset to 25 minutes
	};

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	return (
		<div className="timer-container">
			<h1>{isBreak ? "Break Time!" : "Work Time!"}</h1>
			<div>{`${minutes}:${
				remainingSeconds < 10 ? "0" : ""
			}${remainingSeconds}`}</div>
			<div>
				{!isRunning ? (
					<button
						className="button"
						onClick={startTimer}
					>
						Start
					</button>
				) : (
					<button
						className="button"
						onClick={stopTimer}
					>
						Pause
					</button>
				)}
				<button className="button" onClick={resetTimer}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Pomodoro;
