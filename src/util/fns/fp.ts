import { fold } from 'fp-ts/boolean'
import { eqStrict } from 'fp-ts/Eq'
import { constant, Endomorphism, pipe, Predicate } from 'fp-ts/function'
import { Lens } from 'monocle-ts'

type And = (x: boolean) => (y: boolean) => boolean
export const and: And = x => y => x && y

type Not = Predicate<boolean>
export const not: Not = x => !x

type Equals = (x: unknown) => (y: unknown) => boolean
export const equals: Equals = x => y => eqStrict.equals(x, y)

type Includes = <T>(x: T) => Predicate<T[]>
export const includes: Includes = x => arr => arr.includes(x)

type Length = <T>(x: T[]) => number
export const length: Length = (arr) => arr.length


type PropEq = <T, U>(lens: Lens<T, U>, value: U) => Predicate<T>
export const propEq: PropEq = (lens, value) => data =>
  pipe(data, lens.get, equals(value))

type PropSatisfies = <T, U>(
  lens: Lens<T, U>,
  predicate: Predicate<U>
) => Predicate<T>
export const propSatisfies: PropSatisfies = (lens, predicate) => data =>
  pipe(data, lens.get, predicate)

type AnyPass = <T>(fns: Predicate<T>[]) => Predicate<T>
export const anyPass: AnyPass = fns => data => fns.some(fn => fn(data))

type When = <T>(predicate: Predicate<T>, fn: Endomorphism<T>) => Endomorphism<T>
export const when: When = (predicate, fn) => data =>
  pipe(predicate(data), fold(constant(data), constant(fn(data))))

type IfElse = <T>(
  predicate: Predicate<T>,
  onTrue: Endomorphism<T>,
  onFalse: Endomorphism<T>
) => Endomorphism<T>
export const ifElse: IfElse = (predicate, onTrue, onFalse) => data =>
  pipe(predicate(data), fold(constant(onFalse(data)), constant(onTrue(data))))
