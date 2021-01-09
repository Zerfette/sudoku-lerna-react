import { useColorModeValue, useTheme } from '@chakra-ui/react'
import { Cell } from '~core/types'

type UseStyle = (cell: Cell) => Record<string, string>
export const useStyle: UseStyle = ({ selected }) => {
  const {
    colors: { teal, purple },
    space
  } = useTheme()
  const isSelected = useColorModeValue(teal[200], teal[700]) 
  const isNotSelected = useColorModeValue(purple[200], purple[800])

  return {
    bg: selected ? isSelected : isNotSelected,
    height: space[14],
    width: space[14],
    userSelect: 'none'
  }
}
