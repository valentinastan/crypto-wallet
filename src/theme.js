import { extendTheme } from '@chakra-ui/react'

//color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

//extend the theme
const theme = extendTheme({ config })

export default theme