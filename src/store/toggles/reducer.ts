import { toggle, setToggle } from 'core'
import { Toggles } from 'core/types'
import { Action, ActionType } from 'core/actions/types'

const dflt = { autoSolve: false, mouseDown: false}

type Reducer = (toggles: Toggles, action: Action) => Toggles
const reducer: Reducer = (toggles = dflt, action) => {
  switch (action.type) {
    case ActionType.TOGGLE:
      return toggle(toggles, action.payload)
    case ActionType.SET_TOGGLE:
      return setToggle(toggles, action.payload)
    default:
      return toggles
  }
}

export default reducer
