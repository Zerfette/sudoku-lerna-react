import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import { elem, map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { range } from 'fp-ts/NonEmptyArray'
import { Eq as nEq } from 'fp-ts/number'
import { getMouseDown } from '~store/toggles/selectors'

type Props = { label: string; values: number[] }
export const GridRow: FC<Props> = ({ label, values }) => {
  const mouseDown = useSelector(getMouseDown)
  const dflt = useColorModeValue('whiteAlpha', 'blackAlpha')
  const colorScheme = (x: number): string =>
    !mouseDown && elem(nEq)(x)(values) ? 'purple' : dflt
  const toTag: FC<number> = x => (
    <Tag m={1} colorScheme={colorScheme(x)} key={x}>
      {x}
    </Tag>
  )

  return (
    <>
      <Text align='right' fontSize='xl'>
        {label}:
      </Text>
      <Flex>{pipe(range(1, 9), map(toTag))}</Flex>
    </>
  )
}
