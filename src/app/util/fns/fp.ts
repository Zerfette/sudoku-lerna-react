import { fold } from 'fp-ts/boolean'
import { every, some } from 'fp-ts/Array'
import { eqStrict } from 'fp-ts/Eq'
import { constant, Endomorphism, pipe, Predicate } from 'fp-ts/function'
import { Magma } from 'fp-ts/Magma'
import { monoidProduct, monoidString } from 'fp-ts/Monoid'
import { gt, ordNumber } from 'fp-ts/Ord'
import { Lens } from 'monocle-ts'

const magmaModulo: Magma<number> = {
  concat: (x, y) => x % y
}

type And = (x: boolean) => (y: boolean) => boolean
export const and: And = x => y => x && y

type Not = Predicate<boolean>
export const not: Not = x => !x

type Equals = (x: unknown) => (y: unknown) => boolean
export const equals: Equals = x => y => eqStrict.equals(x, y)

type Modulo = (x: number) => (y: number) => number
export const modulo: Modulo = x => y => magmaModulo.concat(y, x)

type Times = (x: number) => (y: number) => number
export const times: Times = x => y => monoidProduct.concat(x, y)

type ZeroPad = (x: number) => string
export const zeroPad: ZeroPad = x =>
  pipe(
    gt(ordNumber)(x, 9),
    fold(
      constant(monoidString.concat('0', x.toString())),
      constant(x.toString())
    )
  )

type Length = <T>(arr: T[]) => number
export const length: Length = arr => arr.length

type PropEq = <T, U>(lens: Lens<T, U>, value: U) => Predicate<T>
export const propEq: PropEq = (lens, value) => data =>
  pipe(data, lens.get, equals(value))

type PropSatisfies = <T, U>(
  lens: Lens<T, U>,
  predicate: Predicate<U>
) => Predicate<T>
export const propSatisfies: PropSatisfies = (lens, predicate) => data =>
  pipe(data, lens.get, predicate)

type AllPass = <T>(fns: Predicate<T>[]) => Predicate<T>
export const allPass: AllPass = fns => data =>
  pipe(
    fns,
    every(fn => fn(data))
  )

type AnyPass = <T>(fns: Predicate<T>[]) => Predicate<T>
export const anyPass: AnyPass = fns => data =>
  pipe(
    fns,
    some(fn => fn(data))
  )

type When = <T>(predicate: Predicate<T>, fn: Endomorphism<T>) => Endomorphism<T>
export const when: When = (predicate, fn) => data =>
  predicate(data) ? fn(data) : data

type IfElse = <T>(
  predicate: Predicate<T>,
  onTrue: Endomorphism<T>,
  onFalse: Endomorphism<T>
) => Endomorphism<T>
export const ifElse: IfElse = (predicate, onTrue, onFalse) => data =>
  predicate(data) ? onTrue(data) : onFalse(data)
