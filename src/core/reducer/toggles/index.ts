import { AnyAction } from 'redux'
import { Toggles } from '~core/types'
import { toggle, setToggle } from './mutations'

const defualt = { locked: true, mouseDown: false }

type Reducer = (toggles: Toggles, action: AnyAction) => Toggles
const reducer: Reducer = (toggles = defualt, { type, payload }) => {
  switch (type) {
    case 'TOGGLE':
      return toggle(toggles, payload)
    case 'SET_TOGGLE':
      return setToggle(toggles, payload)
    default:
      return toggles
  }
}

export default reducer
