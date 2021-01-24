import React, { FC, ReactNode } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { mapWithIndex } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { Cell } from '~core/types'
import { CellFC } from './Cell'

type ToCell = (i: number, cell: Cell) => ReactNode
const toCell: ToCell = (i, cell) => <CellFC cell={cell} key={i}/>

export const Region: FC<{ region: Cell[] }> = ({ region }) => (
  <SimpleGrid columns={3} spacing={1}>
    {pipe(region, mapWithIndex(toCell))}
  </SimpleGrid>
)