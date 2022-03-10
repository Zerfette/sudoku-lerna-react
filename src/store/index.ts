import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import board from './board/reducer'
import toggles from './toggles/reducer'
import numberSelected from './numberSelected/reducer'

const reducer = combineReducers({ board, toggles, numberSelected })

export default createStore(reducer, composeWithDevTools())
