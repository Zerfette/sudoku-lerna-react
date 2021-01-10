import React, { FC } from 'react'
import { Grid } from '@chakra-ui/react'
import { ColorModeSwitcher } from '~lib/ColorModeSwitcher'
import { Board } from './components'
import { useModel } from './useModel'

export const Home: FC = () => {
  const { onMouseDown, onMouseUp, onKeyDown } = useModel()

  return (
    <Grid
      minH={'100vh'}
      minW={'100vw'}
      p={3}
      tabIndex={0}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
    >
      <Board />
      <ColorModeSwitcher justifySelf='flex-end' />
    </Grid>
  )
}
