import React, { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { Cell } from '~core/types'
import { IfElse } from '~lib'
import { Big, Smalls } from './components'
import { useModel } from './useModel'
import { useStyle } from './useStyle'

export const CellFC: FC<{ cell: Cell }> = ({ cell }) => {
  const { bg, width, height } = useStyle(cell)
  const { onMouseDown, onMouseEnter } = useModel(cell)

  return (
    <Box
      bg={bg}
      width={width}
      height={height}
      userSelect='none'
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      {IfElse(cell.value, <Big cell={cell} />, <Smalls cell={cell} />)}
    </Box>
  )
}
