import React, { FC } from 'react'
import {
  IconButton,
  Tooltip,
  useTheme
} from '@chakra-ui/react'
import { FaMagic } from 'react-icons/fa'
import { useModel } from './useModel'

export const AutoSolve: FC = () => {
  const { space } = useTheme()
  const { colorScheme, label, onClick } = useModel()

  return (
    <Tooltip label={label}>
      <IconButton
        colorScheme={colorScheme}
        ml={space[3]}
        fontSize='lg'
        onClick={onClick}
        icon={<FaMagic />}
        aria-label={label}
      />
    </Tooltip>
  )
}
