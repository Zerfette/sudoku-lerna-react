import { IconType } from 'react-icons'
import { FaPlay, FaPause } from 'react-icons/fa'
import { intersperse, map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { IO } from 'fp-ts/IO'
import { modulo, times, zeroPad } from '~util/fns'
import { Stopwatch } from '~util/hooks'

type UseModel = (
  stopwatch: Stopwatch
) => {
  text: string[]
  resetTimer: IO<void>
  toggleTimer: IO<void>
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
  const hours = pipe(elapsedTime, modulo(86400), times(1 / 3600), Math.floor)
  const minutes = pipe(elapsedTime, modulo(3600), times(1 / 60), Math.floor)
  const seconds = pipe(elapsedTime, modulo(60), Math.floor)

  return {
    text: pipe([hours, minutes, seconds], map(zeroPad), intersperse(':')),
    resetTimer,
    toggleTimer: () => {
      isRunning ? stopTimer() : startTimer()
    },
    Icon: isRunning ? FaPause : FaPlay,
    iconLabel: isRunning ? 'Pause Timer' : 'Resume Timer'
  }
}
