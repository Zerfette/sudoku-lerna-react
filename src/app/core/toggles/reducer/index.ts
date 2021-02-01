import { AnyAction } from 'redux'
import { Toggles } from '~core/types'
import { toggle, setToggle } from './mutations'

const dflt = { mouseDown: false, autoSolve: false }

type Reducer = (toggles: Toggles, action: AnyAction) => Toggles
const reducer: Reducer = (toggles = dflt, { type, payload }) => {
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
