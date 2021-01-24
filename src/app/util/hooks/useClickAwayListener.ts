import { RefObject, useRef, useEffect } from 'react'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Option'
import { Optional } from 'monocle-ts'

const currentOptional = Optional.fromNullableProp<RefObject<HTMLDivElement>>()(
  'current'
)

type UseClickAwayListener = (callback: () => void) => RefObject<HTMLDivElement>
export const useClickAwayListener: UseClickAwayListener = callback => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickAway = ({ target }: globalThis.MouseEvent) => {
      pipe(
        ref,
        currentOptional.getOption,
        fold(
          () => {},
          current => !current.contains(target as Node) && callback()
        )
      )
    }
    document.addEventListener('mousedown', handleClickAway)
    return () => {
      document.removeEventListener('mousedown', handleClickAway)
    }
  }, [callback])

  return ref
}
