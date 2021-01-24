import React, { FC } from 'react'
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useTheme
} from '@chakra-ui/react'
import { FaCog } from 'react-icons/fa'
import { AutoSolveSwitch, ColorModeSwitch } from './components'

export const Settings: FC = () => {
  const { space } = useTheme()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        m={space[3]}
        size='md'
        fontSize='lg'
        color='current'
        marginLeft='2'
        onClick={onOpen}
        icon={<FaCog />}
        aria-label='Open Settings'
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <AutoSolveSwitch />
              <ColorModeSwitch />
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
