import React, { FC } from 'react'
import { FaSync } from 'react-icons/fa'
import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Button,
  IconButton,
  Tooltip
} from '@chakra-ui/react'
import { useModel } from './useModel'

export const StartOver: FC = () => {
  const { cancelRef, dispatchAction, isOpen, onClose, onClick } = useModel()

  return (
    <>
      <Tooltip label='Start Over'>
        <IconButton
          ml={3}
          fontSize='lg'
          onClick={onClick}
          icon={<FaSync />}
          aria-label='Start Over'
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
              Start Over
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will reset the board to its original state,
              removing all notes and values you've added.
            </AlertDialogBody>

            <Alert status='info'>
              <AlertIcon />
              The timer will not reset.
            </Alert>

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
