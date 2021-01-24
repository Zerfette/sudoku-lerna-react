export type Smalls = number[] | never[]

export type Cell = {
  ind: number
  value: number
  row: number
  col: number
  reg: number
  selected: boolean
  locked: boolean
  highlighted: boolean
  corner: Smalls
  middle: Smalls
}

export type Board = Cell[]

export type Puzzle = number[][]

export type Toggles = Record<string, boolean>

export type State = { board: Board; toggles: Toggles; numberSelected: number }

export type Mutation<S, P> = (state: S, payload: P) => S
