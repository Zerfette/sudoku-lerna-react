import { IconType } from 'react-icons'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'

type UseModel = () => {
  Icon: IconType
  label: string
  toggleColorMode: () => void
}
export const useModel: UseModel = () => {
  const isDarkTheme = useColorModeValue(false, true)
  const { toggleColorMode } = useColorMode()

  const label = isDarkTheme ? 'Use Light Theme' : 'Use Dark Theme'
  const Icon = isDarkTheme ? FaSun : FaMoon

  return { Icon, label, toggleColorMode }
}
