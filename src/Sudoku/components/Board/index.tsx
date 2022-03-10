import { SimpleGrid } from '@chakra-ui/react'
import { mapWithIndex } from 'fp-ts/Array'
import { useClickAwayListener } from './useClickAwayListener'
import { Region } from './Region'
import { useModel } from './useModel'

export const Board = () => {
  const { regions, onClickAway } = useModel()
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
      {mapWithIndex(Region)(regions)}
    </SimpleGrid>
  )
}
