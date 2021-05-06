import { useSelector } from 'react-redux'
import {
  Box,
  Center,
  Grid,
  Heading,
  Stack,
  useColorModeValue
} from '@chakra-ui/react'
import { getAvailables } from '~core/board/selectors'
import { GridRow } from './GridRow'

export const Availables = () => {
  const { cell, row, col, reg } = useSelector(getAvailables)
  const bg = useColorModeValue('gray.200', 'gray.700')
  
  return (
    <Box bg={bg} borderRadius='md'>
      <Center m={3} p={0}>
        <Stack>
          <Heading align='center'>Available Values</Heading>
          <Grid templateColumns='auto 1fr' gap={1}>
            <GridRow label='Cell' values={cell} />
            <GridRow label='Row' values={row} />
            <GridRow label='Column' values={col} />
            <GridRow label='Region' values={reg} />
          </Grid>
        </Stack>
      </Center>
    </Box>
  )
}
