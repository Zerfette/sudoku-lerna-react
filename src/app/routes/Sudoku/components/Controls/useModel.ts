/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { every, filter, isEmpty, map } from 'fp-ts/Array'
import { fold } from 'fp-ts/boolean'
import { not, pipe } from 'fp-ts/function'
import { useDisclosure } from '@chakra-ui/react'
import { valueLens } from '~core/board/optics'
import { getBoard } from '~core/board/selectors'
import { equals, modulo, noConflicts, times } from '~util/fns'
import { Stopwatch, useStopwatch } from '~util/hooks'

type UseModel = () => {
  body: string
  heading: string
  isOpen: boolean
  onClose: () => void
  solved: boolean
  stopwatch: Stopwatch
}
export const useModel: UseModel = () => {
  const [startOnClose, setStartOnClose] = useState(false)
  const [solved, setSolved] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const board = useSelector(getBoard)
  const done = pipe(board, map(valueLens.get), every(not(equals(0))))
  const stopwatch = useStopwatch()
  const { elapsedTime, isRunning, startTimer, stopTimer } = stopwatch
  const hours = pipe(elapsedTime, modulo(86400), times(1 / 3600), Math.floor)
  const minutes = pipe(elapsedTime, modulo(3600), times(1 / 60), Math.floor)
  const seconds = pipe(elapsedTime, modulo(60), Math.floor)
  const heading = solved ? 'Congratulations!' : 'Oops!'
  const body = solved
    ? `Your time was ${hours}h ${minutes}m ${seconds}s :)`
    : 'Try again :('

  useEffect(() => {
    startTimer()
  }, [])

  useEffect(() => {
    if (done) {
      pipe(
        board,
        map(cell => noConflicts(board, cell, cell.value)),
        filter(equals(false)),
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
    body,
    heading,
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
