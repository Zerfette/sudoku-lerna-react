import { useColorModeValue, useTheme } from '@chakra-ui/react'
import { Cell } from '~core/types'

type UseStyle = (cell: Cell) => Record<string, string>
export const useStyle: UseStyle = ({ locked }) => {
  const {
    colors: { white, gray, purple }
  } = useTheme()
  const isLocked = useColorModeValue(gray[800], white)
  const isNotLocked = useColorModeValue(purple[600], purple[300])

  return {
    color: locked ? isLocked : isNotLocked
  }
}
