import React, { FC } from 'react'
import { Grid } from '@chakra-ui/react'
import { ColorModeSwitcher } from '~lib/ColorModeSwitcher'
import { Board } from './components'
import { useModel } from './useModel'

const style = { minH: '100vh', minW: '100vw', p: 3 }

export const Home: FC = () => {
  const { onMouseDown, onMouseUp } = useModel()

  return (
    <Grid {...{ ...style, onMouseDown, onMouseUp }}>
      <Board />
      <ColorModeSwitcher justifySelf='flex-end' />
    </Grid>
  )
}
