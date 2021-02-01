import React, { FC } from 'react'
import {
  IconButton,
  Tooltip,
  useTheme
} from '@chakra-ui/react'
import { useModel } from './useModel'

export const DarkTheme: FC = () => {
  const { space } = useTheme()
  const { Icon, label, toggleColorMode } = useModel()

  return (
    <Tooltip label={label}>
      <IconButton
        ml={space[3]}
        fontSize='lg'
        onClick={toggleColorMode}
        icon={<Icon />}
        aria-label={label}
      />
    </Tooltip>
  )
}
