import {
  autoSolve,
  numberSelect,
  selectCell,
  setPuzzle,
  setToggle,
  toggle,
  updateBig,
  updateSmall,
  clearBoard,
  clearSelection,
  createPuzzle,
  lockBoard,
  resetBoard,
  selectAll
} from './index'

export enum ActionType {
  AUTO_SOLVE,
  CLEAR_BOARD,
  CLEAR_SELECTION,
  CREATE_PUZZLE,
  LOCK_BOARD,
  NUMBER_SELECT,
  RESET_BOARD,
  SELECT_ALL,
  SELECT_CELL,
  SET_PUZZLE,
  SET_TOGGLE,
  TOGGLE,
  UPDATE_BIG,
  UPDATE_SMALL
}

type AutoSolveAction = ReturnType<typeof autoSolve>
type NumberSelectAction = ReturnType<typeof numberSelect>
type SelectCell = ReturnType<typeof selectCell>
type SetPuzzleAction = ReturnType<typeof setPuzzle>
type SetToggleAction = ReturnType<typeof setToggle>
type ToggleAction = ReturnType<typeof toggle>
type UpdateBigAction = ReturnType<typeof updateBig>
type UpdateSmallAction = ReturnType<typeof updateSmall>
type ClearBoardAction = typeof clearBoard
type ClearSelectionAction = typeof clearSelection
type CreatePuzzleAction = typeof createPuzzle
type LockBoardAction = typeof lockBoard
type ResetBoardAction = typeof resetBoard
type SelectAllAction = typeof selectAll

export type Action =
  | AutoSolveAction
  | NumberSelectAction
  | SelectCell
  | SetPuzzleAction
  | SetToggleAction
  | ToggleAction
  | UpdateBigAction
  | UpdateSmallAction
  | ClearBoardAction
  | ClearSelectionAction
  | CreatePuzzleAction
  | LockBoardAction
  | ResetBoardAction
  | SelectAllAction