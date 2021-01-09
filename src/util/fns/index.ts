export * from './fp'
export * from './is-valid-placement'
export * from './puzzle-to-board'

export const inspect = <T>(t: T): T => {
  console.log(t)
  return t
}