import { IconType } from 'react-icons'
import { FaPlay, FaPause } from 'react-icons/fa'
import { getTimerText } from 'core'
import { IO } from 'fp-ts/IO'
import { Stopwatch } from '../../useStopwatch'

type UseModel = (stopwatch: Stopwatch) => {
  text: string
  resetTimer: IO<void>
  toggleTimer: IO<void>
  Icon: IconType
  iconLabel: string
}
export const useModel: UseModel = ({
  elapsedTime,
  resetTimer,
  toggleTimer,
  isRunning
}) => ({
  text: getTimerText(elapsedTime),
  resetTimer,
  toggleTimer,
  Icon: isRunning ? FaPause : FaPlay,
  iconLabel: isRunning ? 'Pause Timer' : 'Resume Timer'
})
