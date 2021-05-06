import React, { ReactNode } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { mapWithIndex } from 'fp-ts/Array'
import { Cell } from '~core/types'
import { CellFC } from './Cell'

export const Region: (i: number, region: Cell[]) => ReactNode = (i, region) => (
  <SimpleGrid key={i} columns={3} spacing={1}>
    {mapWithIndex(CellFC)(region)}
  </SimpleGrid>
)
