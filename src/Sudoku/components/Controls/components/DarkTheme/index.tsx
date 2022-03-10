import {
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { useModel } from './useModel'

export const DarkTheme = () => {
  const { Icon, label, toggleColorMode } = useModel()

  return (
    <Tooltip label={label}>
      <IconButton
        ml={3}
        fontSize='lg'
        onClick={toggleColorMode}
        icon={<Icon />}
        aria-label={label}
      />
    </Tooltip>
  )
}
