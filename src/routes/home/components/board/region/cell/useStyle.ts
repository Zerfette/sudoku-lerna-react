import { useColorModeValue, useTheme } from '@chakra-ui/react'
import { Cell } from '~core/types'

type UseStyle = (cell: Cell) => Record<string, string>
export const useStyle: UseStyle = ({ highlighted, selected }) => {
  const {
    colors: { cyan, purple },
    space
  } = useTheme()
  const isSelected = useColorModeValue(cyan[200], cyan[700])
  const isHighlighted = useColorModeValue(purple[400], purple[600])
  const dflt = useColorModeValue(purple[200], purple[800])

  return {
    bg: selected ? isSelected : highlighted ? isHighlighted : dflt,
    height: space[14],
    width: space[14]
  }
}
