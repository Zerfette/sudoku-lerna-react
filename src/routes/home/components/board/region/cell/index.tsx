import React, { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { Cell } from '~core/types'
import { useModel } from './useModel'
import { useStyle } from './useStyle'

export const CellFC: FC<{ cell: Cell }> = ({
  cell
}) => {
  const styles = useStyle(cell)
  const handlers = useModel(cell)

  return (
    <Box {...{...styles, ...handlers}}>
      {cell.value}
    </Box>
  )
}
