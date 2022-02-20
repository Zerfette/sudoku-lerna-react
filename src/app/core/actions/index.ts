import { Lens } from 'monocle-ts'
import { Cell, Puzzle, Smalls, Toggles } from '~core/types'
import { ActionType } from './types'

export const autoSolve = (payload: { ind: number; value: number }) =>
  <const>{ type: ActionType.AUTO_SOLVE, payload }

export const numberSelect = (payload: { value: number }) =>
  <const>{ type: ActionType.NUMBER_SELECT, payload }

export const selectCell = (payload: { ind: number; shouldClear: boolean }) =>
  <const>{ type: ActionType.SELECT_CELL, payload }

export const setPuzzle = (payload: { puzzle: Puzzle }) =>
  <const>{ type: ActionType.SET_PUZZLE, payload }

export const setToggle = (payload: {
  lens: Lens<Toggles, boolean>
  value: boolean
}) => <const>{ type: ActionType.SET_TOGGLE, payload }

export const toggle = (payload: { lens: Lens<Toggles, boolean> }) =>
  <const>{ type: ActionType.TOGGLE, payload }

export const updateBig = (payload: { value: number }) =>
  <const>{ type: ActionType.UPDATE_BIG, payload }

export const updateSmall = (payload: {
  lens: Lens<Cell, Smalls>
  value: number
}) => <const>{ type: ActionType.UPDATE_SMALL, payload }

export const clearBoard = <const>{ type: ActionType.CLEAR_BOARD }

export const clearSelection = <const>{ type: ActionType.CLEAR_SELECTION }

export const createPuzzle = <const>{ type: ActionType.CREATE_PUZZLE }

export const lockBoard = <const>{ type: ActionType.LOCK_BOARD }

export const resetBoard = <const>{ type: ActionType.RESET_BOARD }

export const selectAll = <const>{ type: ActionType.SELECT_ALL }
