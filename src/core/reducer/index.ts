import board from './board'
import toggles from './toggles'
import numberSelected from './numberSelected'
import { combineReducers } from 'redux'

const reducer = combineReducers({ board, toggles, numberSelected })

export default reducer
