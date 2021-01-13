/* eslint-disable @typescript-eslint/no-redeclare */
import {ColorModeSwitcher} from './ColorModeSwitcher'

export { ColorModeSwitcher }

type IfElse = <M, N>(
  condition: boolean | number | string,
  onTrue: M,
  onFalse: N
) => M | N
export const IfElse: IfElse = (condition, onTrue, onFalse) =>
  !!condition ? onTrue : onFalse

type When = <T>(condition: boolean | number | string, onTrue: T) => T | false
export const When: When = (condition, onTrue) => !!condition && onTrue