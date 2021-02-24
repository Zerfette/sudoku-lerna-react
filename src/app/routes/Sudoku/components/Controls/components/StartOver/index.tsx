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
  Switch,
  Tooltip
} from '@chakra-ui/react'
import { Stopwatch } from '~util/hooks'
import { useModel } from './useModel'

type Props = { stopwatch: Stopwatch }
export const StartOver: FC<Props> = ({ stopwatch }) => {
  const {
    cancel,
    cancelRef,
    confirm,
    isChecked,
    isOpen,
    onChange,
    onOpen
  } = useModel(stopwatch)

  return (
    <>
      <Tooltip label='Start Over'>
        <IconButton
          fontSize='lg'
          onClick={onOpen}
          icon={<FaSync />}
          aria-label='Start Over'
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
              Start Over
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will reset the board to its original state,
              removing all notes and values you've added.
            </AlertDialogBody>

            <Alert status='warning'>
              <AlertIcon />
              Reset the timer?
              <Switch
                ml={3}
                colorScheme='orange'
                isChecked={isChecked}
                onChange={onChange}
              />
            </Alert>

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
