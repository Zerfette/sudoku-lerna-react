import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { Cell } from 'core/types'
import { Big, Smalls } from './components'
import { useModel } from './useModel'
import { useStyle } from './useStyle'

export const CellFC: (i: number, cell: Cell) => ReactNode = (i, cell) => {
  const { bg, width, height } = useStyle(cell)
  const { onMouseDown, onMouseEnter } = useModel(cell)

  return (
    <Box
      key={i}
      style={{background: bg}}
      width={width}
      height={height}
      userSelect='none'
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      borderRadius='sm'
    >
      {cell.value ? <Big cell={cell} /> : <Smalls cell={cell} />}
    </Box>
  )
}
