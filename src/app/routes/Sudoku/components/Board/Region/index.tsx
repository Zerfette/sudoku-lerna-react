import React, { ReactNode } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { mapWithIndex } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { Cell } from '~core/types'
import { CellFC } from './Cell'

export const Region: (i: number, region: Cell[]) => ReactNode = (i, region) => (
  <SimpleGrid key={i} columns={3} spacing={1}>
    {pipe(region, mapWithIndex(CellFC))}
  </SimpleGrid>
)
