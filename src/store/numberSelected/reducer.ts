import { Action, ActionType } from 'core/actions/types'

type Reducer = (numberSelected: number, action: Action) => number
const reducer: Reducer = (numberSelected = 0, action) => {
  switch (action.type) {
    case ActionType.NUMBER_SELECT:
      return action.payload.value
    case ActionType.CLEAR_SELECTION:
      return 0
    case ActionType.SELECT_CELL:
      return 0
    default:
      return numberSelected
  }
}

export default reducer