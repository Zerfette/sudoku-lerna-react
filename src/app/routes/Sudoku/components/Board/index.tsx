import React, { FC } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { map, mapWithIndex, range } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { useClickAwayListener } from '~util/hooks'
import { Region } from './Region'
import { useModel } from './useModel'

export const Board: FC = () => {
  const { getRegion, onClickAway } = useModel()
  const ref = useClickAwayListener(onClickAway)

  return (
    <SimpleGrid
      ref={ref}
      columns={3}
      spacing={3}
      width='fit-content'
      height='fit-content'
      mb={1}
    >
      {pipe(range(0, 8), map(getRegion), mapWithIndex(Region))}
    </SimpleGrid>
  )
}
