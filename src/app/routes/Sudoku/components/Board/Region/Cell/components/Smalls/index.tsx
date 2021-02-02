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
      {!!cornerNumbers.length && (
        <Text
          align='right'
          lineHeight={1}
          isTruncated
          color={cornerColor}
          mx={1}
        >
          {cornerNumbers}
        </Text>
      )}
      {!!middleNumbers.length && (
        <Center mx={1} height={!!cornerNumbers.length ? 'fit-content' : '100%'}>
          <Text isTruncated color={middleColor}>
            {middleNumbers}
          </Text>
        </Center>
      )}
    </Flex>
  )
}
