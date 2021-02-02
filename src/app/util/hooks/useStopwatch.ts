import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMonoid as getArrayMonoid } from 'fp-ts/Array'
import { constant, pipe } from 'fp-ts/function'
import { fold as monoidFold, monoidSum } from 'fp-ts/Monoid'
import {
  fold,
  getMonoid as getOptionMonoid,
  none,
  Option,
  some
} from 'fp-ts/Option'
import { setToggle } from '~core/actions'
import { timerIsRunningLens } from '~core/toggles/optics'
import { getTimerIsRunning } from '~core/toggles/selectors'

const arrayOptionMonoid = pipe(getArrayMonoid<number>(), getOptionMonoid)

const useTimer = () => {
  const isRunning = useSelector(getTimerIsRunning)
  const dispatch = useDispatch()
  const setIsRunning = (value: boolean) => pipe({lens: timerIsRunningLens, value}, setToggle, dispatch)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(
        () => setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1),
        100
      )
    }
    return () => clearInterval(interval)
  }, [isRunning])

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime
  }
}

const useStopwatch = () => {
  const [laps, setLaps] = useState<Option<number[]>>(none)
  const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer()

  const handleReset = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setLaps(none)
  }

  const handleAddLap = () => {
    const prevTotal = pipe(laps, fold(constant(0), monoidFold(monoidSum)))
    const currentLap = pipe(
      laps,
      fold(constant(elapsedTime), constant(elapsedTime - prevTotal))
    )
    isRunning && setLaps(arrayOptionMonoid.concat(laps, some([currentLap])))
  }

  return {
    elapsedTime: +elapsedTime.toFixed(1),
    laps,
    addLap: () => handleAddLap(),
    resetTimer: () => {
      handleReset()
      setIsRunning(true)
    },
    startTimer: () => setIsRunning(true),
    stopTimer: () => setIsRunning(false),
    isRunning
  }
}

export { useStopwatch }
