import React, { FC, ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChakraProvider, theme } from '@chakra-ui/react'
import store from '~core'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Router>{children}</Router>
    </ChakraProvider>
  </Provider>
)
