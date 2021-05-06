/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDisclosure } from '@chakra-ui/react'
import { every, filter, isEmpty, map } from 'fp-ts/Array'
import { Eq as bEq, fold } from 'fp-ts/boolean'
import { not, pipe } from 'fp-ts/function'
import { IO } from 'fp-ts/IO'
import { Eq as nEq, MonoidProduct } from 'fp-ts/number'
import { valueLens } from '~core/board/optics'
import { getBoard } from '~core/board/selectors'
import { concat, equals, magmaModulo, noConflicts } from '~util/fns'
import { Stopwatch, useStopwatch } from '~util/hooks'

type UseModel = IO<{
  body: string
  heading: string
  isOpen: boolean
  onClose: IO<void>
  solved: boolean
  stopwatch: Stopwatch
}>

export const useModel: UseModel = () => {
  const [startOnClose, setStartOnClose] = useState(false)
  const [solved, setSolved] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const board = useSelector(getBoard)
  const done = pipe(board, map(valueLens.get), every(not(equals(nEq)(0))))

  const stopwatch = useStopwatch()
  const { elapsedTime, isRunning, startTimer, stopTimer } = stopwatch
  const hours = pipe(
    elapsedTime,
    concat(magmaModulo)(86400),
    concat(MonoidProduct)(1 / 3600),
    Math.floor
  )
  const minutes = pipe(
    elapsedTime,
    concat(magmaModulo)(3600),
    concat(MonoidProduct)(1 / 60),
    Math.floor
  )
  const seconds = pipe(elapsedTime, concat(magmaModulo)(60), Math.floor)

  useEffect(() => {
    startTimer()
  }, [])

  useEffect(() => {
    if (done) {
      pipe(
        board,
        map(cell => noConflicts(board, cell, cell.value)),
        filter(equals(bEq)(false)),
        isEmpty,
        fold(
          () => {
            setStartOnClose(isRunning)
            isRunning && stopTimer()
            onOpen()
          },
          () => {
            setSolved(true)
            isRunning && stopTimer()
            onOpen()
          }
        )
      )
    }
  }, [done])

  return {
    body: solved
      ? `Your time was ${hours}h ${minutes}m ${seconds}s :)`
      : 'Try again :(',
    heading: solved ? 'Congratulations!' : 'Oops!',
    isOpen,
    onClose: () => {
      onClose()
      if (!solved && startOnClose) startTimer()
      solved && setSolved(false)
    },
    solved,
    stopwatch
  }
}
