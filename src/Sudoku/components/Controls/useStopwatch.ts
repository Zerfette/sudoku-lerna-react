import { useState, useEffect } from 'react'
import { arrayOptionMonoid, getPrevTotal, Laps } from 'core/stopwatch'
import { fold as boolFold } from 'fp-ts/boolean'
import { IO } from 'fp-ts/IO'
import { fold, none, Option, some } from 'fp-ts/Option'

const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const increment = () =>
    setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1)
  let interval: NodeJS.Timeout

  useEffect(() => {
    const onFalse = () => clearInterval(interval)
    const onTrue = () => (interval = setInterval(increment, 100))
    boolFold(onFalse, onTrue)(isRunning)
    return () => clearInterval(interval)
  }, [isRunning])

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime
  }
}

export type Stopwatch = {
  elapsedTime: number
  laps: Laps
  addLap: IO<void>
  resetTimer: IO<void>
  startTimer: IO<void>
  stopTimer: IO<void>
  toggleTimer: IO<void>
  isRunning: boolean
}

const useStopwatch: IO<Stopwatch> = () => {
  const [laps, setLaps] = useState<Laps>(none)
  const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer()

  const resetTimer = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setLaps(none)
  }

  const addLap = () => {
    const onNone = () => elapsedTime
    const onSome = () => elapsedTime - getPrevTotal(laps)
    const currentLap = fold(onNone, onSome)(laps)
    isRunning && setLaps(arrayOptionMonoid.concat(laps, some([currentLap])))
  }

  const startTimer = () => setIsRunning(true)
  const stopTimer = () => setIsRunning(false)
  const toggleTimer = () => (isRunning ? stopTimer() : startTimer())

  return {
    elapsedTime: +elapsedTime.toFixed(1),
    laps,
    addLap,
    resetTimer,
    startTimer,
    stopTimer,
    toggleTimer,
    isRunning
  }
}

export { useStopwatch }
