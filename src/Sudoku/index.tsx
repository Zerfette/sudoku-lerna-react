import { Center, Stack } from '@chakra-ui/react'
import { Availables, Board, Controls } from './components'
import { useModel } from './useModel'
import { useAutoSolve } from './useAutoSolve'

const Sudoku = () => {
  const { onMouseDown, onMouseUp, onKeyDown } = useModel()
  useAutoSolve()

  return (
    <Center
      minH={'100vh'}
      minW={'100vw'}
      tabIndex={0}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
    >
      <Stack>
        <Controls />
        <Board />
        <Availables />
      </Stack>
    </Center>
  )
}

export default Sudoku