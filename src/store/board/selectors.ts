import { createSelector } from 'reselect'
import { boardLens } from 'core/optics'
import { getAvailablesValues, getSelectedOption } from 'core/selectors'

export const getSelected = createSelector([boardLens.get], getSelectedOption)

export const getAvailables = createSelector(
  [boardLens.get],
  getAvailablesValues
)
