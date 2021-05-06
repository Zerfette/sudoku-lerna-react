import { map, size } from 'fp-ts/Array'
import { MonoidAll, MonoidAny } from 'fp-ts/Boolean'
import { Eq } from 'fp-ts/Eq'
import {
  constFalse,
  Endomorphism,
  flow,
  getMonoid,
  identity,
  Predicate
} from 'fp-ts/function'
import { Group } from 'fp-ts/Group'
import { Magma } from 'fp-ts/Magma'
import { concatAll, Monoid } from 'fp-ts/Monoid'
import { Eq as nEq, Ord as nOrd } from 'fp-ts/number'
import { fold } from 'fp-ts/Option'
import { gt } from 'fp-ts/Ord'
import { Semigroup } from 'fp-ts/Semigroup'
import { Monoid as sMonoid } from 'fp-ts/string'
import { Lens, Optional } from 'monocle-ts'

// A magma for numbers under the remainder operator (modulo)
export const magmaModulo: Magma<number> = {
  concat: (x, y) => y % x
}

// Determines if ALL given predicates are satisfied
type AllPass = <T>(fns: Predicate<T>[]) => Predicate<T>
export const allPass: AllPass = concatAll(getMonoid(MonoidAll)())

// Determines if ANY given predicates are satisfied
type AnyPass = <T>(fns: Predicate<T>[]) => Predicate<T>
export const anyPass: AnyPass = concatAll(getMonoid(MonoidAny)())

// Generic curried concat
type Concat = <T>(
  algebraicStructure: Magma<T> | Monoid<T> | Semigroup<T> | Group<T>
) => (x: T) => Endomorphism<T>
export const concat: Concat = algebraicStructure => x => y =>
  algebraicStructure.concat(x, y)

// Generic curried equals
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
export const lengthIs: LengthIs = x => flow(size, equals(nEq)(x))

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

export const mapWhen = flow(when, map)

// Converts a number to a 2+ character string (Appends a 0 to numbers less than 10)
type ZeroPad = (x: number) => string
export const zeroPad: ZeroPad = x =>
  gt(nOrd)(x, 9) ? x.toString() : sMonoid.concat('0', x.toString())
