import { useTheme } from '@chakra-ui/react'

type UseStyle = () => Record<string, string | number>
export const useStyle: UseStyle = () => {
  const { space } = useTheme()

  return {
    columns: 3,
    spacing: 3,
    width: space[14],
    height: space[14]
  }
}
