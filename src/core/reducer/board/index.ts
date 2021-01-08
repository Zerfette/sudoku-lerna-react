import { AnyAction } from 'redux'
import { Board } from '~core/types'
import {
  autosolve,
  setPuzzle,
  clearSelection,
  clearBoard,
  lockBoard,
  numberSelect,
  selectCell,
  updateBig,
  updateSmall
} from './mutations'

type Reducer = (board: Board, action: AnyAction) => Board
const reducer: Reducer = (board = clearBoard(), { type, payload }) => {
  switch (type) {
    case 'AUTOSOLVE':
      return autosolve(board, payload)
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
