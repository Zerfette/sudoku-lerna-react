import { useSelector } from 'react-redux'
import { useColorModeValue, useTheme } from '@chakra-ui/react'
import { getBoard } from '~core/board/selectors'
import { Cell } from '~core/types'
import { noConflicts } from '~util/fns'

type UseStyle = (cell: Cell) => Record<string, string | number>
export const useStyle: UseStyle = cell => {
  const {
    colors: { cyan, red, purple },
    space
  } = useTheme()
  const board = useSelector(getBoard)
  const { value, highlighted, locked, selected } = cell
  const valid = noConflicts(board, cell, value)
  const invalidColor = useColorModeValue(red[200], red[700])
  const highlightedColor = useColorModeValue(cyan[200], cyan[700])
  const selectedColor = useColorModeValue(purple[400], purple[600])
  const dflt = useColorModeValue(purple[200], purple[800])

  return {
    bg: !valid
      ? invalidColor
      : highlighted
      ? highlightedColor
      : selected
      ? selectedColor
      : dflt,
    height: space[14],
    width: space[14],
    fontWeight: locked ? 900 : 400
  }
}
