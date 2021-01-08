import React, { FC } from 'react'
import { Route } from 'react-router-dom'

type Props = { path: string; text: string; component: FC }

export const RouteFC: FC<Props> = ({ path, text, component }) => (
  <Route key={text} path={path} component={component} />
)