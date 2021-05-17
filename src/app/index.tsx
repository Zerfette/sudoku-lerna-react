import { FC } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { map } from 'fp-ts/Array'
import store from '~core'
import { routes } from '~routes'

type Props = { path: string; text: string; component: FC }
const ToRoute: FC<Props> = ({ path, text, component }) => (
  <Route key={text} path={path} component={component} />
)

export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>{map(ToRoute)(routes)}</BrowserRouter>
    </ChakraProvider>
  </Provider>
)
