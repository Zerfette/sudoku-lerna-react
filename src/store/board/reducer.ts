import {
  autoSolve,
  clearSelection,
  clearBoard,
  lockBoard,
  numberSelect,
  puzzleToBoard,
  resetBoard,
  selectAll,
  selectCell,
  updateBig,
  updateSmall
} from 'core'
import { Board } from 'core/types'
import { Action, ActionType } from 'core/actions/types'

const testPuzzle = [
  [0, 3, 9, 0, 7, 0, 2, 5, 1],
  [7, 0, 0, 1, 2, 0, 0, 3, 0],
  [0, 1, 5, 0, 9, 3, 0, 0, 7],
  [0, 0, 2, 0, 0, 1, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 0, 4, 0, 0, 6, 0, 0],
  [4, 0, 0, 3, 6, 0, 1, 9, 0],
  [0, 9, 0, 0, 4, 7, 0, 0, 6],
  [3, 6, 8, 0, 1, 0, 7, 2, 0]
]

const funPuzzle = [
  [0, 0, 2, 0, 1, 0, 3, 0, 0],
  [0, 4, 0, 7, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 9, 0, 4],
  [0, 9, 0, 0, 0, 1, 0, 0, 0],
  [6, 0, 0, 0, 9, 0, 0, 0, 5],
  [0, 0, 0, 3, 0, 0, 0, 9, 0],
  [8, 0, 4, 0, 0, 0, 0, 0, 6],
  [0, 0, 0, 0, 0, 8, 0, 1, 0],
  [0, 0, 3, 0, 7, 0, 2, 0, 0]
]

type Reducer = (board: Board, action: Action) => Board
const reducer: Reducer = (board = puzzleToBoard(testPuzzle), action) => {
  switch (action.type) {
    case ActionType.AUTO_SOLVE:
      return autoSolve(board, action.payload)
    case ActionType.SET_PUZZLE:
      return puzzleToBoard(action.payload.puzzle)
    case ActionType.CLEAR_SELECTION:
      return clearSelection(board)
    case ActionType.CLEAR_BOARD:
      return clearBoard
    case ActionType.LOCK_BOARD:
      return lockBoard(board)
    case ActionType.NUMBER_SELECT:
      return numberSelect(board, action.payload)
    case ActionType.RESET_BOARD:
      return resetBoard(board)
    case ActionType.SELECT_ALL:
      return selectAll(board)
    case ActionType.SELECT_CELL:
      return selectCell(board, action.payload)
    case ActionType.UPDATE_BIG:
      return updateBig(board, action.payload)
    case ActionType.UPDATE_SMALL:
      return updateSmall(board, action.payload)
    default:
      return board
  }
}

export default reducer
