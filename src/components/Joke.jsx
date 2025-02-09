import { useState, useEffect } from "react";

const Joke = () => {
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

    return (
        <div className="joke-container">
            <h2>Wanna laugh?</h2>
            <div className="joke-content">
                {loading ? "Loading..." : joke}
            </div>
            <button className="button" onClick={fetchJoke}>
                Refresh
            </button>
        </div>
    );
};

export default Joke;