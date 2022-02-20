import { Action, ActionType } from '../../actions/types'
import { setNumberSelected } from './mutations'

type Reducer = (numberSelected: number, action: Action) => number
const reducer: Reducer = (numberSelected = 0, action) => {
  switch (action.type) {
    case ActionType.NUMBER_SELECT:
      return setNumberSelected(numberSelected, action.payload)
    case ActionType.CLEAR_SELECTION:
      return setNumberSelected(numberSelected, { value: 0 })
    case ActionType.SELECT_CELL:
      return setNumberSelected(numberSelected, { value: 0 })
    default:
      return numberSelected
  }
}

export default reducer