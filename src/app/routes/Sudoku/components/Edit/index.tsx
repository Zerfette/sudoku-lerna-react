import React, { FC } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Tooltip,
  useTheme
} from '@chakra-ui/react'
import { useModel } from './useModel'

export const Edit: FC = () => {
  const { space } = useTheme()
  const {
    cancelRef,
    dispatchAction,
    Icon,
    isOpen,
    label,
    onClick,
    onClose
  } = useModel()

  return (
    <>
      <Tooltip label={label}>
        <IconButton
          ml={space[3]}
          fontSize='lg'
          onClick={onClick}
          icon={<Icon />}
          aria-label={label}
        />
      </Tooltip>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
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
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='purple' onClick={dispatchAction} ml={3}>
                I'm Sure
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
