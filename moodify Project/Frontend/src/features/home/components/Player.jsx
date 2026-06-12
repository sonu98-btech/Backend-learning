import { useContext, useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/use.song";
import "./Player.scss";

const formatTime = (time = 0) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
};

const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

const Player = () => {
    const { song } = useSong();
    // normalize keys coming from backend: support both `AudioUrl` / `PosterUrl` and `url` / `posterUrl`
    const src = song?.AudioUrl || song?.url || "";
    const poster = song?.PosterUrl || song?.posterUrl || "";
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [speed, setSpeed] = useState(1);
    const [repeat, setRepeat] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume;
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.playbackRate = speed;
    }, [speed]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio
                .play()
                .catch(() => {
                    setIsPlaying(false);
                });
        } else {
            audio.pause();
        }
    }, [isPlaying, song]);


    const handleLoadedMetadata = (event) => {
        setDuration(event.target.duration || 0);
    };

    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime || 0);
    };

    const handleSeek = (value) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = value;
        setCurrentTime(value);
    };

    const skipTime = (amount) => {
        const audio = audioRef.current;
        if (!audio) return;
        const nextTime = Math.min(Math.max(audio.currentTime + amount, 0), duration || 0);
        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    const toggleRepeat = () => setRepeat((prev) => !prev);

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <section className="player-card">
            <div className="player-art">
                <img src={poster} alt={song.title} />
            </div>

            <div className="player-info">
                <div className="player-meta">
                    <div>
                        <p className="player-label">Now Playing</p>
                        <h2 className="player-title">{song.title}</h2>
                        <p className="player-subtitle">Mood: {song.mood}</p>
                    </div>
                    <div className="player-badges">
                        <span className="badge">Audio Ready</span>
                        <span className="badge">Speed {speed}x</span>
                    </div>
                </div>

                <div className="player-progress">
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        step="0.1"
                        onChange={(event) => handleSeek(Number(event.target.value))}
                    />
                    <div className="time-row">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    <div className="progress-pill" style={{ width: `${progressPercent}%` }} />
                </div>

                <div className="player-controls">
                    <div className="control-group">
                        <button className="control-button" type="button" onClick={() => skipTime(-15)}>
                            ‹ 15s
                        </button>
                        <button className="control-button primary" type="button" onClick={() => setIsPlaying((prev) => !prev)}>
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                        <button className="control-button" type="button" onClick={() => skipTime(15)}>
                            15s ›
                        </button>
                        <button className="control-button" type="button" onClick={() => handleSeek(0)}>
                            Restart
                        </button>
                    </div>

                    <div className="control-group settings-group">
                        <label className="select-label">
                            Speed
                            <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
                                {speedOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}x
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="volume-label">
                            Volume
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={(event) => setVolume(Number(event.target.value))}
                            />
                        </label>
                        <button
                            className={`control-button ${repeat ? "active" : ""}`}
                            type="button"
                            onClick={toggleRepeat}
                        >
                            {repeat ? "Repeat On" : "Repeat Off"}
                        </button>
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    src={src}
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => {
                        setIsPlaying(false);
                        if (repeat) {
                            handleSeek(0);
                            setIsPlaying(true);
                        }
                    }}
                    autoPlay
                />
            </div>
        </section>
    );
};

export default Player;
