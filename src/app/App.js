import { useState } from "react";
import { useTimer } from "utils/hooks/useTimer";
import { useEvery } from "utils/hooks/useEvery";
import { toast } from "react-toastify";
import { getRandom } from "utils/getRandom";
import data from "../data/data.json";

export default function App() {
  const [duration, setDuration] = useState(10);

  const {
    countingDown: { minutes: countDownMinutes, seconds: countDownSeconds },
    countingUp: { minutes: countUpMinutes, seconds: countUpSeconds },
    started,
    paused,
    stop,
    pause,
    reset,
  } = useTimer({
    duration,
  });

  useEvery({
    duration: 1000 * 60 * 5,
    callback: () => {
      toast.info(getRandom(data.messages));
    },
    condition: !paused,
  });

  return (
    <div className="app">
      {started && (
        <>
          <div className={`watchText`}>
            {[
              countDownMinutes.toString().padStart(2, "0"),
              countDownSeconds.toString().padStart(2, "0"),
            ].join(":")}
            <div className="passedTime">
              <div className="hint">passed time</div>
              {[
                countUpMinutes.toString().padStart(2, "0"),
                countUpSeconds.toString().padStart(2, "0"),
              ].join(":")}
            </div>
            <div className="targetTime">
              <div className="hint">duration</div>
              {[
                duration.toString().padStart(2, "0"),
                (0).toString().padStart(2, "0"),
              ].join(":")}
            </div>
          </div>

          <button className="control-btn pause-btn" onClick={pause}>
            {paused ? "play" : "pause"}
          </button>
          <button className="control-btn stop-btn" onClick={stop}>
            stop
          </button>
          <button className="control-btn reset-btn" onClick={reset}>
            reset
          </button>
        </>
      )}

      {!started && (
        <div className="times-container">
          <h1>Choose a duration</h1>

          <div className="times">
            {data.times.map(time => (
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
