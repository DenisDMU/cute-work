import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Joke = ({ isBreak, isTimerRunning }) => {
    const [joke, setJoke] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchJoke = async () => {
        setLoading(true);
        const response = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json",
            },
        });
        const data = await response.json();
        setJoke(data.joke);
        setLoading(false);
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    useEffect(() => {
        if (isBreak) {
            fetchJoke();
        }
    }, [isBreak]);

    return (
        <div className="joke-container">
            {isTimerRunning && !isBreak ? (
                <DotLottieReact
                    src="https://lottie.host/187f459c-eb65-4086-b4e2-d37523d1cf4d/hmPeHA0Aqc.lottie"
                    loop
                    autoplay
                />
            ) : (
                <>
                    <h2>Wanna laugh?</h2>
                    <div className="joke-content">
                        {loading ? "Loading..." : joke}
                    </div>
                    <button className="button" onClick={fetchJoke}>
                        Refresh
                    </button>
                </>
            )}
        </div>
    );
};

Joke.propTypes = {
    isBreak: PropTypes.bool.isRequired,
    isTimerRunning: PropTypes.bool.isRequired,
};

export default Joke;