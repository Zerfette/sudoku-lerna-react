import { useEffect } from 'react'
import { IconType } from 'react-icons'
import { FaPlay, FaPause } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { intersperse, map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { isBoardFilled } from '~core/board/selectors'
import { modulo, times, zeroPad } from '~util/fns'
import { Stopwatch } from '~util/hooks'

type UseModel = (
  stopwatch: Stopwatch
) => {
  resetTimer: () => void
  toggleTimer: () => void
  timerReadout: string[]
  Icon: IconType
  iconLabel: string
}
export const useModel: UseModel = ({
  elapsedTime,
  resetTimer,
  startTimer,
  stopTimer,
  isRunning
}) => {
  const filled = useSelector(isBoardFilled)

  const Icon = isRunning ? FaPause : FaPlay
  const iconLabel = isRunning ? 'Pause Timer' : 'Resume Timer'

  const toggleTimer = () => {
    isRunning ? stopTimer() : startTimer()
  }

  const hours = pipe(elapsedTime, modulo(86400), times(1 / 3600), Math.floor) //Math.floor((elapsedTime % (60 * 60 * 24)) / (60 * 60))
  const minutes = pipe(elapsedTime, modulo(3600), times(1 / 60), Math.floor) //Math.floor((elapsedTime % (60 * 60)) / 60)
  const seconds = pipe(elapsedTime, modulo(60), Math.floor) //Math.floor(elapsedTime % 60)
  const timerReadout = pipe(
    [hours, minutes, seconds],
    map(zeroPad),
    intersperse(':')
  )

  useEffect(() => {
    if (!isRunning && !filled) startTimer()
    if (isRunning && filled) stopTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filled])

  return {
    resetTimer,
    toggleTimer,
    timerReadout,
    Icon,
    iconLabel
  }
}
