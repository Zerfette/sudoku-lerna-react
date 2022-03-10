import { useColorModeValue, useTheme } from '@chakra-ui/react'

type UseStyle = () => Record<string, string>
export const useStyle: UseStyle = () => {
  const {
    colors: { cyan, purple }
  } = useTheme()
  const cornerColor = useColorModeValue(cyan[800], cyan[200])
  const middleColor = useColorModeValue(purple[600], purple[300])
  return { cornerColor, middleColor }
}
