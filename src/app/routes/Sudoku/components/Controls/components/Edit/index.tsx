import { FC } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Tooltip
} from '@chakra-ui/react'
import { Stopwatch } from '~util/hooks'
import { useModel } from './useModel'

type Props = { stopwatch: Stopwatch }
export const Edit: FC<Props> = ({ stopwatch }) => {
  const { cancel, cancelRef, confirm, Icon, isOpen, label, onClick } = useModel(
    stopwatch
  )

  return (
    <>
      <Tooltip label={label}>
        <IconButton
          ml={3}
          fontSize='lg'
          onClick={onClick}
          icon={<Icon />}
          aria-label={label}
        />
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={cancel}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Set a New Puzzle
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will clear the board of all values.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={cancel}>
                Cancel
              </Button>
              <Button colorScheme='purple' onClick={confirm} ml={3}>
                I'm Sure
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
