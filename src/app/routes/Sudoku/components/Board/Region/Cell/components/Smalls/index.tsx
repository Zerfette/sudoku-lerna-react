import React, { FC } from 'react'
import { Center, Flex, Text } from '@chakra-ui/react'
import { Cell } from '~core/types'
import { useModel } from './useModel'
import { useStyle } from './useStyle'

export const Smalls: FC<{ cell: Cell }> = ({ cell }) => {
  const { cornerColor, middleColor } = useStyle()
  const { cornerNumbers, middleNumbers } = useModel(cell)

  return (
    <Flex direction='column' height='100%'>
      <Text
        align='right'
        fontSize='s'
        lineHeight={1}
        isTruncated
        color={cornerColor}
      >
        {cornerNumbers}
      </Text>
      <Center grow='1'>
        <Text fontSize='s' isTruncated color={middleColor}>
          {middleNumbers}
        </Text>
      </Center>
    </Flex>
  )
}
