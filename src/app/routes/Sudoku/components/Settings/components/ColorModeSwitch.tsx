import React, { FC } from 'react'
import {
  Flex,
  IconButtonProps,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  useTheme
} from '@chakra-ui/react'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitch: FC<ColorModeSwitcherProps> = props => {
  const { space } = useTheme()
  const { toggleColorMode } = useColorMode()
  const isChecked = useColorModeValue(false, true)

  return (
    <Flex align='center'>
      <Switch isChecked={isChecked} onChange={toggleColorMode} />
      <Text lineHeight='1' ml={space[3]} fontSize='lg'>
        Dark Mode
      </Text>
      <Text fontSize='sm' as='i' color='grey' ml={space[1]}>
        ({isChecked ? 'Enabled' : 'Disabled'})
      </Text>
    </Flex>
  )
}
