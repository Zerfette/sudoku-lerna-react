import React, { FC } from 'react'
import { map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { routes } from '~routes'
import { Providers, Route } from './components'

export const App: FC = () => <Providers>{pipe(routes, map(Route))}</Providers>