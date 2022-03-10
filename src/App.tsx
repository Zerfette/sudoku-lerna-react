import { Provider } from 'react-redux'
import { ChakraProvider, theme } from '@chakra-ui/react'
import store from './store'
import Sudoku from './Sudoku'

export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Sudoku />
    </ChakraProvider>
  </Provider>
)
