import React, { FC } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import store from '~core'
import { routes } from '~routes'

const ToRoute: FC<{ path: string; text: string; component: FC }> = ({
  path,
  text,
  component
}) => <Route key={text} path={path} component={component} />

export const App: FC = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>{pipe(routes, map(ToRoute))}</BrowserRouter>
    </ChakraProvider>
  </Provider>
)
