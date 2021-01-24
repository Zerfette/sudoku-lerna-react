import { AnyAction } from 'redux'
import { setNumberSelected } from './mutations'

type Reducer = (numberSelected: number, action: AnyAction) => number
const reducer: Reducer = (numberSelected = 0, { type, payload }) => {
  switch (type) {
    case 'NUMBER_SELECT':
      return setNumberSelected(numberSelected, payload)
    case 'CLEAR_SELECTION':
      return setNumberSelected(numberSelected, { value: 0 })
    case 'SELECT_CELL':
      return setNumberSelected(numberSelected, { value: 0 })
    default:
      return numberSelected
  }
}

export default reducer