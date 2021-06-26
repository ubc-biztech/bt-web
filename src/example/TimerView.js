/* eslint-disable react/react-in-jsx-scope */
// This is a helper to display time
function padZero (time) {
  return time < 10 ? `0${time}` : `${time}`
}

const TimerView = ({
  minutes,
  seconds,
  milliseconds,
  startClicked,
  pauseClicked,
  resetClicked
}) => (
  <div>
    <h1>{`${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`}</h1>

    <button
      type='button'
      onClick={startClicked}
    >
            Start
    </button>
    <button
      type='button'
      onClick={pauseClicked}
    >
            Pause
    </button>

    <button
      type='button'
      onClick={resetClicked}
    >
            Reset
    </button>

  </div>
)
export default TimerView
