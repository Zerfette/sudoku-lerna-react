import React, { FC } from 'react'
import { isSome, toUndefined } from 'fp-ts/Option'
import { Center, Flex, Text } from '@chakra-ui/react'
import { Cell } from '~core/types'
import { useModel } from './useModel'
import { useStyle } from './useStyle'

export const Smalls: FC<{ cell: Cell }> = ({ cell }) => {
  const { cornerColor, middleColor } = useStyle()
  const { cornerNumbers, middleNumbers } = useModel(cell)

  return (
    <Flex direction='column' height='100%'>
      {isSome(cornerNumbers) && (
        <Text
          align='right'
          lineHeight={1}
          isTruncated
          color={cornerColor}
          mx={1}
        >
          {toUndefined(cornerNumbers)}
        </Text>
      )}
      {isSome(middleNumbers) && (
        <Center mx={1} height={isSome(cornerNumbers) ? 'fit-content' : '100%'}>
          <Text isTruncated color={middleColor}>
            {toUndefined(middleNumbers)}
          </Text>
        </Center>
      )}
    </Flex>
  )
}
