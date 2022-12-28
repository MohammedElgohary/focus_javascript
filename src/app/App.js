import { useState } from "react";
import { useTimer } from "utils/hooks/useTimer";

export default function App() {
  const [duration, setDuration] = useState(10);

  const {
    countingDown: { display: countDownDisplay },
    stop,
    started,
    reset,
  } = useTimer({
    duration,
  });

  const times = [5, 10, 15, 20, 25, 30, 40, 50, 60];

  return (
    <div className="app">
      {started && (
        <>
          <div className={`watchText ${started && "start"}`}>
            {countDownDisplay}
          </div>
          <button className="stop-btn" onClick={stop}>
            stop
          </button>
          <button className="reset-btn" onClick={reset}>
            reset
          </button>
        </>
      )}

      {!started && (
        <div className="times-container">
          <h1>Choose a duration</h1>

          <div className="times">
            {times.map(time => (
              <button
                key={"time" + time}
                onClick={() => {
                  setDuration(time);
                  reset();
                }}>
                {time}
              </button>
            ))}
          </div>

          <h2>
            <mark>In Minutes</mark>
          </h2>
        </div>
      )}
    </div>
  );
}
