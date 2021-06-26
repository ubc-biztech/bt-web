/// This is a TimerController example!
/// To see this in action, please initialize a new react app with this component along with the associated files
/// Here we see that the TimerController model does not see anything within what the controller is doing, it just contains the data

import { useState } from 'react'
import TimerView from './TimerView'

/// TIMERCONTROLLER MODEL START ---------------------------------------------------------------------------------------------------------------------------------------------

const TimerController = () => {
  // Timer Controller: does not see anything in the controller - completely separate
  const [time, setTime] = useState(new Date(0))
  const [timerInterval, setTimerInterval] = useState(null)

  /// TIMERCONTROLLER MODEL END ---------------------------------------------------------------------------------------------------------------------------------------------

  /// Here, the controller contains all the logic for the component, it decides what to change in the model and in the view
  /// note that the model does not know anything going on in the controller and we will see this likewise with the view and the controlller

  /// TIMERCONTROLLER CONTROLLER START ---------------------------------------------------------------------------------------------------------------------------------------------

  // Timer Controller: contains all the functions that relates to the model and the view
  function startClicked () {
    const step = 10
    if (!timerInterval) {
      setTimerInterval(setInterval(() => {
        setTime((oldState) => {
          const newMs = oldState.getTime() + step
          return new Date(newMs)
        })
      }, step))
    }
  }

  function pauseClicked () {
    clearInterval(timerInterval)
    setTimerInterval(null)
  }

  function resetClicked () {
    setTime(new Date(0))
  }

  /// TIMERCONTROLLER CONTROLLER END ---------------------------------------------------------------------------------------------------------------------------------------------

  /// Here we have the View and note that the view does not know anything of the model, the controller tells what the view should be and the view's job is to just
  /// display the time
  /// There is a helper for the View in TimerView.js file

  /// TIMERCONTROLLER VIEW START ---------------------------------------------------------------------------------------------------------------------------------------------
  // Timer View
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <TimerView
      minutes={time.getMinutes()}
      seconds={time.getSeconds()}
      milliseconds={Math.floor(time.getMilliseconds() / 10).toFixed(0)}
      startClicked={startClicked}
      pauseClicked={pauseClicked}
      resetClicked={resetClicked}
    />
  )
}

/// TIMERCONTROLLER VIEW END ---------------------------------------------------------------------------------------------------------------------------------------------

export default TimerController
