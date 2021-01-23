type Action = (
  type: string
) => <T>(payload: T) => { type: string; payload: T }
const action: Action = type => payload => ({ type, payload })

export const autoSolve = action('AUTO_SOLVE')
export const clearBoard = action('CLEAR_BOARD')({})
export const clearSelection = action('CLEAR_SELECTION')({})
export const createPuzzle = action('CREATE_PUZZLE')({})
export const lockBoard = action('LOCK_BOARD')({})
export const numberSelect = action('NUMBER_SELECT')
export const selectAll = action('SELECT_ALL')({})
export const selectCell = action('SELECT_CELL')
export const setPuzzle = action('SET_PUZZLE')
export const setToggle = action('SET_TOGGLE')
export const toggle = action('TOGGLE')
export const updateBig = action('UPDATE_BIG')
export const updateSmall = action('UPDATE_SMALL')
