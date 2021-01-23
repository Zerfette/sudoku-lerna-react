import { AnyAction } from 'redux'
import { Board } from '~core/types'
import {
  autoSolve,
  setPuzzle,
  clearSelection,
  clearBoard,
  lockBoard,
  numberSelect,
  selectAll,
  selectCell,
  updateBig,
  updateSmall
} from './mutations'
import {puzzleToBoard} from '~util/fns'

const testPuzzle = [
  [0,3,9,0,7,0,2,5,1],
  [7,0,0,1,2,0,0,3,0],
  [0,1,5,0,9,3,0,0,7],
  [0,0,2,0,0,1,0,4,0],
  [0,0,0,0,0,0,0,0,0],
  [0,8,0,4,0,0,6,0,0],
  [4,0,0,3,6,0,1,9,0],
  [0,9,0,0,4,7,0,0,6],
  [3,6,8,0,1,0,7,2,0]
]

type Reducer = (board: Board, action: AnyAction) => Board
const reducer: Reducer = (
  board = puzzleToBoard(testPuzzle),
  { type, payload }
) => {
  switch (type) {
    case 'AUTO_SOLVE':
      return autoSolve(board, payload)
    case 'CHANGE_PUZZLE':
      return setPuzzle(board, payload)
    case 'CLEAR_SELECTION':
      return clearSelection(board, payload)
    case 'CLEAR_BOARD':
      return clearBoard()
    case 'LOCK_BOARD':
      return lockBoard(board, payload)
    case 'NUMBER_SELECT':
      return numberSelect(board, payload)
    case 'SELECT_ALL':
      return selectAll(board, payload)
    case 'SELECT_CELL':
      return selectCell(board, payload)
    case 'UPDATE_BIG':
      return updateBig(board, payload)
    case 'UPDATE_SMALL':
      return updateSmall(board, payload)
    default:
      return board
  }
}

export default reducer
