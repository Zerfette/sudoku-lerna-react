import React, { FC } from 'react'
import {
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
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
      <Tooltip label='Settings'>
        <IconButton
          size='md'
          fontSize='lg'
          color='current'
          onClick={onOpen}
          icon={<FaCog />}
          aria-label='Open Settings'
        />
      </Tooltip>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size='xs'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size='lg'>Settings</Heading>
          </ModalHeader>
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