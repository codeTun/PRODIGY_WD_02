import React, { useEffect, useRef, useState } from "react";

function format(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .join(":");
}

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const timer = useRef();

  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer.current);
    }

    return () => clearInterval(timer.current);
  }, [isRunning]);

  return (
    <div className="stopwatch">
      <p className="timer">{format(time)}</p>
      <div className="actions">
        <button className="start" onClick={() => setTime(0)}>
          Restart
        </button>
        <button
          className="stop"
          onClick={() => {
            if (isRunning) {
              clearInterval(timer.current);
            }
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? "Stop" : "Resume"}
        </button>
      </div>
    </div>
  );
}
