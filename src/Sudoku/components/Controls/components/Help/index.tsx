import { FC } from 'react'
import { FaQuestion } from 'react-icons/fa'
import {
  Divider,
  Heading,
  IconButton,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { Stopwatch } from '../../useStopwatch'
import { useModel } from './useModel'

type Props = { stopwatch: Stopwatch }
export const Help: FC<Props> = ({ stopwatch }) => {
  const { isOpen, onClick, onClose } = useModel(stopwatch)

  return (
    <>
      <Tooltip label='Help'>
        <IconButton
          ml={3}
          fontSize='lg'
          onClick={onClick}
          icon={<FaQuestion />}
          aria-label='Help'
        />
      </Tooltip>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size='xl'
        scrollBehavior='inside'
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size='lg'>Help</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Stack mb={6}>
                <Heading size='md'>Selecting One or More Cells</Heading>
                <Divider />
                <Text fontSize='sm'>
                  Select an unlocked cell by clicking on it.
                </Text>
                <Text fontSize='sm'>
                  Select multiple unlocked cells by holding <Kbd>ctrl</Kbd> or
                  dragging a click across the board.
                </Text>
                <Text fontSize='sm'>
                  Press <Kbd>ctrl</Kbd> + <Kbd>a</Kbd> to select all unlocked
                  cells.
                </Text>
              </Stack>
              <Stack mb={6}>
                <Heading size='md'>Selecting Possible Placements </Heading>
                <Divider />
                <Text fontSize='sm'>
                  Press any value <Kbd>1</Kbd> ... <Kbd>9</Kbd> while no cells
                  are selected to select all the possible placements for that
                  value.
                </Text>
                <Text fontSize='sm'>
                  Alternatively, click a locked cell to select all the possible
                  placements for the locked value in that cell.
                </Text>
              </Stack>
              <Stack mb={6}>
                <Heading size='md'>Clearing the Selection</Heading>
                <Divider />
                <Text fontSize='sm'>
                  Press <Kbd>Enter</Kbd> or click off the board to clear the
                  current selection.
                </Text>
              </Stack>
              <Stack mb={6}>
                <Heading size='md'>Adding and Removing Values</Heading>
                <Divider />
                <Text fontSize='sm'>
                  Press any value <Kbd>1</Kbd> ... <Kbd>9</Kbd> while one or
                  more cells are selected to place that value in the selected
                  cells.
                </Text>
                <Text fontSize='sm'>
                  Press <Kbd>0</Kbd> while one or more cells are selected to
                  remove the value from the selected cells.
                </Text>
              </Stack>
              <Stack mb={6}>
                <Heading size='md'>Adding and Removing Corner Notes</Heading>
                <Divider />
                <Text fontSize='sm'>
                  Hold <Kbd>ctrl</Kbd> the press any value <Kbd>1</Kbd> ...{' '}
                  <Kbd>9</Kbd> while one or more cells are selected to place
                  that value as a note in the corner of the selected cells.
                </Text>
                <Text fontSize='sm'>
                  Hold <Kbd>ctrl</Kbd> then press the number you'd like to
                  remove from the corner of the selected cells.
                </Text>
                <Text fontSize='sm'>
                  Press <Kbd>ctrl</Kbd> + <Kbd>0</Kbd> to remove all corner
                  values from the selected cells.
                </Text>
              </Stack>
              <Stack mb={6}>
                <Heading size='md'>Adding and Removing Middle Notes</Heading>
                <Divider />
                <Text fontSize='sm'>
                  Hold <Kbd>alt</Kbd> the press any value <Kbd>1</Kbd> ...{' '}
                  <Kbd>9</Kbd> while one or more cells are selected to place
                  that value as a note in the middle of the selected cells.
                </Text>
                <Text fontSize='sm'>
                  Hold <Kbd>alt</Kbd> then press the number you'd like to remove
                  from the middle of the selected cells.
                </Text>
                <Text fontSize='sm'>
                  Press <Kbd>alt</Kbd> + <Kbd>0</Kbd> to remove all middle
                  values from the selected cells.
                </Text>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
