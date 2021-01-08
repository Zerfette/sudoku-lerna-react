import board from './board'
import toggles from './toggles'
import { combineReducers } from 'redux'

const reducer = combineReducers({board, toggles})

export default reducer
