import { useState, useEffect } from 'react'
import { getMonoid as getArrayMonoid } from 'fp-ts/Array'
import { fold as monoidFold, monoidSum } from 'fp-ts/Monoid'
import {
  fold,
  getMonoid as getOptionMonoid,
  none,
  Option,
  some
} from 'fp-ts/Option'
import { constant, pipe } from 'fp-ts/function'

const arrayOptionMonoid = pipe(getArrayMonoid<number>(), getOptionMonoid)

const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false)
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
    const prevTotal = pipe(
      laps,
      fold(constant(0), monoidFold(monoidSum))
    )
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
    resetTimer: () => handleReset(),
    startTimer: () => setIsRunning(true),
    stopTimer: () => setIsRunning(false),
    isRunning
  }
}

export { useStopwatch }
