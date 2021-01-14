import * as React from 'react'
import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
  useTheme
} from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = props => {
  const { toggleColorMode } = useColorMode()
  const { space } = useTheme()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      m={space[3]}
      size='md'
      fontSize='lg'
      variant='ghost'
      color='current'
      marginLeft='2'
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}
