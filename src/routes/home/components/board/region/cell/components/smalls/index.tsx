import React, { FC } from 'react'
import { Text } from '@chakra-ui/react'
import { Cell } from '~core/types'
import { useStyle } from './useStyle'

export const Smalls: FC<{ cell: Cell }> = ({ cell: { corner, middle } }) => {
  const { cornerColor, middleColor } = useStyle()

  return (
    <>
      <Text
        align='right'
        fontSize='s'
        lineHeight={1}
        isTruncated
        color={cornerColor}
      >
        {corner}
      </Text>
      <Text align='center' fontSize='s' isTruncated color={middleColor}>
        {middle}
      </Text>
    </>
  )
}
