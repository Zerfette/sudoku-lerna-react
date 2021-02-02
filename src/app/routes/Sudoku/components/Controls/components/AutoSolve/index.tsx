import React, { FC } from 'react'
import { FaMagic } from 'react-icons/fa'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { useModel } from './useModel'

export const AutoSolve: FC = () => {
  const { colorScheme, label, onClick } = useModel()

  return (
    <Tooltip label={label}>
      <IconButton
        colorScheme={colorScheme}
        ml={3}
        fontSize='lg'
        onClick={onClick}
        icon={<FaMagic />}
        aria-label={label}
      />
    </Tooltip>
  )
}
