import React, { FC } from 'react'
import { Text } from '@chakra-ui/react'
import { Cell } from '~core/types'
import { useStyle } from './useStyle'

export const Big: FC<{ cell: Cell }> = ({ cell }) => {
  const { color } = useStyle(cell)

  return (
    <Text align='center' fontSize='4xl' color={color}>
      {cell.value}
    </Text>
  )
}
