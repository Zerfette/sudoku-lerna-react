import Confetti from 'react-confetti'
import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text
} from '@chakra-ui/react'
import {
  AutoSolve,
  DarkTheme,
  Edit,
  Help,
  StartOver,
  Timer
} from './components'
import { useModel } from './useModel'

export const Controls = () => {
  const { body, heading, isOpen, onClose, solved, stopwatch } = useModel()
  
  return (
    <>
      <Flex align='center'>
        <Timer stopwatch={stopwatch} />
        <Spacer />
        <StartOver stopwatch={stopwatch} />
        <Edit stopwatch={stopwatch} />
        <AutoSolve />
        <DarkTheme />
        <Help stopwatch={stopwatch} />
      </Flex>

      {solved && <Confetti />}

      <Modal onClose={onClose} isOpen={isOpen} size='sm' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size='lg'>{heading}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody align='center'>
            <Text fontSize='2xl'>{body}</Text>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
