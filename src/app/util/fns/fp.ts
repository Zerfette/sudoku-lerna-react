import { every, some } from 'fp-ts/Array'
import { Eq, eqNumber } from 'fp-ts/Eq'
import {
  constFalse,
  Endomorphism,
  flow,
  identity,
  pipe,
  Predicate,
} from 'fp-ts/function'
import { Magma } from 'fp-ts/Magma'
import { monoidProduct, monoidString } from 'fp-ts/Monoid'
import { fold } from 'fp-ts/Option'
import { gt, ordNumber } from 'fp-ts/Ord'
import { Lens, Optional } from 'monocle-ts'

const magmaModulo: Magma<number> = {
  concat: (x, y) => x % y
}

type Modulo = (x: number) => (y: number) => number
export const modulo: Modulo = x => y => magmaModulo.concat(y, x)

type Times = (x: number) => (y: number) => number
export const times: Times = x => y => monoidProduct.concat(x, y)

type ZeroPad = (x: number) => string
export const zeroPad: ZeroPad = x =>
  gt(ordNumber)(x, 9) ? x.toString() : monoidString.concat('0', x.toString())

// Determines if ALL given predicates are satisfied
type AllPass = <T>(fns: Predicate<T>[]) => Predicate<T>
export const allPass: AllPass = fns => data =>
  pipe(
    fns,
    every(fn => fn(data))
  )

// Determines if ANY given predicates are satisfied
type AnyPass = <T>(fns: Predicate<T>[]) => Predicate<T>
export const anyPass: AnyPass = fns => data =>
  pipe(
    fns,
    some(fn => fn(data))
  )

// Curried equals for any type
type Equals = <T>(eq: Eq<T>) => (x: T) => Predicate<T>
export const equals: Equals = eq => x => y => eq.equals(x, y)

// Applies the onTrue function if the given predicate is satified. Otherwise applies the onFalse.
type IfElse = <T>(
  predicate: Predicate<T>,
  onTrue: Endomorphism<T>,
  onFalse: Endomorphism<T>
) => Endomorphism<T>
export const ifElse: IfElse = (predicate, onTrue, onFalse) => data =>
  predicate(data) ? onTrue(data) : onFalse(data)

// Determines if the length of an array is equal to the given value
type LengthIs = (x: number) => <T>(arr: T[]) => boolean
export const lengthIs: LengthIs = x => arr => eqNumber.equals(arr.length, x)

// Determines if a lens' value satisfies a given predicate
type LensSatisfies = <T, U>(
  lens: Lens<T, U>,
  predicate: Predicate<U>
) => Predicate<T>
export const lensSatisfies: LensSatisfies = (lens, predicate) =>
  flow(lens.get, predicate)

// Determines if a lens' value is equal to a given value
type LensEq = <T, U>(lens: Lens<T, U>, value: U) => (eq: Eq<U>) => Predicate<T>
export const lensEq: LensEq = (lens, value) => eq =>
  lensSatisfies(lens, equals(eq)(value))

// Determines if an optional's value satisfies a given predicate
type OptionalSatisfies = <T, U>(
  optional: Optional<T, U>,
  predicate: Predicate<U>
) => Predicate<T>
export const optionalSatisfies: OptionalSatisfies = (optional, predicate) =>
  flow(optional.getOption, fold(constFalse, predicate))

// Determines if an optional's value is equal to a given value
type OptionalEq = <T, U>(
  optional: Optional<T, U>,
  value: U
) => (eq: Eq<U>) => Predicate<T>
export const optionalEq: OptionalEq = (optional, value) => eq =>
  optionalSatisfies(optional, equals(eq)(value))

// Applies a function when the given predicate is satisfied
type When = <T>(predicate: Predicate<T>, fn: Endomorphism<T>) => Endomorphism<T>
export const when: When = (predicate, fn) => ifElse(predicate, fn, identity)
