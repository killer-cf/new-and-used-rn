import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    gray: {
      700: '#1A181B',
      600: '#3E3A40',
      500: '#5F5B62',
      400: '#9F9BA1',
      300: '#D9D8DA',
      200: '#EDECEE',
      100: '#F7F7F8'
    },
    white: '#FFFFFF',
    red_light: '#EE7979',
    blue_light: '#EE7979',
    blue: '#364D9D', 
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
  sizes: {
    14: 56,
    33: 148
  }
})