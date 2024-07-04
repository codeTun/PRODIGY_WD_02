import { useEffect, useRef, useState } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="stopwatch p-6 rounded-lg shadow-lg bg-cyan-950">
        <p className="timer text-6xl font-bold text-center mb-4 ">
          {format(time)}
        </p>
        <div className="actions flex space-x-4 justify-center">
          <button
            className="start bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
            onClick={() => setTime(0)}
          >
            Restart
          </button>
          <button
            className={`stop ${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out`}
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
    </div>
  );
}
