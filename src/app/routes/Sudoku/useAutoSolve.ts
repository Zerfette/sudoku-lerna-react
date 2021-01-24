/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filter, head, map } from 'fp-ts/Array'
import { constant, pipe } from 'fp-ts/function'
import { getOrElse } from 'fp-ts/Option'
import { Lens } from 'monocle-ts'
import { autoSolve } from '~core/actions'
import { indLens, rowLens, colLens, regLens } from '~core/board/optics'
import { getAvailables, getSelected } from '~core/board/selectors'
import { getAutoSolve } from '~core/toggles/selectors'
import { getNumberSelected } from '~core/numberSelected/selectors'
import { Cell } from '~core/types'
import { equals, length, propEq } from '~util/fns'

const emptyCell = {
  ind: 0,
  value: 0,
  row: 0,
  col: 0,
  reg: 0,
  selected: false,
  locked: false,
  highlighted: false,
  corner: [0],
  middle: [0]
}

export const useAutoSolve = (): void => {
  const dispatch = useDispatch()
  const selection = useSelector(getSelected)
  const numberSelected = useSelector(getNumberSelected)
  const { cell } = useSelector(getAvailables)
  const shouldAutoSolve = useSelector(getAutoSolve)
  const selectionHead = pipe(selection, head, getOrElse(constant(emptyCell)))

  type DispatchAutoSolve = (cell: Cell) => void
  const dispatchAutoSolve: DispatchAutoSolve = ({ ind }) =>
    pipe({ ind, value: numberSelected }, autoSolve, dispatch)

  type IsSingleton = (lens: Lens<Cell, number>, i: number) => boolean
  const isSingleton: IsSingleton = (lens, i) =>
    pipe(selection, filter(propEq(lens, i)), length, equals(1))

  type CanSolve = (cell: Cell) => boolean
  const canSolve: CanSolve = ({ row, col, reg }) =>
    isSingleton(rowLens, row) ||
    isSingleton(colLens, col) ||
    isSingleton(regLens, reg)

  //When number is selected check if any selected can autoSolve
  useEffect(() => {
    if (!!numberSelected && shouldAutoSolve)
      pipe(selection, filter(canSolve), map(dispatchAutoSolve))
  }, [selection])

  //When there is only one selected try to autoSolve
  useEffect(() => {
    if (shouldAutoSolve) {
      const singlePossible = pipe(cell, length, equals(1))
      if (singlePossible) {
        const value = pipe(head(cell), getOrElse(constant(0)))
        dispatch(autoSolve({ ind: indLens.get(selectionHead), value }))
      }
    }
  }, [cell])
}
