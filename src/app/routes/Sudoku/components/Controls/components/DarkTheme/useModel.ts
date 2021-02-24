import { IconType } from 'react-icons'
import { FaMoon, FaSun } from 'react-icons/fa'
import { IO } from 'fp-ts/IO'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'

type UseModel = IO<{
  Icon: IconType
  label: string
  toggleColorMode: IO<void>
}>

export const useModel: UseModel = () => {
  const isDarkTheme = useColorModeValue(false, true)
  const { toggleColorMode } = useColorMode()

  return {
    Icon: isDarkTheme ? FaSun : FaMoon,
    label: isDarkTheme ? 'Use Light Theme' : 'Use Dark Theme',
    toggleColorMode
  }
}
